'use client';

import React, { useState } from 'react';
import { BillSettings, CalculationResult, Language } from '../types';
import { getTranslation } from '../utils/i18n';
import { X, Copy, Check, ImageDown, Loader2 } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculation: CalculationResult;
  settings: BillSettings;
  language: Language;
  imageUrl: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  calculation,
  settings,
  language,
  imageUrl,
}) => {
  const t = getTranslation(language);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownloadImage = async () => {
    if (!imageUrl) return;
    try {
      setIsDownloading(true);

      // Convert Data URL to Blob for reliable cross-platform download
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      const filename = `Bill-Summary-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
    } catch (err) {
      console.error('Failed to download image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyText = () => {
    const dateStr = new Date().toLocaleDateString('th-TH');
    let text = `สรุปรายการหารค่าอาหาร (${dateStr})\n`;
    text += `---------------------------------\n`;
    calculation.personSummaries.forEach((person) => {
      const paidTag = person.isPaid ? ' (โอนแล้ว)' : '';
      text += `${person.friendName}${paidTag}: ฿${person.finalTotal.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}\n`;
      if (person.items.length > 0) {
        const itemNames = person.items
          .map((i) => (i.splitCount > 1 ? `${i.itemName} (1/${i.splitCount})` : i.itemName))
          .join(', ');
        text += `  • รายการ: ${itemNames}\n`;
      }
    });

    text += `---------------------------------\n`;
    if (calculation.totalStoreDiscount > 0) {
      text += `ส่วนลดคูปอง/ร้านค้า (ลดก่อน VAT): -฿${calculation.totalStoreDiscount.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}\n`;
    }
    if (calculation.totalDiscount > 0) {
      text += `สปอนเซอร์ช่วยจ่าย: -฿${calculation.totalDiscount.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}\n`;
    }
    text += `ยอดรวมทั้งสิ้น: ฿${calculation.grandTotal.toLocaleString('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}\n`;

    if (settings.promptPayId) {
      text += `PromptPay: ${settings.promptPayId}\n`;
    }
    text += `สร้างด้วย Bill Splitter`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col max-h-[90dvh] sm:max-h-[85vh] my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* ── Modal Header ───────────────────────── */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {t.exportModalTitle}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              {language === 'en' ? 'Tap & hold to save to Photos or share' : 'กดค้างที่รูปภาพเพื่อบันทึกรูป หรือกดปุ่มดาวน์โหลด'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Scrollable Body: Display Pre-generated PNG Image Directly ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 bg-slate-50/80 dark:bg-slate-950 flex justify-center items-start">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="Bill Splitter Receipt Summary"
              className="w-full max-w-[360px] rounded-2xl shadow-md border border-slate-200 bg-white object-contain select-auto cursor-pointer"
            />
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              กำลังสร้างรูปภาพสรุปบิล...
            </div>
          )}
        </div>

        {/* ── Action Buttons Footer ──────────────── */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row gap-2 shrink-0 rounded-b-3xl">
          <button
            onClick={handleDownloadImage}
            disabled={isDownloading || !imageUrl}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ImageDown className="w-4 h-4" />
            )}
            <span>{t.downloadImage}</span>
          </button>

          <button
            onClick={handleCopyText}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">
                  {language === 'en' ? 'Copied!' : 'คัดลอกแล้ว'}
                </span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>{t.copyText}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
