'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Language } from '../types';
import { X, ExternalLink, Sparkles } from 'lucide-react';

interface LineManAffiliateWidgetProps {
  language: Language;
}

export const LineManAffiliateWidget: React.FC<LineManAffiliateWidgetProps> = ({ language }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const isEn = language === 'en';

  const affiliateUrl = 'https://lineman.onelink.me/1N3T/15etkm8u';

  // Auto-collapse after 10 seconds on initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="LINE MAN Promotion"
      className="fixed bottom-5 right-5 z-40 transition-all duration-500 ease-in-out"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {isExpanded ? (
        /* Full Expanded Banner View */
        <div className="relative group bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-md text-white rounded-3xl p-3.5 shadow-2xl border border-emerald-500/40 hover:border-emerald-400 max-w-[320px] w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Close / Dismiss Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsVisible(false);
            }}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-rose-600 border border-slate-700 flex items-center justify-center transition-all shadow-md z-10"
            title={isEn ? 'Close' : 'ปิด'}
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Clickable Affiliate Banner Content */}
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 pt-0.5"
          >
            {/* Mascot Image */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center bg-emerald-950/30 rounded-2xl border border-emerald-500/30 p-1 overflow-hidden">
              <Image
                src="/lineman-scooter.png"
                alt="LINE MAN"
                width={64}
                height={64}
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Text Content */}
            <div className="flex-1 pr-1">
              <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 mb-0.5">
                <Sparkles className="w-3 h-3" />
                <span>{isEn ? 'Special Offer' : 'แจกส่วนลด'}</span>
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight mb-1">
                {isEn ? 'Order LINE MAN Food' : 'สั่ง LINE MAN มื้อถัดไป 🛵'}
              </h3>
              <p className="text-[11px] text-slate-300 leading-snug flex items-center gap-1 font-medium">
                <span>{isEn ? 'Tap to open app' : 'กดรับโค้ดส่วนลดคุ้มๆ'}</span>
                <ExternalLink className="w-3 h-3 text-emerald-400 shrink-0" />
              </p>
            </div>
          </a>
        </div>
      ) : (
        /* Collapsed Compact Circular Badge View */
        <div className="relative group animate-in fade-in zoom-in-75 duration-300">
          {/* Close X Button for Collapsed Badge */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsVisible(false);
            }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-rose-600 border border-slate-700 flex items-center justify-center transition-all shadow-md z-10"
            title={isEn ? 'Close' : 'ปิด'}
          >
            <X className="w-3 h-3" />
          </button>

          {/* Floating Badge (Hover expands banner, Click opens link) */}
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-md border-2 border-emerald-400 p-1.5 shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-emerald-300 group shadow-emerald-500/20"
            title={isEn ? 'Order LINE MAN Food' : 'สั่ง LINE MAN มื้อถัดไป 🛵'}
          >
            <Image
              src="/lineman-scooter.png"
              alt="LINE MAN"
              width={44}
              height={44}
              className="object-contain group-hover:rotate-6 transition-transform"
            />
            {/* Green Notification Ping Dot */}
            <span className="absolute top-0 left-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-ping" />
            <span className="absolute top-0 left-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
          </a>
        </div>
      )}
    </aside>
  );
};
