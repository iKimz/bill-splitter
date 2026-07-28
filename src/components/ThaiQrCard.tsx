'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { THAI_QR_TEMPLATE_URI, THAI_QR_LOGO_URI } from '../assets/thaiQrAssets';

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
 * Standard Thai QR Payment card using the official
 * kittinan/thai-qr-payment template.png and logo.png assets
 * (embedded as base64 data URIs so html-to-image export works reliably).
 *
 * Template layout (1000×1200 px):
 *   y=0–60   : Navy-blue header with THAI QR PAYMENT logo
 *   y=60–370 : PromptPay logo box on white background
 *   y=370+   : Large white area for the actual QR code
 */
export const ThaiQrCard: React.FC<ThaiQrCardProps> = ({
  qrPayload,
  promptPayId,
  qrSize = 200,
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
    /**
     * Aspect ratio matches the original template: 1000×1200 = 5:6
     * maxWidth keeps it at a reasonable display size.
     */
    <div
      id={id}
      className={`relative overflow-hidden rounded-2xl shadow-lg border border-slate-200 bg-white select-none ${className}`}
      style={{ aspectRatio: '1000 / 1200', maxWidth: '280px', width: '100%' }}
    >
      {/* ── Official template background (Thai QR header + PromptPay logo box) ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={THAI_QR_TEMPLATE_URI}
        alt="Thai QR Payment"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: 'fill' }}
        draggable={false}
      />

      {/* ── QR Code: placed inside the white area below the PromptPay logo ── */}
      {/* Template header+logo occupies ~32% of height → QR starts at ~33%   */}
      <div
        className="absolute left-0 right-0 flex flex-col items-center justify-center"
        style={{ top: '33%', bottom: '5%' }}
      >
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
            excavate: true,
          }}
        />

        {/* PromptPay account number */}
        <div className="text-center mt-1.5 px-2">
          <p className="font-black text-[#0E3D67] tracking-widest font-mono"
            style={{ fontSize: `${Math.max(10, Math.round(qrSize * 0.073))}px` }}
          >
            {formatted}
          </p>
        </div>
      </div>
    </div>
  );
};
