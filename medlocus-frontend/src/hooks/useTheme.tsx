'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  const applyTheme = (newTheme: Theme) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      // Remove both classes first
      root.classList.remove('dark', 'light');
      // For Tailwind, we need the 'dark' class on html element
      if (newTheme === 'dark') {
        root.classList.add('dark');
      }
      // Force a reflow to ensure styles are applied
      root.style.colorScheme = newTheme;
      console.log('Theme applied to DOM:', newTheme, 'Classes:', root.classList.toString());
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Toggling theme from', theme, 'to', newTheme);
    setThemeState(newTheme);
    applyTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      console.log('Theme saved to localStorage:', newTheme);
    }
  };

  useEffect(() => {
    // Check for saved theme preference or default to light
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Check current DOM state first (from script)
      const currentDark = document.documentElement.classList.contains('dark');
      const domTheme = currentDark ? 'dark' : 'light';
      
      const initialTheme = savedTheme || domTheme || (prefersDark ? 'dark' : 'light');
      setThemeState(initialTheme);
      applyTheme(initialTheme);
      setMounted(true);
    }
  }, []);

  // Sync theme state with DOM changes
  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark');
      const currentTheme = isDark ? 'dark' : 'light';
      if (currentTheme !== theme) {
        setThemeState(currentTheme);
      }
    }
  }, [mounted, theme]);

  // Always provide context, even before mount
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

