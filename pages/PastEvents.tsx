import React from 'react';
import EventCard from '../components/EventCard';
import { EventType } from '../types';

interface PastEventsProps {
  events: EventType[];
}

const PastEvents: React.FC<PastEventsProps> = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = React.useState<EventType[]>(events);

  React.useEffect(() => {
    // Client-side filtering to ensure we only show past events
    const now = new Date();
    const pastEvents = events.filter(event => {
      const endDate = new Date(event.endDate);
      return endDate < now;
    });
    setFilteredEvents(pastEvents);
  }, [events]);

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-neutral-darkest dark:text-white mb-2">Eventos Passados</h1>
      <p className="text-lg text-gray-700 dark:text-neutral-light mb-8">Relembre os eventos que já agitaram a cidade.</p>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white dark:bg-neutral-dark rounded-lg">
          <h2 className="text-2xl font-bold text-neutral-darkest dark:text-white">Nenhum evento passado encontrado.</h2>
          <p className="text-neutral-medium dark:text-neutral-light mt-2">Nossa agenda ainda está começando!</p>
        </div>
      )}
    </div>
  );
};

export default PastEvents;