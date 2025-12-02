import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';

export const FamilySetup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { family, setCurrentUser, currentUser } = useMockData();
  const [isCreator, setIsCreator] = useState(true);
  const [code, setCode] = useState(family.code);

  useEffect(() => {
    const joinCode = location.state?.joinCode;
    if (joinCode) {
      setIsCreator(false);
      setCode(joinCode);
    }
  }, [location]);

  const handleContinue = () => {
    navigate('/');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert('Код скопирован!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-4">🏠</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isCreator ? 'Семейная комната' : 'Присоединение к семье'}
          </h2>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-purple-100">
          {isCreator ? (
            <>
              <div className="text-center mb-8">
                <p className="text-gray-600 text-lg mb-6">
                  Поделитесь этим кодом с членами семьи:
                </p>
                <div className="relative">
                  <div className="text-6xl font-bold text-purple-600 tracking-widest mb-4 py-4 bg-purple-50 rounded-2xl">
                    {code}
                  </div>
                  <button
                    onClick={copyCode}
                    className="w-full py-4 bg-purple-100 text-purple-700 rounded-2xl font-semibold text-lg touch-target active:scale-98 transition-transform"
                  >
                    📋 Копировать код
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Участники семьи:</h3>
                <div className="space-y-3">
                  {family.members.map((member) => (
                    <div
                      key={member.user.id}
                      className="flex items-center gap-3 p-4 bg-purple-50 rounded-2xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                        {member.user.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{member.user.name}</p>
                        <p className="text-sm text-gray-500">
                          {member.user.role === 'parent' ? 'Родитель' : 'Ребёнок'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <p className="text-gray-600 text-lg mb-6">
                  Вы присоединяетесь к семье с кодом:
                </p>
                <div className="text-6xl font-bold text-purple-600 tracking-widest mb-6 py-4 bg-purple-50 rounded-2xl">
                  {code}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Участники семьи:</h3>
                <div className="space-y-3">
                  {family.members.map((member) => (
                    <div
                      key={member.user.id}
                      className="flex items-center gap-3 p-4 bg-purple-50 rounded-2xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                        {member.user.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{member.user.name}</p>
                        <p className="text-sm text-gray-500">
                          {member.user.role === 'parent' ? 'Родитель' : 'Ребёнок'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <button
            onClick={handleContinue}
            className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl shadow-lg touch-target active:scale-98 transition-transform"
          >
            Продолжить
          </button>
        </div>
      </div>
    </div>
  );
};
