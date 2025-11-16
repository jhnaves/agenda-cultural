import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-dark p-8 rounded-lg shadow-xl">
      <h1 className="text-4xl font-extrabold text-neutral-darkest dark:text-white mb-4 text-center">Sobre a Agenda Cultural</h1>
      <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-neutral-light/90 leading-relaxed text-justify">
        <p>
          Bem-vindo à <strong>Agenda Cultural</strong>, sua plataforma definitiva para descobrir os melhores e mais vibrantes eventos da cidade. Nossa missão é simples: conectar pessoas com a cultura e o entretenimento, tornando fácil encontrar e participar de experiências inesquecíveis.
        </p>
        <p>
          Seja você um amante de música, um aficionado por arte, um fã de gastronomia ou alguém em busca de uma noite de cinema diferente, nossa agenda foi feita para você. Compilamos uma lista cuidadosamente selecionada de eventos, desde grandes festivais a encontros mais intimistas, garantindo que haja sempre algo novo e emocionante para explorar.
        </p>
        <h2 className="text-2xl font-bold text-neutral-darkest dark:text-white mt-8 mb-4">O que fazemos?</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Divulgamos:</strong> Oferecemos um espaço para que produtores e organizadores possam divulgar seus eventos para um público engajado e interessado.</li>
          <li><strong>Conectamos:</strong> Ajudamos os cidadãos a se manterem informados sobre a vida cultural da cidade, promovendo a participação e o engajamento comunitário.</li>
          <li><strong>Inspiramos:</strong> Acreditamos que a cultura enriquece a vida. Queremos inspirar você a sair de casa, experimentar algo novo e criar memórias duradouras.</li>
        </ul>
        <p className="mt-6">
          Explore nossa agenda, encontre seu próximo evento favorito e faça parte da vibrante cena cultural da nossa cidade!
        </p>
      </div>
    </div>
  );
};

export default About;