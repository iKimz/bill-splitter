'use client';

import React, { useState } from 'react';
import { Friend, Language } from '../types';
import { getTranslation } from '../utils/i18n';
import { getRandomAvatarColor } from '../utils/calculation';
import { Users, UserPlus, X } from 'lucide-react';

interface FriendsManagerProps {
  friends: Friend[];
  onAddFriend: (name: string) => void;
  onRemoveFriend: (id: string) => void;
  onUpdateFriendName: (id: string, name: string) => void;
  language: Language;
}

export const FriendsManager: React.FC<FriendsManagerProps> = ({
  friends,
  onAddFriend,
  onRemoveFriend,
  onUpdateFriendName,
  language,
}) => {
  const t = getTranslation(language);
  const [inputName, setInputName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = inputName.trim() || (language === 'en' ? `Friend ${friends.length + 1}` : `เพื่อนคนที่ ${friends.length + 1}`);
    onAddFriend(finalName);
    setInputName('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 sm:p-5 mb-6 transition-colors duration-200">
      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
            {t.friendsTitle} ({friends.length})
          </h2>
        </div>

        {/* Add Friend Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder={t.friendNamePlaceholder}
            className="flex-1 sm:w-48 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95 whitespace-nowrap"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{t.addFriend}</span>
          </button>
        </form>
      </div>

      {/* Friends List Badges */}
      {friends.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/30">
          <Users className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <p className="text-xs text-slate-500 dark:text-slate-400">{t.noFriends}</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2.5">
          {friends.map((friend, idx) => (
            <div
              key={friend.id}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 transition-all"
            >
              {/* Avatar indicator */}
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-xs"
                style={{ backgroundColor: friend.avatarColor || getRandomAvatarColor(idx) }}
              >
                {friend.name.charAt(0).toUpperCase()}
              </div>

              {/* Editable Name */}
              <input
                type="text"
                value={friend.name}
                onChange={(e) => onUpdateFriendName(friend.id, e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 border-b border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:border-blue-500 outline-none px-0.5 py-0 w-24 sm:w-28 transition-colors"
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => onRemoveFriend(friend.id)}
                className="text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 opacity-60 group-hover:opacity-100 transition-all"
                title="Remove friend"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
