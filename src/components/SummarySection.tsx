'use client';

import React from 'react';
import confetti from 'canvas-confetti';
import { CalculationResult, Language } from '../types';
import { getTranslation } from '../utils/i18n';
import { Wallet, ChevronDown, ChevronUp, CheckCircle2, Circle, PartyPopper } from 'lucide-react';

interface SummarySectionProps {
  calculation: CalculationResult;
  onTogglePaid: (friendId: string) => void;
  language: Language;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  calculation,
  onTogglePaid,
  language,
}) => {
  const t = getTranslation(language);
  const [expandedFriendId, setExpandedFriendId] = React.useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedFriendId((prev) => (prev === id ? null : id));
  };

  const totalPeople = calculation.personSummaries.length;
  const paidPeople = calculation.personSummaries.filter((p) => p.isPaid).length;
  const paidPercent = totalPeople > 0 ? Math.round((paidPeople / totalPeople) * 100) : 0;
  const allPaid = totalPeople > 0 && paidPeople === totalPeople;

  const handlePaidToggle = (friendId: string, currentStatus?: boolean) => {
    onTogglePaid(friendId);
    if (!currentStatus && paidPeople + 1 === totalPeople) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 sm:p-5 mb-6 transition-colors duration-200">
      {/* Top Title & Grand Bill */}
      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
            {t.summaryTitle}
          </h2>
        </div>

        {/* Total Grand Bill Highlight */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-100 dark:border-slate-700 rounded-xl px-4 py-2 text-right">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
            {t.totalBill}
          </span>
          <span className="text-base sm:text-lg font-extrabold text-blue-700 dark:text-blue-400">
            ฿
            {calculation.grandTotal.toLocaleString('th-TH', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      {/* Payment Tracker Progress Bar */}
      {totalPeople > 0 && (
        <div className="mb-5 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              {allPaid ? (
                <PartyPopper className="w-4 h-4 text-emerald-500 animate-bounce" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              )}
              {t.paidTrackerTitle}
            </span>
            <span className={allPaid ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : 'text-blue-600 dark:text-blue-400'}>
              {t.paidProgress
                .replace('{paid}', paidPeople.toString())
                .replace('{total}', totalPeople.toString())
                .replace('{percent}', paidPercent.toString())}
            </span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                allPaid
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-500'
              }`}
              style={{ width: `${paidPercent}%` }}
            />
          </div>

          {allPaid && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold text-center mt-2 animate-pulse">
              {t.allPaidCongrats}
            </p>
          )}
        </div>
      )}

      {/* Individual Person Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {calculation.personSummaries.map((person) => {
          const isExpanded = expandedFriendId === person.friendId;

          return (
            <div
              key={person.friendId}
              className={`rounded-2xl border p-4 transition-all ${
                person.isPaid
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-50/90 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              {/* Person Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-xs"
                    style={{ backgroundColor: person.avatarColor }}
                  >
                    {person.friendName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">{person.friendName}</h3>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {person.items.length} รายการ
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                    ฿
                    {person.finalTotal.toLocaleString('th-TH', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  
                  {/* Paid Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handlePaidToggle(person.friendId, person.isPaid)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full text-[10px] font-bold transition-all active:scale-95 ${
                      person.isPaid
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300'
                    }`}
                  >
                    {person.isPaid ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-white" />
                        <span>{t.paidStatus} 💸</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3 h-3 text-slate-400" />
                        <span>{t.unpaidStatus}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Expand Toggle Button */}
              <button
                onClick={() => toggleExpand(person.friendId)}
                className="w-full mt-1 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center gap-1 transition-colors"
              >
                <span>{t.perPersonDetail}</span>
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Accordion Itemized Breakdown */}
              {isExpanded && (
                <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 animate-fadeIn">
                  {person.items.length === 0 ? (
                    <p className="text-[11px] text-slate-400 italic text-center py-1">
                      {t.noConsumption}
                    </p>
                  ) : (
                    person.items.map((item) => (
                      <div
                        key={item.itemId}
                        className="flex justify-between items-center text-[11px] py-0.5"
                      >
                        <span className="truncate max-w-[150px] font-medium text-slate-700 dark:text-slate-300">
                          {item.itemName}{' '}
                          <span className="text-[10px] text-slate-400">
                            (1/{item.splitCount})
                          </span>
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          ฿
                          {item.personShare.toLocaleString('th-TH', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    ))
                  )}

                  <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80 space-y-1 text-[11px]">
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>{t.itemsShare}:</span>
                      <span>
                        ฿
                        {person.itemSubtotal.toLocaleString('th-TH', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>

                    {person.serviceChargeShare > 0 && (
                      <div className="flex justify-between text-slate-500 dark:text-slate-400">
                        <span>{t.scShare}:</span>
                        <span>
                          ฿
                          {person.serviceChargeShare.toLocaleString('th-TH', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    )}

                    {person.vatShare > 0 && (
                      <div className="flex justify-between text-slate-500 dark:text-slate-400">
                        <span>{t.vatShare}:</span>
                        <span>
                          ฿
                          {person.vatShare.toLocaleString('th-TH', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    )}

                    {person.tipShare > 0 && (
                      <div className="flex justify-between text-purple-600 dark:text-purple-400 font-medium">
                        <span>{t.tipShare}:</span>
                        <span>
                          +฿
                          {person.tipShare.toLocaleString('th-TH', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    )}

                    {person.discountShare > 0 && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                        <span>{t.discountShare}:</span>
                        <span>
                          -฿
                          {person.discountShare.toLocaleString('th-TH', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between font-bold text-slate-900 dark:text-white pt-1 border-t border-slate-200 dark:border-slate-700 text-xs">
                      <span>{t.totalOwed}:</span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        ฿
                        {person.finalTotal.toLocaleString('th-TH', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
