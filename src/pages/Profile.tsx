import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { BottomNavigation } from '../components/BottomNavigation';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, family, setCurrentUser } = useMockData();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-32">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-4xl font-bold shadow-xl mx-auto mb-4">
            {getInitials(currentUser.name)}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentUser.name}</h1>
          <p className="text-gray-600 text-lg">
            {currentUser.role === 'parent' ? 'Родитель' : 'Ребёнок'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border-2 border-purple-100 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Семейная комната</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl">
              <span className="text-gray-700 font-semibold">Код семьи</span>
              <span className="text-2xl font-bold text-purple-600 tracking-widest">
                {family.code}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl">
              <span className="text-gray-700 font-semibold">Участников</span>
              <span className="text-2xl font-bold text-purple-600">
                {family.members.length}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-5 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl font-bold text-xl shadow-lg touch-target active:scale-98 transition-transform"
        >
          Выйти
        </button>
      </div>
      <BottomNavigation />
    </div>
  );
};
