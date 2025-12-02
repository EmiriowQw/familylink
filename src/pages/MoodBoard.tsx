import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { FamilyCard } from '../components/FamilyCard';
import { BottomNavigation } from '../components/BottomNavigation';

export const MoodBoard: React.FC = () => {
  const navigate = useNavigate();
  const { family, currentUser, getFamilyMember } = useMockData();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const currentUserMember = getFamilyMember(currentUser.id);
  const hasCheckedInToday = currentUserMember?.lastCheckIn 
    ? new Date(currentUserMember.lastCheckIn).toDateString() === new Date().toDateString()
    : false;

  // Вычисляем общее настроение семьи
  const getOverallMood = () => {
    const moods = family.members
      .filter((m) => m.currentMood)
      .map((m) => m.currentMood!);

    if (moods.length === 0) return null;

    const moodValues = { joy: 5, calm: 4, tired: 2, stress: 1, anger: 0 };
    const avg = moods.reduce((sum, mood) => sum + moodValues[mood], 0) / moods.length;

    if (avg >= 4.5) return { mood: 'joy', emoji: '🟢', color: 'bg-joy', label: 'Отлично' };
    if (avg >= 3.5) return { mood: 'calm', emoji: '🟡', color: 'bg-calm', label: 'Спокойно' };
    if (avg >= 2.5) return { mood: 'tired', emoji: '🟣', color: 'bg-tired', label: 'Усталость' };
    if (avg >= 1.5) return { mood: 'stress', emoji: '🟠', color: 'bg-stress', label: 'Стресс' };
    return { mood: 'anger', emoji: '🔴', color: 'bg-anger', label: 'Напряжение' };
  };

  const overallMood = getOverallMood();

  return (
    <div className="min-h-screen px-6 py-8 pb-32">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Настроение семьи</h1>
          {overallMood && (
            <div className="mt-4 inline-flex items-center gap-3 px-6 py-3 bg-white/80 rounded-2xl shadow-lg">
              <span className="text-3xl">{overallMood.emoji}</span>
              <span className="text-lg font-semibold text-gray-700">
                {overallMood.label}
              </span>
            </div>
          )}
        </div>

        {!hasCheckedInToday && (
          <div className="mb-6 p-5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-200">
            <p className="text-center text-gray-700 font-semibold text-lg mb-3">
              Ты ещё не отметился сегодня
            </p>
            <button
              onClick={() => navigate('/checkin')}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg touch-target active:scale-98 transition-transform"
            >
              Сделать чек-ин
            </button>
          </div>
        )}

        <div className="space-y-4 mb-6">
          {family.members.map((member) => (
            <FamilyCard
              key={member.user.id}
              member={member}
              onClick={() => {
                if (member.currentMood) {
                  navigate('/recommendations', { 
                    state: { 
                      mood: member.currentMood,
                      memberName: member.user.name,
                      memberRole: member.user.role,
                    } 
                  });
                }
              }}
            />
          ))}
        </div>

        <div className="text-center text-gray-500 text-sm">
          Нажми на карточку, чтобы увидеть рекомендации
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};
