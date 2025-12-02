import React from 'react';
import { Mood } from '../data/mockData';

interface MoodButtonProps {
  mood: Mood;
  label: string;
  emoji: string;
  selected?: boolean;
  onClick: () => void;
}

const moodConfig = {
  joy: {
    color: 'bg-joy',
    gradient: 'from-emerald-400 to-green-500',
    shadow: 'shadow-emerald-200',
  },
  calm: {
    color: 'bg-calm',
    gradient: 'from-yellow-300 to-amber-400',
    shadow: 'shadow-yellow-200',
  },
  tired: {
    color: 'bg-tired',
    gradient: 'from-purple-400 to-violet-500',
    shadow: 'shadow-purple-200',
  },
  stress: {
    color: 'bg-stress',
    gradient: 'from-orange-400 to-red-500',
    shadow: 'shadow-orange-200',
  },
  anger: {
    color: 'bg-anger',
    gradient: 'from-red-500 to-rose-600',
    shadow: 'shadow-red-200',
  },
};

export const MoodButton: React.FC<MoodButtonProps> = ({
  mood,
  label,
  emoji,
  selected = false,
  onClick,
}) => {
  const config = moodConfig[mood];

  return (
    <button
      onClick={onClick}
      className={`
        relative w-32 h-32 rounded-full
        bg-gradient-to-br ${config.gradient}
        ${selected ? 'scale-110 ring-4 ring-white ring-offset-4 ring-offset-purple-50' : 'scale-100'}
        ${config.shadow} shadow-xl
        transition-all duration-300 ease-out
        active:scale-95
        touch-target
        flex flex-col items-center justify-center
        group
      `}
    >
      <span className="text-6xl mb-2 transform group-active:scale-90 transition-transform">
        {emoji}
      </span>
      <span className="text-white text-sm font-semibold drop-shadow-md">
        {label}
      </span>
      {selected && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
          <span className="text-green-500 text-xl">✓</span>
        </div>
      )}
    </button>
  );
};
