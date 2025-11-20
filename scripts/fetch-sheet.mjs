import fs from 'node:fs'
import path from 'node:path'

const SHEET_ID = process.env.SHEET_ID || '1oGitc3LEkTCSHSxsyJP5YwEfdxmZeHCFMIF-CG03NKU'
const SHEET_GID = process.env.SHEET_GID
const SHEET_PUBLISH_URL = process.env.SHEET_PUBLISH_URL || 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRzDMIeIkUuWhrcbz6pHVxZl-DuRPMAJKZUB3ZQcOIwHTAcQ5SwMcMlc4O3yvpeTxcBd08dYCHb-Lqb/pub?gid=897604607&single=true&output=csv'
const CSV_URL = SHEET_PUBLISH_URL || `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv${SHEET_GID ? `&gid=${SHEET_GID}` : ''}`
const OUT_PATH = path.resolve('public/events.json')

const unquote = (s) => (s ?? '').replace(/^\uFEFF/, '').replace(/^"|"$/g, '').replace(/""/g, '"').trim()
const parseCSV = (text) => {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    const next = text[i + 1]
    if (inQuotes) {
      if (ch === '"' && next === '"') { field += '"'; i++; continue }
      if (ch === '"') { inQuotes = false; continue }
      field += ch
    } else {
      if (ch === '"') { inQuotes = true; continue }
      if (ch === ',') { row.push(unquote(field)); field = ''; continue }
      if (ch === '\n') {
        row.push(unquote(field)); field = ''; rows.push(row); row = []; continue
      }
      if (ch === '\r') { continue }
      field += ch
    }
  }
  // last field
  if (field.length > 0 || inQuotes || row.length > 0) { row.push(unquote(field)); rows.push(row) }
  return rows
}
const normalize = (s) => (s ?? '')
  .toLowerCase()
  .replace(/^\uFEFF/, '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')

const parseDate = (v) => {
  const s = unquote(v)
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/)
  if (m) {
    const dd = parseInt(m[1], 10)
    const mm = parseInt(m[2], 10)
    const yyyy = parseInt(m[3].length === 2 ? `20${m[3]}` : m[3], 10)
    const HH = m[4] ? parseInt(m[4], 10) : 0
    const MN = m[5] ? parseInt(m[5], 10) : 0
    const SS = m[6] ? parseInt(m[6], 10) : 0
    const isoStr = `${String(yyyy)}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}T${String(HH).padStart(2, '0')}:${String(MN).padStart(2, '0')}:${String(SS).padStart(2, '0')}-03:00`
    return new Date(isoStr).toISOString()
  }
  const isoTry = new Date(s)
  if (!Number.isNaN(isoTry.getTime())) return isoTry.toISOString()
  return new Date().toISOString()
}

const toEvents = (csvText) => {
  const all = parseCSV(csvText).filter(r => r.length > 0 && r.some(c => (c ?? '').trim().length > 0))
  if (all.length === 0) return []
  const header = all[0].map(h => normalize(unquote(h)))
  const idx = (keys) => keys.map(k => header.indexOf(k)).find(i => i !== -1) ?? -1
  const iId = idx(['timestamp'])
  const iTitle = idx(['digite-o-nome-do-evento'])
  const iStart = idx(['data-de-inicio'])
  const iEnd = idx(['data-de-encerramento', 'data-de-termino'])
  const iLoc = idx(['local-do-evento'])
  const iDesc = idx(['descricao-do-evento'])
  const iAgenda = idx(['agenda', 'programacao', 'itinerario'])
  const iResp = idx(['nome-do-responsavel'])
  const iPhone = idx(['telefone-de-contato-whatsapp'])
  const iEmail = idx(['e-mail-de-contato'])
  const iWebsite = idx(['website-do-evento'])
  const iImage = idx(['imagem'])

  return all.slice(1)
    .map((line, rowIdx) => {
      const cols = line
      if (cols.every(c => c === '')) return null
      const id = String(rowIdx + 1)
      const hasTitleCol = iTitle !== -1 && (cols[iTitle] ?? '').trim().length > 0
      const hasStartCol = iStart !== -1 && (cols[iStart] ?? '').trim().length > 0
      const hasLocCol = iLoc !== -1 && (cols[iLoc] ?? '').trim().length > 0
      const hasDescCol = iDesc !== -1 && (cols[iDesc] ?? '').trim().length > 0
      const meaningful = hasTitleCol || hasStartCol || hasLocCol || hasDescCol
      if (!meaningful) return null
      let title = hasTitleCol ? cols[iTitle] : ''
      if (!title) {
        const used = new Set([iId, iStart, iEnd, iLoc, iDesc, iAgenda, iImage])
        for (let j = 0; j < cols.length; j++) {
          if (used.has(j)) continue
          const val = (cols[j] ?? '').trim()
          if (val) { title = val; break }
        }
        if (!title) title = `Evento ${id}`
      }
      const startDate = hasStartCol ? parseDate(cols[iStart]) : (iId !== -1 && normalize(header[iId]) === 'timestamp' ? parseDate(cols[iId]) : new Date().toISOString())
      const endDate = iEnd !== -1 ? parseDate(cols[iEnd]) : startDate
      const location = iLoc !== -1 ? cols[iLoc] : ''
      const description = iDesc !== -1 ? cols[iDesc] : ''
      const agendaRaw = iAgenda !== -1 ? cols[iAgenda] : ''
      const agenda = agendaRaw.split(/\n|;|\|/).map(s => s.trim()).filter(Boolean)
      const image = iImage !== -1 && cols[iImage] ? cols[iImage] : (title ? `https://picsum.photos/seed/${encodeURIComponent(title)}/800/600` : '')
      const responsibleName = iResp !== -1 ? cols[iResp] : ''
      const contactPhone = iPhone !== -1 ? cols[iPhone] : ''
      const contactEmail = iEmail !== -1 ? cols[iEmail] : ''
      const website = iWebsite !== -1 ? cols[iWebsite] : ''
      return { id, title, startDate, endDate, location, description, agenda, image, responsibleName, contactPhone, contactEmail, website }
    })
    .filter(Boolean)
}

async function run() {
  try {
    const res = await fetch(CSV_URL)
    if (!res.ok) throw new Error('Failed to fetch CSV')
    const text = await res.text()
    const events = toEvents(text)
    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
    fs.writeFileSync(OUT_PATH, JSON.stringify(events, null, 2), 'utf-8')
    console.log(`Wrote ${events.length} events to`, OUT_PATH)
  } catch (e) {
    console.warn('CSV fetch failed, skipping generation:', e.message)
  }
}

await run()