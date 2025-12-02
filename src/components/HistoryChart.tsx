import React from 'react';
import { Mood, CheckIn } from '../data/mockData';

interface HistoryChartProps {
  checkIns: CheckIn[];
  userId: string;
}

const moodColors: Record<Mood, string> = {
  joy: '#10B981',
  calm: '#FBBF24',
  tired: '#A78BFA',
  stress: '#F97316',
  anger: '#EF4444',
};

const moodLabels: Record<Mood, string> = {
  joy: 'Радость',
  calm: 'Спокойствие',
  tired: 'Усталость',
  stress: 'Стресс',
  anger: 'Злость',
};

export const HistoryChart: React.FC<HistoryChartProps> = ({ checkIns, userId }) => {
  const userCheckIns = checkIns.filter((ci) => ci.userId === userId);

  // Получаем последние 7 дней
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const getCheckInForDate = (date: Date): CheckIn | undefined => {
    const dateStr = date.toISOString().split('T')[0];
    return userCheckIns.find((ci) => ci.date.startsWith(dateStr));
  };

  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-2 h-64 mb-4">
        {days.map((day, index) => {
          const checkIn = getCheckInForDate(day);
          const mood = checkIn?.mood;
          const height = mood ? '100%' : '20%';
          const color = mood ? moodColors[mood] : '#E5E7EB';

          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full rounded-t-2xl transition-all duration-300 hover:opacity-80"
                style={{
                  height,
                  backgroundColor: color,
                  minHeight: '20px',
                }}
              />
              <div className="mt-2 text-xs font-semibold text-gray-600">
                {dayNames[day.getDay() === 0 ? 6 : day.getDay() - 1]}
              </div>
              <div className="text-xs text-gray-400">{day.getDate()}</div>
            </div>
          );
        })}
      </div>

      {/* Легенда */}
      <div className="flex flex-wrap gap-3 justify-center mt-6">
        {Object.entries(moodLabels).map(([mood, label]) => (
          <div key={mood} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: moodColors[mood as Mood] }}
            />
            <span className="text-sm text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
