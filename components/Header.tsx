import React, { useState } from 'react';
import { CalendarIcon, MenuIcon, XIcon } from './IconComponents';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from '../context/ThemeContext';

interface HeaderProps {
  currentPath?: string;
}

const HeaderContent: React.FC<HeaderProps> = ({ currentPath = '/' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', text: 'Próximos Eventos' },
    { to: '/eventos-passados', text: 'Eventos Passados' },
    { to: '/sobre', text: 'Sobre' },
    { to: '/cadastrar-evento', text: 'Cadastre um Evento' },
  ];

  const isActiveLink = (path: string) => {
    if (path === '/' && currentPath !== '/') return false;
    return currentPath === path || (path !== '/' && currentPath.startsWith(path));
  };

  const getLinkClass = (path: string) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActiveLink(path)
      ? 'bg-brand-primary text-white'
      : 'text-neutral-darkest dark:text-neutral-light hover:bg-neutral-dark/10 dark:hover:bg-neutral-dark'
    }`;

  return (
    <header className="bg-white/80 dark:bg-neutral-dark/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center gap-2 text-neutral-darkest dark:text-white font-bold text-xl">
              <CalendarIcon className="h-8 w-8 text-brand-primary" />
              <span>Agenda Cultural</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {navLinks.map((link) => (
                <a key={link.to} href={link.to} className={getLinkClass(link.to)}>
                  {link.text}
                </a>
              ))}
              <div className="ml-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-neutral-light/50 dark:bg-neutral-dark inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-neutral-light hover:text-neutral-darkest dark:hover:text-white hover:bg-gray-200 dark:hover:bg-neutral-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-neutral-dark focus:ring-brand-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMenuOpen ? (
                <XIcon className="block h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a key={link.to} href={link.to} className={getLinkClass(link.to)} onClick={() => setIsMenuOpen(false)}>
                {link.text}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const Header: React.FC<HeaderProps> = (props) => (
  <ThemeProvider>
    <HeaderContent {...props} />
  </ThemeProvider>
);

export default Header;