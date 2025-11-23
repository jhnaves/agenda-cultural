import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { CalendarIcon, ClockIcon, LocationMarkerIcon, WhatsAppIcon } from '../components/IconComponents';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById } = useEvents();
  const event = getEventById(id);

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-neutral-darkest dark:text-white mb-4">Evento não encontrado</h2>
        <p className="text-gray-700 dark:text-neutral-light mb-6">O evento que você está procurando não existe ou foi removido.</p>
        <Link to="/" className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary transition-colors duration-300">
          Voltar para a Agenda
        </Link>
      </div>
    );
  }

  const formatDateRange = (start: Date, end: Date) => {
    const startDate = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo' }).format(start);
    const endDate = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo' }).format(end);
    return startDate === endDate ? startDate : `${startDate} a ${endDate}`;
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }).format(date);
  };

  return (
    <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-2xl overflow-hidden">
      <img className="w-full h-64 md:h-96 object-cover" src={event.image} alt={event.title} />
      <div className="p-6 md:p-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-darkest dark:text-white mb-4">{event.title}</h1>

        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 text-gray-700 dark:text-neutral-light">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-6 h-6 text-brand-primary dark:text-brand-accent" />
            <span className="text-lg">{formatDateRange(event.startDate, event.endDate)}</span>
          </div>
          <div className="flex items-center gap-3">
            <ClockIcon className="w-6 h-6 text-brand-primary dark:text-brand-accent" />
            <span className="text-lg">{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
          </div>
          <div className="flex items-center gap-3">
            <LocationMarkerIcon className="w-6 h-6 text-brand-primary dark:text-brand-accent" />
            <span className="text-lg">{event.location}</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-neutral-light/90 leading-relaxed">
          <h2 className="text-2xl font-bold text-neutral-darkest dark:text-white border-b-2 border-brand-primary pb-2 mb-4">Sobre o Evento</h2>
          <p>{event.description}</p>

        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-neutral-light/20">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`*${event.title}*\n\uD83D\uDCC5 ${formatDateRange(event.startDate, event.endDate)}\n\uD83D\uDCCD ${event.location}\n\nConfira mais detalhes: ${window.location.href}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            <WhatsAppIcon className="w-6 h-6" />
            Compartilhar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;