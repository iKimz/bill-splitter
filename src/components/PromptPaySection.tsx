'use client';

import React from 'react';
import { BillSettings, Language } from '../types';
import { getTranslation } from '../utils/i18n';
import { generatePromptPayPayload, sanitizePromptPayId } from '../utils/promptpay';
import { QrCode, ShieldCheck, AlertCircle } from 'lucide-react';
import { ThaiQrCard } from './ThaiQrCard';

interface PromptPaySectionProps {
  settings: BillSettings;
  onChangePromptPay: (promptPayId: string) => void;
  grandTotal: number;
  language: Language;
}

export const PromptPaySection: React.FC<PromptPaySectionProps> = ({
  settings,
  onChangePromptPay,
  grandTotal,
  language,
}) => {
  const t = getTranslation(language);
  const { type } = sanitizePromptPayId(settings.promptPayId || '');
  const isValid = type !== 'invalid';

  const qrPayload = isValid ? generatePromptPayPayload(settings.promptPayId) : '';



  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 sm:p-5 mb-6 transition-colors duration-200">
      <div className="flex items-center gap-2 mb-4">
        <QrCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
          {t.promptPayTitle}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Input Column */}
        <div className="md:col-span-2 space-y-3">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
            {t.promptPaySubtitle}
          </label>
          <div className="relative">
            <input
              type="text"
              maxLength={13}
              value={settings.promptPayId || ''}
              onChange={(e) => onChangePromptPay(e.target.value)}
              placeholder={t.promptPayPlaceholder}
              className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-3.5 py-2.5 text-sm font-semibold tracking-wider text-slate-900 dark:text-white outline-none transition-all ${
                settings.promptPayId && !isValid
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-500'
                  : 'border-slate-300 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-500'
              }`}
            />
            {isValid && (
              <ShieldCheck className="w-5 h-5 text-emerald-500 absolute right-3 top-3 pointer-events-none" />
            )}
          </div>

          {settings.promptPayId && !isValid && (
            <p className="text-xs text-rose-500 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {t.invalidPromptPay}
            </p>
          )}

          <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 leading-relaxed">
            {t.promptPayNotice}
          </p>
        </div>

        {/* Thai QR Payment Card Column */}
        <div className="flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl min-h-[200px]">
          {isValid && qrPayload ? (
            <>
              <ThaiQrCard
                id="promptpay-qr-card"
                qrPayload={qrPayload}
                promptPayId={settings.promptPayId || ''}
                qrSize={160}
              />
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 text-center">
                {t.scanToPay}
              </p>
            </>
          ) : (
            <div className="text-center py-6">
              <QrCode className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400 font-medium">
                กรอกเลขพร้อมเพย์เพื่อสร้าง QR
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
