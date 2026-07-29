'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Language } from '../types';
import { getTranslation } from '../utils/i18n';
import { X, Share, PlusSquare, Smartphone, Download, CheckCircle2 } from 'lucide-react';

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  deferredPrompt: any;
  isIos: boolean;
}

export const PwaInstallModal: React.FC<PwaInstallModalProps> = ({
  isOpen,
  onClose,
  language,
  deferredPrompt,
  isIos,
}) => {
  const t = getTranslation(language);

  if (!isOpen) return null;

  const handleAndroidInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted PWA install prompt');
      }
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-5 sm:p-6 space-y-4 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {language === 'en' ? 'Add to Home Screen' : 'เพิ่มไปยังหน้าจอหลัก'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'en' ? 'Use like a native app offline' : 'ใช้งานได้เร็ว มินิมอล และรองรับออฟไลน์ 100%'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content based on Platform */}
        {isIos ? (
          /* iOS Safari Guide */
          <div className="space-y-3 pt-1">
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              {language === 'en'
                ? 'Follow these 3 easy steps on iOS Safari:'
                : 'ทำตาม 3 ขั้นตอนง่ายๆ บน Safari บน iPhone/iPad:'}
            </p>

            <div className="space-y-2.5">
              {/* Step 1 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    {language === 'en' ? 'Tap the Share button' : 'กดปุ่ม "แชร์" (Share)'}
                    <Share className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 inline" />
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    {language === 'en' ? 'Located at the bottom bar of Safari' : 'อยู่ตรงแถบด้านล่างสุดของ Safari'}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    {language === 'en' ? 'Select "Add to Home Screen"' : 'เลือก "เพิ่มไปยังหน้าจอหลัก"'}
                    <PlusSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 inline" />
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    {language === 'en' ? 'Scroll down in the action menu' : 'เลื่อนลงมาที่เมนูตัวเลือกด้านล่าง'}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    {language === 'en' ? 'Tap "Add" at top right' : 'กดปุ่ม "เพิ่ม" (Add) ที่มุมขวาบน'}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 inline" />
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    {language === 'en' ? 'Icon will appear on your Home Screen' : 'ไอคอนแอปจะไปขึ้นบนหน้าจอมือถือทันที'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 mt-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-95"
            >
              {language === 'en' ? 'Got it!' : 'เข้าใจแล้ว'}
            </button>
          </div>
        ) : (
          /* Android / Chrome Native Prompt */
          <div className="space-y-4 pt-1">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'Install Bill Splitter to your Home Screen for quick offline access and app-like experience.'
                : 'ติดตั้ง Bill Splitter ไว้บนหน้าจอมือถือเพื่อการเข้าถึงที่รวดเร็ว หน้าตาแบบแอปจริง และใช้งานออฟไลน์ได้ 100%'}
            </p>

            <button
              onClick={handleAndroidInstall}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'en' ? 'Install Now' : 'ติดตั้งแอปทันที'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
