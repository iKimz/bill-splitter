'use client';

import React from 'react';
import { Language } from '../types';
import { HelpCircle, ChevronDown, ShieldCheck, Calculator, Sparkles } from 'lucide-react';

interface SeoFaqSectionProps {
  language: Language;
}

export const SeoFaqSection: React.FC<SeoFaqSectionProps> = ({ language }) => {
  const isEn = language === 'en';

  return (
    <section className="mt-12 mb-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 sm:p-8 transition-colors duration-200">
      {/* Title & SEO Description */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isEn ? 'Smart & Fair Bill Splitting' : 'หารค่าอาหารยุติธรรม 100%'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          {isEn
            ? 'Free Online Bill Splitter with PromptPay QR'
            : 'เว็บหารค่าอาหาร คำนวณหารบิล แยกรายการ พร้อม PromptPay QR'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {isEn
            ? 'Bill Splitter is a free minimalist restaurant bill splitting web application. Easily split food items per person, calculate Service Charge (10%), VAT (7%), discounts/subsidizes, and generate instant PromptPay QR codes for hassle-free money transfers.'
            : 'Bill Splitter คือเว็บหารค่าอาหารฟรีแบบแยกรายการรายคน ช่วยให้การหารค่าอาหารในกลุ่มเพื่อนเป็นเรื่องง่ายและยุติธรรมที่สุด คำนวณ Service Charge 10%, VAT 7%, ส่วนลด (Subsidize), ทิปพนักงาน พร้อมสร้าง PromptPay Static QR Code ให้เพื่อนสแกนโอนได้ทันที ใช้งานฟรี ออฟไลน์ ปลอดภัย 100% ไม่ต้องโหลดแอป'}
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
            {isEn ? 'Proportional Tax & SC' : 'คำนวณภาษีตามยอดกินจริง'}
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
            {isEn
              ? 'Service charge and VAT are split proportionally based on individual item consumption.'
              : 'เฉลี่ย Service Charge, VAT และส่วนลดตามสัดส่วนยอดกินจริงของแต่ละคนอย่างยุติธรรม'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-2" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
            {isEn ? '100% Client-side Security' : 'ปลอดภัย 100% ไม่เก็บข้อมูล'}
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
            {isEn
              ? 'All calculations and PromptPay QR generation happen locally in your browser.'
              : 'ประมวลผลการคำนวณและสร้าง QR Code ในเบราว์เซอร์ของคุณ ไร้การบันทึกข้อมูลลงเซิร์ฟเวอร์'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <HelpCircle className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
            {isEn ? 'Mobile & PWA Ready' : 'รองรับมือถือ & ติดตั้งแอปได้'}
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
            {isEn
              ? 'Switch between Mobile Card View and Desktop Grid View seamlessly. Install to Home Screen.'
              : 'สลับมุมมอง Mobile Cards และ Desktop Grid ได้ทันที พร้อมรองรับการกดเพิ่มไปยังหน้าจอหลัก (PWA)'}
          </p>
        </div>
      </div>

      {/* Accordion FAQ Section */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>{isEn ? 'Frequently Asked Questions (FAQ)' : 'คำถามที่พบบ่อย (FAQ)'}</span>
        </h3>

        <div className="space-y-3">
          {/* FAQ 1 */}
          <details className="group bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all">
            <summary className="p-4 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none flex items-center justify-between gap-2 select-none">
              <span>
                {isEn
                  ? 'How are Service Charge 10% and VAT 7% calculated per person?'
                  : 'เว็บคำนวณ Service Charge 10% และ VAT 7% แยกแต่ละคนอย่างไร?'}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 pt-3">
              {isEn
                ? 'Service Charge and VAT are distributed based on each person’s consumed subtotal ratio. If Friend A eats 40% of the total food, Friend A will be responsible for exactly 40% of the total Service Charge and VAT amount.'
                : 'ระบบคำนวณแบ่ง Service Charge, VAT และส่วนลดโดยใช้อัตราส่วนยอดอาหารที่แต่ละคนกินจริง (Individual Consumption Ratio) หากเพื่อนคนไหนกิน 40% ของยอดอาหารทั้งหมด ก็จะรับภาระ Service Charge และ VAT ในสัดส่วน 40% นั้นเช่นกัน ทำให้ยุติธรรมที่สุด'}
            </div>
          </details>

          {/* FAQ 2 */}
          <details className="group bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all">
            <summary className="p-4 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none flex items-center justify-between gap-2 select-none">
              <span>
                {isEn
                  ? 'Is the PromptPay QR Code safe to scan?'
                  : 'PromptPay QR Code ที่สร้างขึ้น มีความปลอดภัยแค่ไหน?'}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 pt-3">
              {isEn
                ? 'Yes, 100% safe. The PromptPay QR generator uses official Thailand EMVCo standards. All barcode data is constructed locally inside your browser without communicating with any external servers or storing personal ID numbers.'
                : 'ปลอดภัย 100% การสร้าง PromptPay QR Code อ้างอิงตามมาตรฐาน EMVCo ของประเทศไทยอย่างถูกต้อง ข้อมูลเบอร์โทรศัพท์และบัตรประชาชนของคุณถูกประมวลผลเฉพาะในหน้าจอเบราว์เซอร์ของคุณแบบ 100% โดยไม่มีการส่งหรือบันทึกข้อมูลไปยังเซิร์ฟเวอร์ใดๆ ทั้งสิ้น'}
            </div>
          </details>

          {/* FAQ 3 */}
          <details className="group bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all">
            <summary className="p-4 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none flex items-center justify-between gap-2 select-none">
              <span>
                {isEn
                  ? 'Can I use Bill Splitter offline or install it on mobile?'
                  : 'สามารถใช้งานแบบออฟไลน์ หรือเพิ่มเป็นแอปบนมือถือได้หรือไม่?'}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 pt-3">
              {isEn
                ? 'Yes! Bill Splitter is built with Progressive Web App (PWA) technology. You can tap "Add to Home Screen" on your mobile browser (iOS Safari / Android Chrome) to install and use it offline anywhere.'
                : 'ทำได้ครับ! เว็บรองรับเทคโนโลยี PWA (Progressive Web App) คุณสามารถกดเมนู "เพิ่มไปยังหน้าจอหลัก (Add to Home Screen)" บนเบราว์เซอร์มือถือ (Safari บน iOS หรือ Chrome บน Android) เพื่อติดตั้งเป็นแอปพลิเคชันและใช้งานได้แม้ไม่มีสัญญาณอินเทอร์เน็ต'}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};
