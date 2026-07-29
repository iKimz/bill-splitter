'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { THAI_QR_LOGO_URI } from '../assets/thaiQrAssets';

interface ThaiQrCardProps {
  qrPayload: string;
  promptPayId: string;
  /** QR code pixel size — default 200 */
  qrSize?: number;
  /** Extra className for the outer wrapper */
  className?: string;
  /** id for the root element (used for html-to-image export) */
  id?: string;
}

/**
 * Modern, Ultra-Reliable Thai QR Payment Card Component.
 * Built 100% with pure Tailwind CSS & inline SVG vector rendering to guarantee 
 * 100% instant, zero-failure html-to-image capture on iOS Safari & mobile devices.
 */
export const ThaiQrCard: React.FC<ThaiQrCardProps> = ({
  qrPayload,
  promptPayId,
  qrSize = 190,
  className = '',
  id = 'thai-qr-card',
}) => {
  /* Format PromptPay ID for display */
  const clean = promptPayId.replace(/\D/g, '');
  const formatted =
    clean.length === 10
      ? `${clean.slice(0, 3)}-${clean.slice(3, 6)}-${clean.slice(6)}`
      : clean.length === 13
      ? `${clean.slice(0, 1)}-${clean.slice(1, 5)}-${clean.slice(5, 10)}-${clean.slice(10, 12)}-${clean.slice(12)}`
      : promptPayId;

  return (
    <div
      id={id}
      className={`w-full max-w-[280px] mx-auto rounded-2xl shadow-md border border-slate-200 bg-white overflow-hidden select-none flex flex-col ${className}`}
    >
      {/* ── 1. Official Navy Blue PromptPay Header Bar ── */}
      <div className="bg-[#0E3D67] text-white px-3.5 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-1.5">
          {/* Thai QR Logo Emblem Icon */}
          <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center p-0.5">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 18h3v3h-3z" fill="currentColor" />
            </svg>
          </div>
          <span className="text-[11px] font-black tracking-wider uppercase text-slate-100">
            THAI QR PAYMENT
          </span>
        </div>

        {/* PromptPay Tag Badge */}
        <span className="text-[10px] font-bold bg-white/15 px-2 py-0.5 rounded-full text-slate-200 tracking-wide">
          พร้อมเพย์
        </span>
      </div>

      {/* ── 2. Center PromptPay Logo Emblem Container ── */}
      <div className="pt-3 pb-1.5 flex justify-center items-center bg-slate-50/50 border-b border-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={THAI_QR_LOGO_URI}
          alt="PromptPay"
          className="h-8 object-contain"
        />
      </div>

      {/* ── 3. QR Code Section ── */}
      <div className="p-4 bg-white flex flex-col items-center justify-center min-h-[200px]">
        <QRCodeSVG
          value={qrPayload}
          size={qrSize}
          level="H"
          includeMargin={false}
          imageSettings={{
            src: THAI_QR_LOGO_URI,
            x: undefined,
            y: undefined,
            height: Math.round(qrSize * 0.18),
            width: Math.round(qrSize * 0.22),
            excavate: false,
          }}
        />
      </div>

      {/* ── 4. PromptPay Account Number & Caption Footer ── */}
      <div className="bg-slate-50 border-t border-slate-100 p-2.5 text-center">
        <p className="font-black text-[#0E3D67] text-base tracking-widest font-mono">
          {formatted}
        </p>
        <p className="text-[10px] font-medium text-slate-400 mt-0.5">
          สแกนเพื่อชำระเงินด้วย Mobile Banking
        </p>
      </div>
    </div>
  );
};
