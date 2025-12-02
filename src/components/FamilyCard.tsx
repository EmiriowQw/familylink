import React from 'react';
import { FamilyMember, Mood } from '../data/mockData';

interface FamilyCardProps {
  member: FamilyMember;
  onClick?: () => void;
}

const moodEmoji: Record<Mood, string> = {
  joy: '🟢',
  calm: '🟡',
  tired: '🟣',
  stress: '🟠',
  anger: '🔴',
};

const moodColors: Record<Mood, string> = {
  joy: 'bg-joy/20 border-joy',
  calm: 'bg-calm/20 border-calm',
  tired: 'bg-tired/20 border-tired',
  stress: 'bg-stress/20 border-stress',
  anger: 'bg-anger/20 border-anger',
};

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const FamilyCard: React.FC<FamilyCardProps> = ({ member, onClick }) => {
  const { user, currentMood, currentComment } = member;
  const moodColor = currentMood ? moodColors[currentMood] : 'bg-gray-100 border-gray-300';
  const emoji = currentMood ? moodEmoji[currentMood] : '⚪';

  return (
    <div
      onClick={onClick}
      className={`
        ${onClick ? 'cursor-pointer active:scale-98' : ''}
        p-5 rounded-3xl border-2 ${moodColor}
        backdrop-blur-sm bg-white/60
        transition-all duration-200
        shadow-lg hover:shadow-xl
      `}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {getInitials(user.name)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
            <span className="text-3xl">{emoji}</span>
          </div>
          {currentComment && (
            <p className="text-gray-600 text-sm leading-relaxed">{currentComment}</p>
          )}
          {!currentMood && (
            <p className="text-gray-400 text-sm italic">Ещё не отметился сегодня</p>
          )}
        </div>
      </div>
    </div>
  );
};
