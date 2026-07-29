'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BillItem, BillSettings, Friend, Language, ThemeMode } from '../types';
import { calculateBill } from '../utils/calculation';
import { Header } from '../components/Header';
import { SettingsBar } from '../components/SettingsBar';
import { FriendsManager } from '../components/FriendsManager';
import { ItemMatrix } from '../components/ItemMatrix';
import { ItemCards } from '../components/ItemCards';
import { ValidationBanner } from '../components/ValidationBanner';
import { SummarySection } from '../components/SummarySection';
import { PromptPaySection } from '../components/PromptPaySection';
import { ExportModal } from '../components/ExportModal';
import { ReceiptCard } from '../components/ReceiptCard';
import { ConfirmModal } from '../components/ConfirmModal';
import { SeoFaqSection } from '../components/SeoFaqSection';
import { LineManAffiliateWidget } from '../components/LineManAffiliateWidget';
import { PwaInstallModal } from '../components/PwaInstallModal';
import { AiReceiptModal } from '../components/AiReceiptModal';
import { toPng } from 'html-to-image';
import { LayoutGrid, Layers, ImageDown, Loader2 } from 'lucide-react';

const STORAGE_KEY = 'bill_splitter_data_v2';

const INITIAL_FRIENDS: Friend[] = [
  { id: 'f1', name: 'เพื่อนคนที่ 1', avatarColor: '#3B82F6' },
  { id: 'f2', name: 'เพื่อนคนที่ 2', avatarColor: '#EC4899' },
  { id: 'f3', name: 'เพื่อนคนที่ 3', avatarColor: '#10B981' },
];

const INITIAL_ITEMS: BillItem[] = [
  { id: 'i1', name: 'รายการอาหารที่ 1', price: 500, quantity: 1, assignedFriendIds: ['f1', 'f2', 'f3'] },
  { id: 'i2', name: 'รายการอาหารที่ 2', price: 150, quantity: 1, assignedFriendIds: ['f1', 'f3'] },
];

const INITIAL_SETTINGS: BillSettings = {
  serviceChargePercent: 10,
  vatPercent: 7,
  discountAmount: 0,
  tipAmount: 0,
  promptPayId: '0888888888',
};

