'use client';

import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../utils/i18n';
import { X, Sparkles, ScanLine, Receipt, Bot, CheckCircle2 } from 'lucide-react';

interface AiReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AiReceiptModal: React.FC<AiReceiptModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const t = getTranslation(language);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-5 my-auto animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden">
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Graphic Icon Header */}
        <div className="text-center pt-2">
          <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-purple-500/30 mb-3">
            <ScanLine className="w-8 h-8 animate-pulse" />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-slate-900 rounded-full border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>{t.comingSoon}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {t.aiScanTitle}
          </h3>
        </div>

        {/* Description & Teaser Feature Highlights */}
        <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>{t.aiScanDesc}</p>

          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
              <span>{language === 'en' ? 'Auto-extract item names, qty & prices' : 'อ่านชื่อเมนู จำนวน และราคาอัตโนมัติ'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
              <span>{language === 'en' ? 'Detect Service Charge & VAT %' : 'ตรวจจับ Service Charge และ VAT ของร้าน'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
              <span>{language === 'en' ? 'Instant auto-fill into bill form' : 'ดึงข้อมูลลงตารางให้ทันที ไม่ต้องพิมพ์เอง'}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/25 transition-all active:scale-95 cursor-pointer"
        >
          {language === 'en' ? 'Got it!' : 'รับทราบ / รอใช้งาน'}
        </button>
      </div>
    </div>
  );
};
