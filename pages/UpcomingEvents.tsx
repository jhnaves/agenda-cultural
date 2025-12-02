import React from 'react';
import EventCard from '../components/EventCard';
import { EventType } from '../types';

interface UpcomingEventsProps {
  events: EventType[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = React.useState<EventType[]>(events);

  React.useEffect(() => {
    // Client-side filtering to ensure we don't show past events
    // This handles cases where the static build is older than the current date
    const now = new Date();
    const currentEvents = events.filter(event => {
      const endDate = new Date(event.endDate);
      return endDate >= now;
    });
    setFilteredEvents(currentEvents);
  }, [events]);

  console.log('UpcomingEvents received events:', events ? events.length : 'undefined');
  if (events && events.length > 0) {
    console.log('First event slug:', events[0].slug);
    console.log('First event id:', events[0].id);
  }
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-neutral-darkest dark:text-white mb-2">Próximos Eventos</h1>
      <p className="text-lg text-gray-700 dark:text-neutral-light mb-8">Fique por dentro do que vai acontecer na cidade.</p>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white dark:bg-neutral-dark rounded-lg">
          <h2 className="text-2xl font-bold text-neutral-darkest dark:text-white">Nenhum evento próximo encontrado.</h2>
          <p className="text-neutral-medium dark:text-neutral-light mt-2">Volte em breve para mais novidades!</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;