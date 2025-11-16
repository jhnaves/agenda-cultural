import React from 'react';

const SubmitEvent: React.FC = () => {
  const googleFormUrl = "https://docs.google.com/forms"; // Placeholder URL

  return (
    <div className="max-w-4xl mx-auto text-center bg-white dark:bg-neutral-dark p-8 md:p-12 rounded-lg shadow-xl">
      <h1 className="text-4xl font-extrabold text-neutral-darkest dark:text-white mb-4">Cadastre seu Evento</h1>
      <p className="text-lg text-gray-700 dark:text-neutral-light mb-8 max-w-2xl mx-auto">
        Você está organizando um evento cultural e quer que ele apareça na nossa agenda? Ficamos felizes em ajudar a divulgá-lo!
      </p>
      <p className="text-gray-700 dark:text-neutral-light mb-8 max-w-2xl mx-auto">
        Para garantir que tenhamos todas as informações necessárias de forma organizada, pedimos que você preencha nosso formulário de cadastro. O processo é rápido e simples.
      </p>
      
      <a
        href={googleFormUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-brand-primary text-white font-bold text-xl py-4 px-10 rounded-lg hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Ir para o Formulário de Cadastro
      </a>

      <div className="mt-12 text-left text-gray-700 dark:text-neutral-medium/80 max-w-2xl mx-auto">
        <h3 className="font-bold text-neutral-darkest dark:text-neutral-light mb-2">O que acontece depois?</h3>
        <p>
          Após o envio, nossa equipe revisará as informações. Se o evento estiver de acordo com nossa política editorial, ele será publicado em nossa plataforma em até 48 horas.
        </p>
      </div>
    </div>
  );
};

export default SubmitEvent;