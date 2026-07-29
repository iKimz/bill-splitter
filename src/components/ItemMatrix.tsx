'use client';

import React from 'react';
import { BillItem, Friend, Language } from '../types';
import { getTranslation } from '../utils/i18n';
import { Plus, Trash2, Users, Sparkles } from 'lucide-react';

interface ItemMatrixProps {
  items: BillItem[];
  friends: Friend[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, updates: Partial<BillItem>) => void;
  onToggleFriendItem: (itemId: string, friendId: string) => void;
  onToggleAllFriendsForItem: (itemId: string) => void;
  onEqualSplit?: () => void;
  onOpenAiScan?: () => void;
  serviceChargePercent: number;
  vatPercent: number;
  language: Language;
}

export const ItemMatrix: React.FC<ItemMatrixProps> = ({
  items,
  friends,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  onToggleFriendItem,
  onToggleAllFriendsForItem,
  onEqualSplit,
  onOpenAiScan,
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
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden mb-6 transition-colors duration-200">
      {/* Header bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
            {t.itemsTitle} ({items.length})
          </h2>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          {onEqualSplit && (
            <button
              type="button"
              onClick={onEqualSplit}
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
              title={t.equalSplit}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t.equalSplit}</span>
            </button>
          )}

          {/* AI Scan Receipt Button (Coming Soon) */}
          {onOpenAiScan && (
            <button
              type="button"
              onClick={onOpenAiScan}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/60 dark:to-indigo-950/60 hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-900/80 dark:hover:to-indigo-900/80 text-purple-700 dark:text-purple-300 border border-purple-200/90 dark:border-purple-800 text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
              title={t.scanReceipt}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 animate-pulse" />
              <span>{t.scanReceipt}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onAddItem}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addItem}</span>
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-10">
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
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                <th className="py-3 px-3 w-10 text-center">#</th>
                <th className="py-3 px-3 min-w-[160px]">{t.itemName}</th>
                <th className="py-3 px-3 w-28 text-right">{t.price}</th>
                <th className="py-3 px-3 w-20 text-center">{t.quantity}</th>
                <th className="py-3 px-3 w-28 text-right">{t.subtotal}</th>

                {/* Friend Columns */}
                {friends.map((friend) => (
                  <th key={friend.id} className="py-3 px-3 text-center min-w-[90px]">
                    <div className="flex items-center justify-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                        style={{ backgroundColor: friend.avatarColor }}
                      />
                      <span className="truncate max-w-[80px]" title={friend.name}>
                        {friend.name}
                      </span>
                    </div>
                  </th>
                ))}
                <th className="py-3 px-3 w-10 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {items.map((item, index) => {
                const itemTotal = calculateItemGrandTotal(item.price, item.quantity);
                const allAssigned =
                  friends.length > 0 && item.assignedFriendIds.length === friends.length;

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Index */}
                    <td className="py-2.5 px-3 text-center text-slate-400 font-mono">
                      {index + 1}
                    </td>

                    {/* Item Name */}
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => onUpdateItem(item.id, { name: e.target.value })}
                        placeholder={t.itemName}
                        className="w-full bg-transparent border-0 border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 text-slate-800 dark:text-slate-200 font-medium py-1 px-0 transition-all text-xs"
                      />
                    </td>

                    {/* Price */}
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={item.price || ''}
                        onChange={(e) =>
                          onUpdateItem(item.id, { price: parseFloat(e.target.value) || 0 })
                        }
                        placeholder="0"
                        className="w-24 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1 px-2 text-right text-slate-800 dark:text-slate-200 font-mono font-medium focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </td>

                    {/* Quantity */}
                    <td className="py-2.5 px-3 text-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) =>
                          onUpdateItem(item.id, { quantity: parseInt(e.target.value, 10) || 1 })
                        }
                        className="w-14 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1 px-2 text-center text-slate-800 dark:text-slate-200 font-mono font-medium focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </td>

                    {/* Item Subtotal (editable bi-directionally) */}
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={
                          item.price || item.quantity
                            ? parseFloat(((item.price || 0) * (item.quantity || 1)).toFixed(2)) || ''
                            : ''
                        }
                        onChange={(e) => {
                          const newSub = parseFloat(e.target.value) || 0;
                          const qty = item.quantity || 1;
                          onUpdateItem(item.id, { price: newSub / qty });
                        }}
                        placeholder="0"
                        className="w-24 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1 px-2 text-right text-slate-900 dark:text-white font-mono font-bold focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </td>

                    {/* Friend Checkboxes */}
                    {friends.map((friend) => {
                      const isChecked = item.assignedFriendIds.includes(friend.id);
                      return (
                        <td key={friend.id} className="py-2.5 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => onToggleFriendItem(item.id, friend.id)}
                            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 dark:bg-slate-800 cursor-pointer"
                          />
                        </td>
                      );
                    })}

                    {/* Action Buttons */}
                    <td className="py-2.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors rounded-lg"
                          title={t.deleteItem}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
