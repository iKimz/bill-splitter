'use client';

import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../utils/i18n';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ValidationBannerProps {
  unassignedCount: number;
  language: Language;
}

export const ValidationBanner: React.FC<ValidationBannerProps> = ({
  unassignedCount,
  language,
}) => {
  const t = getTranslation(language);

  if (unassignedCount === 0) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 mb-6 flex items-center gap-3 text-emerald-800 dark:text-emerald-300 shadow-xs">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <div className="text-xs font-semibold">{t.allAssigned}</div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/80 rounded-2xl p-4 mb-6 flex items-start gap-3 text-amber-900 dark:text-amber-200 shadow-xs animate-pulse">
      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-0.5">
          {t.warningTitle}
        </h3>
        <p className="text-xs font-medium text-amber-900 dark:text-amber-200">
          {t.unassignedWarning.replace('{count}', unassignedCount.toString())}
        </p>
        <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-1">
          {t.sumMismatchWarning}
        </p>
      </div>
    </div>
  );
};
