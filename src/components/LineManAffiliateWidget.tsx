'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Language } from '../types';
import { X, ExternalLink, Sparkles } from 'lucide-react';

interface LineManAffiliateWidgetProps {
  language: Language;
}

export const LineManAffiliateWidget: React.FC<LineManAffiliateWidgetProps> = ({ language }) => {
  const [isVisible, setIsVisible] = useState(true);
  const isEn = language === 'en';

  if (!isVisible) return null;

  const affiliateUrl = 'https://lineman.onelink.me/1N3T/15etkm8u';

  return (
    <aside
      aria-label="LINE MAN Promotion"
      className="fixed bottom-5 right-5 z-40 max-w-[320px] w-full animate-bounce-subtle"
    >
      <div className="relative group bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-md text-white rounded-3xl p-3.5 shadow-2xl border border-emerald-500/40 hover:border-emerald-400 transition-all duration-300 transform hover:-translate-y-1">
        {/* Dismiss Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-rose-600 border border-slate-700 flex items-center justify-center transition-all shadow-md z-10"
          title={isEn ? 'Close' : 'ปิด'}
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Clickable Affiliate Link Container */}
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3"
        >
          {/* Logo Icon */}
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-emerald-400/50 shadow-md bg-emerald-950/40 p-0.5">
            <Image
              src="/lineman-logo.png"
              alt="LINE MAN"
              width={56}
              height={56}
              className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Text Content & Call to Action */}
          <div className="flex-1 pr-1">
            <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 mb-0.5">
              <Sparkles className="w-3 h-3" />
              <span>{isEn ? 'Special Discount' : 'ส่วนลดพิเศษ'}</span>
            </div>
            <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight mb-1">
              {isEn ? 'Order LINE MAN Food' : 'สั่ง LINE MAN มื้อถัดไป 🛵'}
            </h3>
            <p className="text-[11px] text-slate-300 leading-snug flex items-center gap-1 font-medium">
              <span>{isEn ? 'Tap to open app & save' : 'กดรับโค้ดส่วนลดคุ้มๆ'}</span>
              <ExternalLink className="w-3 h-3 text-emerald-400 shrink-0" />
            </p>
          </div>
        </a>
      </div>
    </aside>
  );
};
