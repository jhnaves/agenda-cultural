import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-light/50 dark:bg-neutral-dark/50 shadow-inner mt-auto transition-colors duration-300">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-700 dark:text-neutral-medium">
          &copy; {new Date().getFullYear()} Agenda Cultural. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;