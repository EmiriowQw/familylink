import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { HistoryChart } from '../components/HistoryChart';
import { BottomNavigation } from '../components/BottomNavigation';

export const History: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, checkIns, getCheckInsByUser } = useMockData();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const userCheckIns = getCheckInsByUser(currentUser.id);
  const last7DaysCheckIns = userCheckIns.slice(0, 7);

  // Анализ резких изменений
  const getSignificantChanges = () => {
    const moodValues = { joy: 5, calm: 4, tired: 2, stress: 1, anger: 0 };
    const changes: string[] = [];

    for (let i = 1; i < last7DaysCheckIns.length; i++) {
      const prev = moodValues[last7DaysCheckIns[i - 1].mood];
      const curr = moodValues[last7DaysCheckIns[i].mood];
      const diff = Math.abs(curr - prev);

      if (diff >= 3) {
        const date = new Date(last7DaysCheckIns[i].date);
        const dayName = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'][date.getDay()];
        changes.push(`${dayName} было резкое изменение настроения`);
      }
    }

    return changes;
  };

  const significantChanges = getSignificantChanges();

  return (
    <div className="min-h-screen px-6 py-8 pb-32">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">История настроений</h1>
          <p className="text-gray-600 text-lg">Последние 7 дней</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border-2 border-purple-100 mb-6">
          <HistoryChart checkIns={checkIns} userId={currentUser.id} />
        </div>

        {significantChanges.length > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-5 border-2 border-orange-200 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">⚠️ Обратите внимание</h3>
            <ul className="space-y-2">
              {significantChanges.map((change, index) => (
                <li key={index} className="text-gray-700 text-lg">
                  • {change}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-gray-600 text-sm">
              Возможно, стоит поговорить об этом в выходные.
            </p>
          </div>
        )}

        {last7DaysCheckIns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Пока нет истории чек-инов</p>
            <button
              onClick={() => navigate('/checkin')}
              className="mt-6 py-4 px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg touch-target active:scale-98 transition-transform"
            >
              Сделать первый чек-ин
            </button>
          </div>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
};
