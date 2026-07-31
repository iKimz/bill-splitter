'use client';

import React from 'react';
import { BillSettings, Language } from '../types';
import { getTranslation } from '../utils/i18n';
import { Percent, ReceiptText, HeartHandshake, Ticket, Gift } from 'lucide-react';

interface SettingsBarProps {
  settings: BillSettings;
  onChange: (newSettings: BillSettings) => void;
  language: Language;
}

export const SettingsBar: React.FC<SettingsBarProps> = ({
  settings,
  onChange,
  language,
}) => {
  const t = getTranslation(language);

  const handleSCChange = (val: number) => {
    onChange({ ...settings, serviceChargePercent: Math.max(0, val) });
  };

  const handleVatChange = (val: number) => {
    onChange({ ...settings, vatPercent: Math.max(0, val) });
  };

  const handleBillDiscountChange = (val: number) => {
    onChange({ ...settings, billDiscountAmount: Math.max(0, val) });
  };

  const handleBillDiscountTypeChange = (type: 'amount' | 'percent') => {
    onChange({ ...settings, billDiscountType: type });
  };

  const handleSponsorDiscountChange = (val: number) => {
    onChange({ ...settings, discountAmount: Math.max(0, val) });
  };

  const handleTipChange = (val: number) => {
    onChange({ ...settings, tipAmount: Math.max(0, val) });
  };

  const isPercentDiscount = settings.billDiscountType === 'percent';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 sm:p-5 mb-6 transition-colors duration-200">
      <div className="flex items-center gap-2 mb-4">
        <ReceiptText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
          {t.settingsTitle}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {/* 1. Service Charge */}
        <div className="bg-slate-50/80 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-700/60">
          <div className="flex justify-between items-center mb-1.5 gap-1">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1 min-w-0">
              <Percent className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{t.serviceCharge}</span>
            </label>
            <div className="flex gap-1 shrink-0">
              {[0, 10].map((sc) => (
                <button
                  key={sc}
                  type="button"
                  onClick={() => handleSCChange(sc)}
                  className={`text-[10px] px-1.5 py-0.5 rounded font-medium transition-colors ${
                    settings.serviceChargePercent === sc
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                  }`}
                >
                  {sc}%
                </button>
              ))}
            </div>
          </div>
          <div className="relative flex items-center">
            <input
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={settings.serviceChargePercent !== undefined ? settings.serviceChargePercent : ''}
              onChange={(e) => handleSCChange(e.target.value === '' ? 0 : parseFloat(e.target.value) || 0)}
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-8"
              placeholder="0"
            />
            <span className="absolute right-3 text-xs font-bold text-slate-400 pointer-events-none">
              %
            </span>
          </div>
        </div>

        {/* 2. VAT */}
        <div className="bg-slate-50/80 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-700/60">
          <div className="flex justify-between items-center mb-1.5 gap-1">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1 min-w-0">
              <Percent className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{t.vat}</span>
            </label>
            <div className="flex gap-1 shrink-0">
              {[0, 7].map((vat) => (
                <button
                  key={vat}
                  type="button"
                  onClick={() => handleVatChange(vat)}
                  className={`text-[10px] px-1.5 py-0.5 rounded font-medium transition-colors ${
                    settings.vatPercent === vat
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                  }`}
                >
                  {vat}%
                </button>
              ))}
            </div>
          </div>
          <div className="relative flex items-center">
            <input
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={settings.vatPercent !== undefined ? settings.vatPercent : ''}
              onChange={(e) => handleVatChange(e.target.value === '' ? 0 : parseFloat(e.target.value) || 0)}
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-8"
              placeholder="0"
            />
            <span className="absolute right-3 text-xs font-bold text-slate-400 pointer-events-none">
              %
            </span>
          </div>
        </div>

        {/* 3. Store / Coupon Discount (Pre-VAT & SC) with Unit Toggle (Baht / %) */}
        <div className="bg-amber-50/70 dark:bg-amber-950/40 rounded-xl p-3 border border-amber-200/80 dark:border-amber-900/60">
          <div className="flex justify-between items-center mb-1.5 gap-1">
            <label className="text-xs font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-1 min-w-0">
              <Ticket className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="truncate">{t.storeDiscount}</span>
            </label>

            {/* Unit selector: Baht (บาท) vs Percent (%) */}
            <div className="flex gap-0.5 bg-amber-200/60 dark:bg-amber-900/60 p-0.5 rounded-md shrink-0">
              <button
                type="button"
                onClick={() => handleBillDiscountTypeChange('amount')}
                className={`text-[10px] px-1.5 py-0.5 rounded font-bold transition-all ${
                  !isPercentDiscount
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'text-amber-800 dark:text-amber-300 hover:bg-amber-300/50'
                }`}
              >
                บาท
              </button>
              <button
                type="button"
                onClick={() => handleBillDiscountTypeChange('percent')}
                className={`text-[10px] px-1.5 py-0.5 rounded font-bold transition-all ${
                  isPercentDiscount
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'text-amber-800 dark:text-amber-300 hover:bg-amber-300/50'
                }`}
              >
                %
              </button>
            </div>
          </div>
          <div className="relative flex items-center">
            <input
              type="number"
              min="0"
              max={isPercentDiscount ? 100 : undefined}
              step={isPercentDiscount ? 0.5 : 1}
              value={settings.billDiscountAmount !== undefined ? settings.billDiscountAmount : ''}
              onChange={(e) => handleBillDiscountChange(e.target.value === '' ? 0 : parseFloat(e.target.value) || 0)}
              className="w-full bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700/80 rounded-lg px-3 py-2 text-sm font-bold text-amber-800 dark:text-amber-300 focus:ring-2 focus:ring-amber-500 outline-none transition-all pr-12"
              placeholder="0"
            />
            <span className="absolute right-3 text-xs font-bold text-amber-600 dark:text-amber-400 pointer-events-none">
              {isPercentDiscount ? '%' : t.baht}
            </span>
          </div>
        </div>

        {/* 4. Sponsor / Subsidy (Post-VAT) */}
        <div className="bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl p-3 border border-emerald-200/80 dark:border-emerald-900/60">
          <div className="flex justify-between items-center mb-1.5 gap-1.5">
            <label className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-1 min-w-0">
              <Gift className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate">{t.sponsorDiscount}</span>
            </label>
            <span className="text-[9px] font-bold bg-emerald-200/80 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap">
              {t.sponsorDiscountBadge}
            </span>
          </div>
          <div className="relative flex items-center">
            <input
              type="number"
              min="0"
              step="1"
              value={settings.discountAmount !== undefined ? settings.discountAmount : ''}
              onChange={(e) => handleSponsorDiscountChange(e.target.value === '' ? 0 : parseFloat(e.target.value) || 0)}
              className="w-full bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700/80 rounded-lg px-3 py-2 text-sm font-bold text-emerald-800 dark:text-emerald-300 focus:ring-2 focus:ring-emerald-500 outline-none transition-all pr-12"
              placeholder="0"
            />
            <span className="absolute right-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 pointer-events-none">
              {t.baht}
            </span>
          </div>
        </div>

        {/* 5. Tip / Extra Charge */}
        <div className="bg-purple-50/60 dark:bg-purple-950/40 rounded-xl p-3 border border-purple-100 dark:border-purple-900/60">
          <div className="flex justify-between items-center mb-1.5 gap-1">
            <label className="text-xs font-semibold text-purple-800 dark:text-purple-300 flex items-center gap-1 min-w-0">
              <HeartHandshake className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
              <span className="truncate">{t.tip}</span>
            </label>
            <div className="flex gap-1 shrink-0">
              {[20, 50].map((tipVal) => (
                <button
                  key={tipVal}
                  type="button"
                  onClick={() => handleTipChange(tipVal)}
                  className={`text-[10px] px-1.5 py-0.5 rounded font-medium transition-colors ${
                    settings.tipAmount === tipVal
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-200 dark:bg-purple-900/80 text-purple-800 dark:text-purple-200 hover:bg-purple-300'
                  }`}
                >
                  +{tipVal}
                </button>
              ))}
            </div>
          </div>
          <div className="relative flex items-center">
            <input
              type="number"
              min="0"
              step="1"
              value={settings.tipAmount !== undefined ? settings.tipAmount : ''}
              onChange={(e) => handleTipChange(e.target.value === '' ? 0 : parseFloat(e.target.value) || 0)}
              className="w-full bg-white dark:bg-slate-800 border border-purple-300 dark:border-purple-700 rounded-lg px-3 py-2 text-sm font-bold text-purple-700 dark:text-purple-300 focus:ring-2 focus:ring-purple-500 outline-none transition-all pr-12"
              placeholder="0"
            />
            <span className="absolute right-3 text-xs font-bold text-purple-600 dark:text-purple-400 pointer-events-none">
              {t.baht}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