export default function Home() {
  const [friends, setFriends] = useState<Friend[]>(INITIAL_FRIENDS);
  const [items, setItems] = useState<BillItem[]>(INITIAL_ITEMS);
  const [settings, setSettings] = useState<BillSettings>(INITIAL_SETTINGS);
  const [paidFriendIds, setPaidFriendIds] = useState<string[]>([]);
  const [language, setLanguage] = useState<Language>('th');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [viewMode, setViewMode] = useState<'matrix' | 'cards'>('matrix');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportImageUrl, setExportImageUrl] = useState<string>('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isPwaModalOpen, setIsPwaModalOpen] = useState(false);
  const [isAiScanOpen, setIsAiScanOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const hiddenReceiptRef = useRef<HTMLDivElement>(null);

  // PWA & Standalone Detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (navigator as any).standalone === true;
      setIsStandalone(isStandaloneMode);

      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIos(isIosDevice);

      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  // Load from localStorage on mount & set default viewMode based on device
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      let hasUserViewMode = false;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.friends) setFriends(parsed.friends);
        if (parsed.items) setItems(parsed.items);
        if (parsed.settings) setSettings(parsed.settings);
        if (parsed.paidFriendIds) setPaidFriendIds(parsed.paidFriendIds);
        if (parsed.language) setLanguage(parsed.language);
        if (parsed.themeMode) setThemeMode(parsed.themeMode);
        if (parsed.viewMode) {
          setViewMode(parsed.viewMode);
          hasUserViewMode = true;
        }
      }

      // Default viewMode to 'cards' for Mobile (<768px) and 'matrix' for Desktop if user has not set preference
      if (!hasUserViewMode && typeof window !== 'undefined') {
        const isMobileScreen = window.innerWidth < 768;
        setViewMode(isMobileScreen ? 'cards' : 'matrix');
      }
    } catch (e) {
      console.error('Failed to load localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage & sync dark class
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ friends, items, settings, paidFriendIds, language, themeMode, viewMode })
      );
    } catch (e) {
      console.error('Failed to save localStorage:', e);
    }

    // Apply dark class to document element
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [friends, items, settings, paidFriendIds, language, themeMode, viewMode, isLoaded]);

  // Perform Calculation
  const calculation = calculateBill(friends, items, settings, paidFriendIds);

  // Handlers for Friends
  const handleAddFriend = (name: string) => {
    const newFriend: Friend = {
      id: `f_${Date.now()}`,
      name,
      avatarColor: ['#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'][
        friends.length % 6
      ],
    };
    setFriends([...friends, newFriend]);
  };

  const handleRemoveFriend = (id: string) => {
    setFriends(friends.filter((f) => f.id !== id));
    setPaidFriendIds(paidFriendIds.filter((fid) => fid !== id));
    setItems(
      items.map((item) => ({
        ...item,
        assignedFriendIds: item.assignedFriendIds.filter((fid) => fid !== id),
      }))
    );
  };

  const handleUpdateFriendName = (id: string, newName: string) => {
    setFriends(friends.map((f) => (f.id === id ? { ...f, name: newName } : f)));
  };

  const handleTogglePaid = (friendId: string) => {
    setPaidFriendIds((prev) =>
      prev.includes(friendId) ? prev.filter((id) => id !== friendId) : [...prev, friendId]
    );
  };

  // Handlers for Items
  const handleAddItem = () => {
    const defaultName = language === 'en' ? `Item ${items.length + 1}` : `รายการอาหารที่ ${items.length + 1}`;
    const newItem: BillItem = {
      id: `i_${Date.now()}`,
      name: defaultName,
      price: 0,
      quantity: 1,
      assignedFriendIds: friends.map((f) => f.id),
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, updates: Partial<BillItem>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const handleToggleFriendItem = (itemId: string, friendId: string) => {
    setItems(
      items.map((item) => {
        if (item.id !== itemId) return item;
        const exists = item.assignedFriendIds.includes(friendId);
        const newAssigned = exists
          ? item.assignedFriendIds.filter((fid) => fid !== friendId)
          : [...item.assignedFriendIds, friendId];
        return { ...item, assignedFriendIds: newAssigned };
      })
    );
  };

  const handleToggleAllFriendsForItem = (itemId: string) => {
    setItems(
      items.map((item) => {
        if (item.id !== itemId) return item;
        const allAssigned = item.assignedFriendIds.length === friends.length;
        return {
          ...item,
          assignedFriendIds: allAssigned ? [] : friends.map((f) => f.id),
        };
      })
    );
  };

  // Equal Split All Shortcut
  const handleEqualSplitAll = () => {
    const allFriendIds = friends.map((f) => f.id);
    setItems(items.map((item) => ({ ...item, assignedFriendIds: allFriendIds })));
  };

  // Reset Data Handler
  const handleConfirmReset = () => {
    setFriends(INITIAL_FRIENDS);
    setItems(INITIAL_ITEMS);
    setSettings(INITIAL_SETTINGS);
    setPaidFriendIds([]);
    const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 768;
    setViewMode(isMobileScreen ? 'cards' : 'matrix');
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleOpenExportModal = async () => {
    if (!hiddenReceiptRef.current) return;
    try {
      setIsGeneratingImage(true);

      // Microtask tick for layout flush
      await new Promise((r) => setTimeout(r, 100));

      // Generate high-res 3x PNG data URL from pure HTML/CSS/SVG ReceiptCard
      const dataUrl = await toPng(hiddenReceiptRef.current, {
        pixelRatio: 3,
        backgroundColor: '#ffffff',
      });

      setExportImageUrl(dataUrl);
      setIsExportOpen(true);
    } catch (err) {
      console.error('Failed to pre-generate receipt image:', err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-16 transition-colors duration-200 selection:bg-blue-500 selection:text-white">
      {/* Hidden offscreen ReceiptCard for pure 100% deterministic PNG pre-generation */}
      <div className="fixed top-0 left-0 opacity-0 pointer-events-none -z-50" aria-hidden="true">
        <div ref={hiddenReceiptRef}>
          <ReceiptCard
            calculation={calculation}
            settings={settings}
            language={language}
          />
        </div>
      </div>

      {/* Header */}
      <Header
        language={language}
        theme={themeMode}
        onLanguageChange={setLanguage}
        onThemeChange={setThemeMode}
        onReset={() => setIsResetModalOpen(true)}
        onOpenInstall={() => setIsPwaModalOpen(true)}
        isStandalone={isStandalone}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Settings Bar */}
        <SettingsBar settings={settings} onChange={setSettings} language={language} />

        {/* Friends Management */}
        <FriendsManager
          friends={friends}
          onAddFriend={handleAddFriend}
          onRemoveFriend={handleRemoveFriend}
          onUpdateFriendName={handleUpdateFriendName}
          language={language}
        />

        {/* View Switcher Bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800/70 p-1 rounded-xl border border-slate-300/60 dark:border-slate-700/60">
            <button
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'matrix'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid Matrix</span>
            </button>

            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Mobile Cards</span>
            </button>
          </div>
        </div>

        {/* Food Items View */}
        {viewMode === 'matrix' ? (
          <ItemMatrix
            items={items}
            friends={friends}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onUpdateItem={handleUpdateItem}
            onToggleFriendItem={handleToggleFriendItem}
            onToggleAllFriendsForItem={handleToggleAllFriendsForItem}
            onEqualSplit={handleEqualSplitAll}
            onOpenAiScan={() => setIsAiScanOpen(true)}
            serviceChargePercent={settings.serviceChargePercent}
            vatPercent={settings.vatPercent}
            language={language}
          />
        ) : (
          <ItemCards
            items={items}
            friends={friends}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onUpdateItem={handleUpdateItem}
            onToggleFriendItem={handleToggleFriendItem}
            onToggleAllFriendsForItem={handleToggleAllFriendsForItem}
            onEqualSplit={handleEqualSplitAll}
            onOpenAiScan={() => setIsAiScanOpen(true)}
            serviceChargePercent={settings.serviceChargePercent}
            vatPercent={settings.vatPercent}
            language={language}
          />
        )}

        {/* Validation Warning Banner */}
        <ValidationBanner
          unassignedCount={calculation.unassignedItemIds.length}
          language={language}
        />

        {/* Summary Breakdown Section & Paid Tracker */}
        <SummarySection
          calculation={calculation}
          onTogglePaid={handleTogglePaid}
          language={language}
        />

        {/* PromptPay QR Section */}
        <PromptPaySection
          settings={settings}
          onChangePromptPay={(id) => setSettings({ ...settings, promptPayId: id })}
          grandTotal={calculation.grandTotal}
          language={language}
        />

        {/* SEO & FAQ Content Section */}
        <SeoFaqSection language={language} />
      </main>

      {/* Export Summary Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculation={calculation}
        settings={settings}
        language={language}
        imageUrl={exportImageUrl}
      />

      {/* Custom Confirmation Modal */}
      <ConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
        language={language}
      />

      {/* PWA Add to Home Screen Modal */}
      <PwaInstallModal
        isOpen={isPwaModalOpen}
        onClose={() => setIsPwaModalOpen(false)}
        language={language}
        deferredPrompt={deferredPrompt}
        isIos={isIos}
      />

      {/* AI Receipt Scanner Coming Soon Modal */}
      <AiReceiptModal
        isOpen={isAiScanOpen}
        onClose={() => setIsAiScanOpen(false)}
        language={language}
      />

      {/* LINE MAN Affiliate Floating Widget */}
      <LineManAffiliateWidget language={language} />

      {/* ── Floating Save Bill Button (sticky bottom bar) ─────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 pb-4 pt-2 pointer-events-none">
        <button
          onClick={handleOpenExportModal}
          disabled={isGeneratingImage}
          className="
            pointer-events-auto
            flex items-center gap-2.5
            px-6 py-3.5
            bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800
            disabled:opacity-75
            text-white font-bold text-sm
            rounded-2xl
            shadow-xl shadow-emerald-500/40
            transition-all duration-200 active:scale-95
            border border-emerald-500/50
            cursor-pointer
          "
          aria-label="เซฟรูปสรุปบิล"
        >
          {isGeneratingImage ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{language === 'en' ? 'Generating Image...' : 'กำลังสร้างรูปภาพสรุปบิล...'}</span>
            </>
          ) : (
            <>
              <ImageDown className="w-5 h-5" />
              <span>เซฟรูปสรุปบิล</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
