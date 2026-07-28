'use client';

import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../utils/i18n';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  language: Language;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  language,
}) => {
  const t = getTranslation(language);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 transition-all transform scale-100">
        {/* Header Icon */}
        <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4 shadow-xs">
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Title & Message */}
        <div className="text-center mb-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            {title || t.reset}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {message || t.resetConfirm}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-all active:scale-95"
          >
            {cancelText || (language === 'en' ? 'Cancel' : 'ยกเลิก')}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-rose-500/20 transition-all active:scale-95"
          >
            {confirmText || (language === 'en' ? 'Reset All' : 'ยืนยันรีเซ็ต')}
          </button>
        </div>
      </div>
    </div>
  );
};
