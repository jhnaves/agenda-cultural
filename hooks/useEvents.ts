
import { useEffect, useState } from 'react';
import { mockEvents } from '../data/events';
import { EventType } from '../types';

export const useEvents = () => {
  const [events, setEvents] = useState<EventType[]>(mockEvents);
  const now = new Date();

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/events.json', { cache: 'no-cache' });
        if (!res.ok) throw new Error('events.json fetch failed');
        const raw = await res.json();
        const parsed: EventType[] = Array.isArray(raw)
          ? raw.map((e: any) => ({
              id: String(e.id ?? ''),
              title: String(e.title ?? ''),
              startDate: new Date(e.startDate),
              endDate: new Date(e.endDate ?? e.startDate),
              location: String(e.location ?? ''),
              description: String(e.description ?? ''),
              agenda: Array.isArray(e.agenda) ? e.agenda.map(String) : String(e.agenda ?? '').split(/\n|;|\|/).map(s=>s.trim()).filter(Boolean),
              image: String(e.image ?? e.imagem ?? `https://picsum.photos/seed/${encodeURIComponent(String(e.title ?? 'evento'))}/800/600`),
              responsibleName: e.responsibleName ? String(e.responsibleName) : undefined,
              contactPhone: e.contactPhone ? String(e.contactPhone) : undefined,
              contactEmail: e.contactEmail ? String(e.contactEmail) : undefined,
              website: e.website ? String(e.website) : undefined
            }))
          : [];
        if (!cancelled && parsed.length > 0) setEvents(parsed);
      } catch {
        // fallback keeps mockEvents
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const getUpcomingEvents = (): EventType[] => {
    return events
      .filter(event => event.endDate >= now)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  };

  const getPastEvents = (): EventType[] => {
    return events
      .filter(event => event.endDate < now)
      .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  };

  const getEventById = (id: string | undefined): EventType | undefined => {
    if (!id) return undefined;
    return events.find(event => event.id === id);
  };

  return { getUpcomingEvents, getPastEvents, getEventById };
};
