'use client';

import React from 'react';
import { BillItem, Friend, Language } from '../types';
import { getTranslation } from '../utils/i18n';
import { Plus, Trash2 } from 'lucide-react';

interface ItemMatrixProps {
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

export const ItemMatrix: React.FC<ItemMatrixProps> = ({
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
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden mb-6 transition-colors duration-200">
      {/* Header bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
            {t.itemsTitle} ({items.length})
          </h2>
        </div>
        <button
          type="button"
          onClick={onAddItem}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addItem}</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{t.noItems}</p>
          <button
            onClick={onAddItem}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs font-semibold rounded-xl transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addItem}</span>
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4 min-w-[160px]">{t.itemName}</th>
                <th className="py-3 px-4 w-28 text-right">{t.price}</th>
                <th className="py-3 px-4 w-20 text-center">{t.quantity}</th>
                <th className="py-3 px-4 w-32 text-right">{t.subtotal}</th>
                
                {/* Dynamic Friend Header Columns */}
                {friends.map((friend) => (
                  <th
                    key={friend.id}
                    className="py-3 px-3 text-center min-w-[100px] border-l border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/40"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: friend.avatarColor }}
                      />
                      <span className="truncate max-w-[80px] font-bold text-slate-800 dark:text-slate-200">
                        {friend.name}
                      </span>
                    </div>
                  </th>
                ))}
                
                <th className="py-3 px-3 w-12 text-center border-l border-slate-200 dark:border-slate-800"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {items.map((item, index) => {
                const itemTotal = calculateItemGrandTotal(item.price, item.quantity);
                const assignedCount = item.assignedFriendIds.length;
                const isUnassigned = assignedCount === 0;

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors ${
                      isUnassigned ? 'bg-amber-50/40 dark:bg-amber-950/20' : ''
                    }`}
                  >
                    {/* Index */}
                    <td className="py-3 px-4 text-center font-medium text-slate-400 dark:text-slate-500">
                      {index + 1}
                    </td>

                    {/* Name */}
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => onUpdateItem(item.id, { name: e.target.value })}
                        placeholder="ชื่ออาหาร..."
                        className="w-full bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:border-blue-500 font-medium text-slate-900 dark:text-white outline-none py-0.5 transition-colors"
                      />
                    </td>

                    {/* Unit Price */}
                    <td className="py-3 px-4 text-right">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={item.price || ''}
                        onChange={(e) =>
                          onUpdateItem(item.id, { price: parseFloat(e.target.value) || 0 })
                        }
                        placeholder="0"
                        className="w-full text-right bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:border-blue-500 font-semibold text-slate-900 dark:text-white outline-none py-0.5 transition-colors"
                      />
                    </td>

                    {/* Quantity */}
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={item.quantity || 1}
                        onChange={(e) =>
                          onUpdateItem(item.id, { quantity: parseInt(e.target.value) || 1 })
                        }
                        className="w-14 text-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1 font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </td>

                    {/* Calculated Subtotal with tax/SC */}
                    <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-white">
                      {itemTotal.toLocaleString('th-TH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>

                    {/* Checkboxes per Friend */}
                    {friends.map((friend) => {
                      const isChecked = item.assignedFriendIds.includes(friend.id);

                      return (
                        <td
                          key={friend.id}
                          className="py-3 px-3 text-center border-l border-slate-200 dark:border-slate-800 cursor-pointer select-none hover:bg-blue-50/50 dark:hover:bg-blue-950/40 transition-colors"
                          onClick={() => onToggleFriendItem(item.id, friend.id)}
                        >
                          <div className="flex justify-center">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}} // Handled by TD click
                              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 cursor-pointer"
                            />
                          </div>
                        </td>
                      );
                    })}

                    {/* Delete Item */}
                    <td className="py-3 px-3 text-center border-l border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
