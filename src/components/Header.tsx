'use client';

import React from 'react';
import { Language, ThemeMode } from '../types';
import { getTranslation } from '../utils/i18n';
import { Utensils, RotateCcw, Image as ImageIcon, Sun, Moon, Users } from 'lucide-react';

interface HeaderProps {
  language: Language;
  theme: ThemeMode;
  onLanguageChange: (lang: Language) => void;
  onThemeChange: (theme: ThemeMode) => void;
  onReset: () => void;
  onOpenExport: () => void;
  onEqualSplit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  theme,
  onLanguageChange,
  onThemeChange,
  onReset,
  onOpenExport,
  onEqualSplit,
}) => {
  const t = getTranslation(language);

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Utensils className="w-5.5 h-5.5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              {t.appTitle}
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                PRO
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Actions & Switches */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Equal Split Quick Button */}
          <button
            onClick={onEqualSplit}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 border border-indigo-200 dark:border-indigo-800 rounded-xl transition-all active:scale-95"
            title={t.equalSplit}
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.equalSplit}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
            title={theme === 'dark' ? t.light : t.dark}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onLanguageChange('th')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                language === 'th'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🇹🇭 TH
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🇬🇧 EN
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 bg-slate-50 dark:bg-slate-800/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 rounded-xl transition-all active:scale-95"
            title={t.reset}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.reset}</span>
          </button>

          {/* Export Summary Card Button */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-md shadow-emerald-500/20 transition-all active:scale-95"
          >
            <ImageIcon className="w-4 h-4" />
            <span>{t.exportSummary}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
