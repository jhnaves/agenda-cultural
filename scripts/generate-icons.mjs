import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const svgPath = path.resolve('public/icons/icon.svg')
const outDir = path.resolve('public/icons')
const sizes = [192, 512]

if (!fs.existsSync(svgPath)) {
  console.error('SVG not found at', svgPath)
  process.exit(1)
}

await Promise.all(
  sizes.map(async (size) => {
    const outPath = path.join(outDir, `icon-${size}.png`)
    await sharp(svgPath)
      .resize(size, size, { fit: 'contain', background: { r: 17, g: 24, b: 39, alpha: 1 } })
      .png()
      .toFile(outPath)
    console.log('Generated', outPath)
  })
)