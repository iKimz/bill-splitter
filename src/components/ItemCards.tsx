'use client';

import React from 'react';
import { BillItem, Friend, Language } from '../types';
import { getTranslation } from '../utils/i18n';
import { Plus, Trash2, Users } from 'lucide-react';

interface ItemCardsProps {
  items: BillItem[];
  friends: Friend[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, updates: Partial<BillItem>) => void;
  onToggleFriendItem: (itemId: string, friendId: string) => void;
  onToggleAllFriendsForItem: (itemId: string) => void;
  onEqualSplit?: () => void;
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
  onEqualSplit,
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
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
          {t.itemsTitle} ({items.length})
        </h2>
        <div className="flex items-center gap-2">
          {onEqualSplit && (
            <button
              type="button"
              onClick={onEqualSplit}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
              title={t.equalSplit}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t.equalSplit}</span>
            </button>
          )}
          <button
            type="button"
            onClick={onAddItem}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addItem}</span>
          </button>
        </div>
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
          const allAssigned =
            friends.length > 0 && item.assignedFriendIds.length === friends.length;

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-3 transition-colors duration-200"
            >
              {/* Top Row: Item Name & Delete Button */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => onUpdateItem(item.id, { name: e.target.value })}
                    placeholder={t.itemName}
                    className="w-full bg-transparent border-0 border-b border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-400 text-slate-900 dark:text-white font-semibold text-sm py-0.5 px-0 transition-colors"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                  title={t.deleteItem}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Price & Quantity & Calculated Total */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl text-xs">
                <div>
                  <label className="block text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-1">
                    {t.price}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={item.price || ''}
                    onChange={(e) =>
                      onUpdateItem(item.id, { price: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="0"
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1 px-2 text-right font-mono font-medium text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-1 text-center">
                    {t.quantity}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) =>
                      onUpdateItem(item.id, { quantity: parseInt(e.target.value, 10) || 1 })
                    }
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1 px-2 text-center font-mono font-medium text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div className="text-right">
                  <label className="block text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-1">
                    {t.subtotal}
                  </label>
                  <span className="block py-1 font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {itemTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Friend Selection Chips */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {t.assignedPeople}
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleAllFriendsForItem(item.id)}
                    className="text-[10px] text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    {allAssigned ? t.deselectAll : t.selectAll}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {friends.map((friend) => {
                    const isChecked = item.assignedFriendIds.includes(friend.id);
                    return (
                      <button
                        key={friend.id}
                        type="button"
                        onClick={() => onToggleFriendItem(item.id, friend.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                          isChecked
                            ? 'bg-blue-500 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: isChecked ? '#ffffff' : friend.avatarColor,
                          }}
                        />
                        <span>{friend.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
