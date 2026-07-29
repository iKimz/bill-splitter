'use client';

import React from 'react';
import { BillSettings, CalculationResult, Language } from '../types';
import { generatePromptPayPayload, sanitizePromptPayId } from '../utils/promptpay';
import { ThaiQrCard } from './ThaiQrCard';

interface ReceiptCardProps {
  calculation: CalculationResult;
  settings: BillSettings;
  language: Language;
  id?: string;
  className?: string;
}

/**
 * Standalone 360px wide Receipt Card Component.
 * Pure HTML/CSS & SVG layout used for deterministic PNG pre-generation and export.
 */
export const ReceiptCard: React.FC<ReceiptCardProps> = ({
  calculation,
  settings,
  language,
  id = 'receipt-card-export',
  className = '',
}) => {
  const { type } = sanitizePromptPayId(settings.promptPayId || '');
  const isValidPP = type !== 'invalid';
  const qrPayload = isValidPP ? generatePromptPayPayload(settings.promptPayId) : '';

  return (
    <div
      id={id}
      className={`w-[360px] bg-white rounded-2xl p-5 border border-slate-200 shadow-md space-y-4 text-slate-800 select-none ${className}`}
    >
      {/* ── Card Header ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs">
            BS
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 leading-tight">Bill Splitter Receipt</h4>
            <span className="text-[10px] text-slate-400 font-medium">
              {new Date().toLocaleDateString('th-TH')}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">GRAND TOTAL</span>
          <span className="text-base font-black text-blue-600">
            ฿{calculation.grandTotal.toLocaleString('th-TH', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      {/* ── Friends List with Item Bubbles ──────────────────────────── */}
      <div className="space-y-2.5">
        {calculation.personSummaries.map((person) => (
          <div
            key={person.friendId}
            className="p-3 rounded-xl bg-slate-50/90 border border-slate-100 text-xs space-y-2"
          >
            {/* Top Row: Avatar + Name + Status | Total */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-2xs"
                  style={{ backgroundColor: person.avatarColor }}
                >
                  {person.friendName.charAt(0).toUpperCase()}
                </div>
                <span className="font-bold text-slate-800 flex items-center gap-1.5 truncate">
                  <span className="truncate">{person.friendName}</span>
                  {person.isPaid && (
                    <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded font-semibold shrink-0">
                      โอนแล้ว
                    </span>
                  )}
                </span>
              </div>
              <span className="font-bold text-emerald-600 shrink-0 text-xs">
                ฿{person.finalTotal.toLocaleString('th-TH', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            {/* Item Bubbles / Pills list */}
            {person.items.length > 0 ? (
              <div className="flex flex-wrap gap-1 pl-7">
                {person.items.map((item) => (
                  <span
                    key={item.itemId}
                    className="inline-flex items-center gap-1 text-[10px] font-medium bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200/80 shadow-2xs leading-tight"
                  >
                    <span>{item.itemName}</span>
                    {item.splitCount > 1 && (
                      <span className="text-[9px] text-slate-400 font-normal">
                        (1/{item.splitCount})
                      </span>
                    )}
                  </span>
                ))}
              </div>
            ) : (
              <div className="pl-7 text-[10px] text-slate-400 italic">
                {language === 'en' ? 'No items assigned' : 'ไม่ได้หารรายการใด'}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Thai QR Payment Card Section ───────────────────────────── */}
      {isValidPP && qrPayload && (
        <div className="pt-3 border-t border-slate-100 flex justify-center">
          <ThaiQrCard
            qrPayload={qrPayload}
            promptPayId={settings.promptPayId}
            qrSize={140}
            className="max-w-[240px]"
          />
        </div>
      )}

      {/* Footer Branding */}
      <div className="pt-2 text-center border-t border-slate-100">
        <p className="text-[9px] text-slate-400 font-medium tracking-wide">
          สร้างด้วย Bill Splitter • เว็บคำนวณหารค่าอาหาร
        </p>
      </div>
    </div>
  );
};
