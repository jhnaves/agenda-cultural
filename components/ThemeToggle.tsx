import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from './IconComponents';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-700 dark:text-neutral-light hover:bg-neutral-medium/20 dark:hover:bg-neutral-light/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-light dark:focus:ring-offset-neutral-darkest focus:ring-brand-primary transition-colors duration-200"
      aria-label="Alternar tema"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-6 w-6" />
      ) : (
        <SunIcon className="h-6 w-6" />
      )}
    </button>
  );
};

export default ThemeToggle;