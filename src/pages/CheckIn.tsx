import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { MoodButton } from '../components/MoodButton';
import { Mood } from '../data/mockData';

const moods = [
  { mood: 'joy' as Mood, label: 'Радость', emoji: '🟢' },
  { mood: 'calm' as Mood, label: 'Спокойствие', emoji: '🟡' },
  { mood: 'tired' as Mood, label: 'Усталость', emoji: '🟣' },
  { mood: 'stress' as Mood, label: 'Стресс', emoji: '🟠' },
  { mood: 'anger' as Mood, label: 'Злость', emoji: '🔴' },
];

export const CheckIn: React.FC = () => {
  const navigate = useNavigate();
  const { addCheckIn, currentUser } = useMockData();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (!selectedMood) return;

    addCheckIn(selectedMood, comment.trim() || undefined);
    navigate('/recommendations', { state: { mood: selectedMood } });
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen px-6 py-12 pb-32">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Как ты себя чувствуешь?</h1>
          <p className="text-gray-600 text-lg">Выбери своё настроение</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {moods.map(({ mood, label, emoji }) => (
            <MoodButton
              key={mood}
              mood={mood}
              label={label}
              emoji={emoji}
              selected={selectedMood === mood}
              onClick={() => setSelectedMood(mood)}
            />
          ))}
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-3 text-lg">
            Комментарий (необязательно)
          </label>
          <textarea
            value={comment}
            onChange={(e) => {
              if (e.target.value.length <= 120) {
                setComment(e.target.value);
              }
            }}
            placeholder="Расскажи, что происходит..."
            maxLength={120}
            rows={4}
            className="w-full px-5 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-lg resize-none touch-target"
          />
          <div className="text-right mt-2 text-sm text-gray-400">
            {comment.length}/120
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedMood}
          className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed touch-target active:scale-98 transition-transform"
        >
          Отправить
        </button>
      </div>
    </div>
  );
};
