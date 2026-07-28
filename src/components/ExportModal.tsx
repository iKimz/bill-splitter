'use client';

import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { BillSettings, CalculationResult, Language } from '../types';
import { getTranslation } from '../utils/i18n';
import { generatePromptPayPayload, sanitizePromptPayId } from '../utils/promptpay';
import { QRCodeSVG } from 'qrcode.react';
import { THAI_QR_TEMPLATE_URI, THAI_QR_LOGO_URI } from '../assets/thaiQrAssets';
import { X, Copy, Check, Utensils, ImageDown } from 'lucide-react';

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

  // Format PromptPay ID for display
  const cleanId = (settings.promptPayId || '').replace(/\D/g, '');
  const formattedPP =
    cleanId.length === 10
      ? `${cleanId.slice(0, 3)}-${cleanId.slice(3, 6)}-${cleanId.slice(6)}`
      : cleanId.length === 13
      ? `${cleanId.slice(0, 1)}-${cleanId.slice(1, 5)}-${cleanId.slice(5, 10)}-${cleanId.slice(10, 12)}-${cleanId.slice(12)}`
      : settings.promptPayId;

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsGenerating(true);

      // Generate the data URL
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
      });

      // Convert data URL to Blob for reliable download with filename
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      const filename = `Bill-Summary-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
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
    /* ── Backdrop ──────────────────────────────── */
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* ── Modal Sheet ──────────────────────────── */}
      <div
        className="
          bg-white dark:bg-slate-900
          w-full sm:max-w-md
          rounded-t-3xl sm:rounded-3xl
          shadow-2xl border border-slate-100 dark:border-slate-800
          flex flex-col
          max-h-[92dvh] sm:max-h-[88vh]
          transition-all
        "
      >
        {/* ── Header ──────────────────────────────── */}
        <div className="flex-none p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            {t.exportModalTitle}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Scrollable Body ─────────────────────── */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 bg-slate-50 dark:bg-slate-950">
          {/* Receipt card — exported as PNG */}
          <div
            ref={cardRef}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-md space-y-3 text-slate-800"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
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
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Grand Total</span>
                <span className="text-sm font-extrabold text-blue-600">
                  ฿{calculation.grandTotal.toLocaleString('th-TH', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {/* Person list */}
            <div className="space-y-1.5">
              {calculation.personSummaries.map((person) => (
                <div
                  key={person.friendId}
                  className="flex items-center justify-between px-2.5 py-2 rounded-xl bg-slate-50 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                      style={{ backgroundColor: person.avatarColor }}
                    >
                      {person.friendName.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      {person.friendName}
                      {person.isPaid && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-semibold">
                          โอนแล้ว
                        </span>
                      )}
                    </span>
                  </div>
                  <span className="font-bold text-emerald-600">
                    ฿{person.finalTotal.toLocaleString('th-TH', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Thai QR Payment section ───────────────────────────────
                 Uses template.png as background via base64 data URI (reliable for export).
                 Vertical centered layout: Template header → QR → PromptPay ID.
            ────────────────────────────────────────────────────────── */}
            {isValidPP && qrPayload && (
              <div className="pt-3 border-t border-slate-100">
                {/* Centered QR card with fixed width */}
                <div className="flex justify-center">
                  <div
                    className="relative overflow-hidden rounded-xl ring-1 ring-slate-200 ring-inset shadow-sm bg-white"
                    style={{ width: '200px', height: '240px' }}
                  >
                    {/* Template background (base64 data URI) */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={THAI_QR_TEMPLATE_URI}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full"
                      style={{ objectFit: 'fill' }}
                      draggable={false}
                    />

                    {/* QR code positioned in the white area of template */}
                    <div
                      className="absolute left-0 right-0 flex flex-col items-center"
                      style={{ top: '32%', bottom: '0' }}
                    >
                      <QRCodeSVG
                        value={qrPayload}
                        size={110}
                        level="H"
                        includeMargin={false}
                        imageSettings={{
                          src: THAI_QR_LOGO_URI,
                          x: undefined,
                          y: undefined,
                          height: 20,
                          width: 24,
                          excavate: true,
                        }}
                      />
                      {/* PromptPay ID under QR */}
                      <p className="text-[9px] font-bold text-[#0E3D67] tracking-wider font-mono mt-1">
                        {formattedPP}
                      </p>
                      <p className="text-[7px] text-slate-400 mt-0.5">
                        สแกนโอนผ่าน Mobile Banking
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tip */}
          <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center mt-3">
            รูปที่บันทึกจะมีความละเอียด 3× สำหรับการแชร์
          </p>
        </div>

        {/* ── Footer Actions ──────────────────────── */}
        <div className="flex-none p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2 rounded-b-3xl">
          <button
            onClick={handleCopyText}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all active:scale-95 min-w-[100px]"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.copiedTextSuccess : t.copyText}</span>
          </button>

          <button
            onClick={handleDownloadImage}
            disabled={isGenerating}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-500/30 transition-all active:scale-95"
          >
            <ImageDown className="w-4 h-4" />
            <span>{isGenerating ? 'กำลังสร้างรูป...' : t.downloadImage}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
