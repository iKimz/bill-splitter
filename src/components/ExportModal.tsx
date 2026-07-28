'use client';

import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { BillSettings, CalculationResult, Language } from '../types';
import { getTranslation } from '../utils/i18n';
import { generatePromptPayPayload, sanitizePromptPayId } from '../utils/promptpay';
import { X, Download, Copy, Check, Utensils } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculation: CalculationResult;
  settings: BillSettings;
  language: Language;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  calculation,
  settings,
  language,
}) => {
  const t = getTranslation(language);
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const { type } = sanitizePromptPayId(settings.promptPayId || '');
  const isValidPP = type !== 'invalid';
  const qrPayload = isValidPP
    ? generatePromptPayPayload(settings.promptPayId)
    : '';

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsGenerating(true);
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `Bill-Summary-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = () => {
    const dateStr = new Date().toLocaleDateString('th-TH');
    let text = `🧾 สรุปรายการหารค่าอาหาร (${dateStr})\n`;
    text += `---------------------------------\n`;
    calculation.personSummaries.forEach((person) => {
      const paidTag = person.isPaid ? ' (โอนแล้ว 💸)' : '';
      text += `👤 ${person.friendName}${paidTag}: ${person.finalTotal.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} บาท\n`;
    });
    text += `---------------------------------\n`;
    text += `💰 ยอดรวมทั้งบิล: ${calculation.grandTotal.toLocaleString('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} บาท\n`;

    if (isValidPP && settings.promptPayId) {
      text += `📲 พร้อมเพย์: ${settings.promptPayId}\n`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 transition-all">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            {t.exportModalTitle}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Card Preview (Stays light background for clean image export) */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950">
          <div
            ref={cardRef}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md space-y-4 text-slate-800"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  BS
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Bill Splitter Receipt</h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {new Date().toLocaleDateString('th-TH')}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Grand Total
                </span>
                <span className="text-sm font-extrabold text-blue-600">
                  ฿
                  {calculation.grandTotal.toLocaleString('th-TH', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {/* List of Persons & Amounts */}
            <div className="space-y-2 py-1">
              {calculation.personSummaries.map((person) => (
                <div
                  key={person.friendId}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: person.avatarColor }}
                    >
                      {person.friendName.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      {person.friendName}
                      {person.isPaid && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded font-medium">
                          โอนแล้ว
                        </span>
                      )}
                    </span>
                  </div>
                  <span className="font-bold text-emerald-600">
                    ฿
                    {person.finalTotal.toLocaleString('th-TH', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ))}
            </div>

            {/* PromptPay QR Section inside Card */}
            {isValidPP && qrPayload && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                    PromptPay QR
                  </span>
                  <span className="text-xs font-bold text-slate-800 tracking-wider">
                    {settings.promptPayId}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    สแกนโอนผ่าน Mobile Banking
                  </span>
                </div>
                <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                  <QRCodeSVG value={qrPayload} size={80} level="M" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 justify-end bg-white dark:bg-slate-900">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.copiedTextSuccess : t.copyText}</span>
          </button>

          <button
            onClick={handleDownloadImage}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{isGenerating ? 'กำลังสร้าง...' : t.downloadImage}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
