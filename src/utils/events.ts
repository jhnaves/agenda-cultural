import fs from 'node:fs/promises';
import path from 'node:path';
import { type EventType } from '../../types';


export async function getEvents(): Promise<EventType[]> {
    try {
        const filePath = path.join(process.cwd(), 'public', 'events.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const raw = JSON.parse(fileContent);

        return Array.isArray(raw)
            ? raw.map((e: any) => ({
                id: String(e.id ?? ''),
                title: String(e.title ?? ''),
                startDate: new Date(e.startDate),
                endDate: new Date(e.endDate ?? e.startDate),
                location: String(e.location ?? ''),
                description: String(e.description ?? ''),
                agenda: Array.isArray(e.agenda) ? e.agenda.map(String) : String(e.agenda ?? '').split(/\n|;|\|/).map(s => s.trim()).filter(Boolean),
                image: String(e.image ?? e.imagem ?? `https://picsum.photos/seed/${encodeURIComponent(String(e.title ?? 'evento'))}/800/600`),
                responsibleName: e.responsibleName ? String(e.responsibleName) : undefined,
                contactPhone: e.contactPhone ? String(e.contactPhone) : undefined,
                contactEmail: e.contactEmail ? String(e.contactEmail) : undefined,
                website: e.website ? String(e.website) : undefined
            }))
            : [];
    } catch (error) {
        console.error('Error loading events:', error);
        return [];
    }
}

export async function getUpcomingEvents(): Promise<EventType[]> {
    const events = await getEvents();
    const now = new Date();
    return events
        .filter(event => event.endDate >= now)
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}

export async function getPastEvents(): Promise<EventType[]> {
    const events = await getEvents();
    const now = new Date();
    return events
        .filter(event => event.endDate < now)
        .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
}

export async function getEventById(id: string): Promise<EventType | undefined> {
    const events = await getEvents();
    return events.find(event => event.id === id);
}
