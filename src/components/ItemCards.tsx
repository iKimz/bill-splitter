'use client';

import React from 'react';
import { BillItem, Friend, Language } from '../types';
import { getTranslation } from '../utils/i18n';
import { Plus, Trash2, Check, Users } from 'lucide-react';

interface ItemCardsProps {
  items: BillItem[];
  friends: Friend[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, updates: Partial<BillItem>) => void;
  onToggleFriendItem: (itemId: string, friendId: string) => void;
  onToggleAllFriendsForItem: (itemId: string) => void;
  serviceChargePercent: number;
  vatPercent: number;
  language: Language;
}

export const ItemCards: React.FC<ItemCardsProps> = ({
  items,
  friends,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  onToggleFriendItem,
  onToggleAllFriendsForItem,
  serviceChargePercent,
  vatPercent,
  language,
}) => {
  const t = getTranslation(language);

  const calculateItemGrandTotal = (price: number, quantity: number) => {
    const sub = (price || 0) * (quantity || 1);
    const sc = sub * (serviceChargePercent / 100);
    const vat = (sub + sc) * (vatPercent / 100);
    return sub + sc + vat;
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
          {t.itemsTitle} ({items.length})
        </h2>
        <button
          type="button"
          onClick={onAddItem}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t.addItem}</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{t.noItems}</p>
          <button
            onClick={onAddItem}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-xl"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addItem}</span>
          </button>
        </div>
      ) : (
        items.map((item, index) => {
          const itemTotal = calculateItemGrandTotal(item.price, item.quantity);
          const isUnassigned = item.assignedFriendIds.length === 0;

          return (
            <div
              key={item.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border p-4 shadow-xs transition-all ${
                isUnassigned
                  ? 'border-amber-300 dark:border-amber-700 bg-amber-50/20 dark:bg-amber-950/20'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Top row: Name & Delete */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-1">
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => onUpdateItem(item.id, { name: e.target.value })}
                    placeholder="ชื่ออาหาร..."
                    className="flex-1 font-semibold text-slate-900 dark:text-white border-b border-transparent focus:border-blue-500 outline-none text-sm bg-transparent"
                  />
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 p-1 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Price & Quantity Row */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50/80 dark:bg-slate-800/60 p-2.5 rounded-xl mb-3 border border-slate-100 dark:border-slate-800">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
                    {t.price}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={item.price || ''}
                    onChange={(e) =>
                      onUpdateItem(item.id, { price: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="0"
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-sm font-bold text-slate-900 dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
                    {t.quantity}
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={item.quantity || 1}
                    onChange={(e) =>
                      onUpdateItem(item.id, { quantity: parseInt(e.target.value) || 1 })
                    }
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-sm font-bold text-slate-900 dark:text-white text-center outline-none"
                  />
                </div>
              </div>

              {/* Shared by Friends Badges */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {t.assignedPeople} ({item.assignedFriendIds.length}/{friends.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleAllFriendsForItem(item.id)}
                    className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {item.assignedFriendIds.length === friends.length
                      ? t.deselectAll
                      : t.selectAll}
                  </button>
                </div>

                {friends.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">{t.noFriends}</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {friends.map((friend) => {
                      const isSelected = item.assignedFriendIds.includes(friend.id);

                      return (
                        <button
                          key={friend.id}
                          type="button"
                          onClick={() => onToggleFriendItem(item.id, friend.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 ${
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          <div
                            className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] text-white font-bold"
                            style={{ backgroundColor: friend.avatarColor }}
                          >
                            {friend.name.charAt(0).toUpperCase()}
                          </div>
                          <span>{friend.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Subtotal Footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">{t.subtotal}:</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  ฿
                  {itemTotal.toLocaleString('th-TH', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
