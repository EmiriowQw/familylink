import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { Role } from '../data/mockData';
import { mockUsers } from '../data/mockData';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useMockData();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  const handleLogin = () => {
    if (!email || !role) return;

    // Находим пользователя или создаем нового
    let user = mockUsers.find((u) => u.role === role);
    if (!user) {
      user = { id: `user-${Date.now()}`, name: role === 'parent' ? 'Родитель' : 'Ребёнок', role };
    }

    setCurrentUser(user);

    if (isJoining && joinCode) {
      navigate('/family-setup', { state: { joinCode } });
    } else {
      navigate('/family-setup');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4">🌉</h1>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Семейный Мост</h2>
          <p className="text-gray-600 text-lg">Эмоциональная связь в семье</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-purple-100">
          {!isJoining ? (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  Телефон или Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-lg touch-target"
                />
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  Выберите роль
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setRole('parent')}
                    className={`
                      py-6 px-4 rounded-2xl border-2 transition-all duration-200
                      ${role === 'parent' 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-purple-600 shadow-xl scale-105' 
                        : 'bg-white border-purple-200 text-gray-700 hover:border-purple-400'
                      }
                      touch-target font-semibold text-lg
                      active:scale-95
                    `}
                  >
                    👨‍👩‍👧 Родитель
                  </button>
                  <button
                    onClick={() => setRole('child')}
                    className={`
                      py-6 px-4 rounded-2xl border-2 transition-all duration-200
                      ${role === 'child' 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-purple-600 shadow-xl scale-105' 
                        : 'bg-white border-purple-200 text-gray-700 hover:border-purple-400'
                      }
                      touch-target font-semibold text-lg
                      active:scale-95
                    `}
                  >
                    👶 Ребёнок
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={!email || !role}
                className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed touch-target active:scale-98 transition-transform mb-4"
              >
                Войти
              </button>

              <button
                onClick={() => setIsJoining(true)}
                className="w-full py-4 text-purple-600 font-semibold text-lg touch-target"
              >
                Присоединиться по коду
              </button>
            </>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  Код приглашения
                </label>
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-2xl text-center font-bold tracking-widest touch-target"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  Выберите роль
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setRole('parent')}
                    className={`
                      py-6 px-4 rounded-2xl border-2 transition-all duration-200
                      ${role === 'parent' 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-purple-600 shadow-xl scale-105' 
                        : 'bg-white border-purple-200 text-gray-700 hover:border-purple-400'
                      }
                      touch-target font-semibold text-lg
                      active:scale-95
                    `}
                  >
                    👨‍👩‍👧 Родитель
                  </button>
                  <button
                    onClick={() => setRole('child')}
                    className={`
                      py-6 px-4 rounded-2xl border-2 transition-all duration-200
                      ${role === 'child' 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-purple-600 shadow-xl scale-105' 
                        : 'bg-white border-purple-200 text-gray-700 hover:border-purple-400'
                      }
                      touch-target font-semibold text-lg
                      active:scale-95
                    `}
                  >
                    👶 Ребёнок
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={!joinCode || !role}
                className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed touch-target active:scale-98 transition-transform mb-4"
              >
                Присоединиться
              </button>

              <button
                onClick={() => setIsJoining(false)}
                className="w-full py-4 text-purple-600 font-semibold text-lg touch-target"
              >
                Назад
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
