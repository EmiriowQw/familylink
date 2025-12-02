import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { RecommendationCard } from '../components/RecommendationCard';
import { Mood, Role } from '../data/mockData';

const recommendations: Record<string, Record<Role, string>> = {
  joy: {
    parent: 'Отличное настроение! Это прекрасное время для совместных активностей с детьми.',
    child: 'Прекрасно! Поделись своей радостью с родителями.',
  },
  calm: {
    parent: 'Спокойный день — хорошее время для неспешных разговоров с детьми.',
    child: 'Спокойствие — это хорошо. Наслаждайся моментом.',
  },
  tired: {
    parent: 'Если ребёнок устал, дай ему пространство. Спроси мягко: "Как прошёл день?"',
    child: 'Ты устал. Скажи родителям: "Сегодня устал, мне нужно время отдохнуть".',
  },
  stress: {
    parent: 'Ребёнок в стрессе. Не начинай серьёзных разговоров. Скажи: "Я рядом, когда будешь готов".',
    child: 'Родители в стрессе. Подожди немного времени, не начинай серьёзных разговоров.',
  },
  anger: {
    parent: 'Ребёнок злится. Дай пространство. Скажи: "Я рядом, когда будешь готов". Не дави.',
    child: 'Родители злятся. Будь внимателен, предложи маленькую помощь. Дай им время.',
  },
};

const recommendationTitles: Record<string, Record<Role, string>> = {
  joy: {
    parent: 'Радостный день!',
    child: 'Ты в радости!',
  },
  calm: {
    parent: 'Спокойный день',
    child: 'Спокойствие',
  },
  tired: {
    parent: 'Ребёнок устал',
    child: 'Ты устал',
  },
  stress: {
    parent: 'Ребёнок в стрессе',
    child: 'Родители в стрессе',
  },
  anger: {
    parent: 'Ребёнок злится',
    child: 'Родители злятся',
  },
};

export const Recommendations: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useMockData();

  const mood = location.state?.mood as Mood | undefined;
  const memberName = location.state?.memberName as string | undefined;
  const memberRole = location.state?.memberRole as Role | undefined;

  // Если смотрим рекомендации для другого члена семьи
  const targetRole = memberRole || currentUser?.role || 'parent';
  const targetMood = mood || 'calm';

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const title = memberName 
    ? `${recommendationTitles[targetMood][targetRole]} (${memberName})`
    : recommendationTitles[targetMood][targetRole];
  
  const message = recommendations[targetMood][targetRole];

  return (
    <div className="min-h-screen px-6 py-12 pb-32">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Рекомендация</h1>
          <p className="text-gray-600 text-lg">Совет для общения</p>
        </div>

        <RecommendationCard
          title={title}
          message={message}
          onDismiss={() => navigate('/')}
        />

        <button
          onClick={() => navigate('/')}
          className="mt-6 w-full py-4 text-purple-600 font-semibold text-lg touch-target"
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );
};
