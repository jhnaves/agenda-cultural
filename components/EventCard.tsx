import React from 'react';
import { Link } from 'react-router-dom';
import { EventType } from '../types';
import { CalendarIcon, ClockIcon, LocationMarkerIcon } from './IconComponents';

interface EventCardProps {
  event: EventType;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Link to={`/evento/${event.id}`} className="block group">
      <div className="bg-white dark:bg-neutral-dark rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
        <img className="w-full h-48 object-cover" src={event.image} alt={event.title} />
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-neutral-darkest dark:text-white group-hover:text-brand-primary transition-colors duration-300 mb-2 truncate">{event.title}</h3>
          <div className="space-y-2 text-gray-700 dark:text-neutral-light/80 mb-4 flex-grow">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-brand-primary dark:text-brand-accent" />
              <span>{formatDate(event.startDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-brand-primary dark:text-brand-accent" />
              <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <LocationMarkerIcon className="w-5 h-5 text-brand-primary dark:text-brand-accent" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
          <div className="mt-auto pt-4">
            <span className="inline-block bg-brand-primary text-white text-sm font-semibold px-4 py-2 rounded-full group-hover:bg-brand-accent group-hover:text-neutral-darkest transition-colors duration-300">
              Ver Detalhes
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;