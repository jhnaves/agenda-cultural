
import { mockEvents } from '../data/events';
import { EventType } from '../types';

export const useEvents = () => {
  const now = new Date();

  const getUpcomingEvents = (): EventType[] => {
    return mockEvents
      .filter(event => event.endDate >= now)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  };

  const getPastEvents = (): EventType[] => {
    return mockEvents
      .filter(event => event.endDate < now)
      .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  };

  const getEventById = (id: string | undefined): EventType | undefined => {
    if (!id) return undefined;
    return mockEvents.find(event => event.id === id);
  };

  return { getUpcomingEvents, getPastEvents, getEventById };
};
