import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Домой', icon: '🏠' },
  { path: '/checkin', label: 'Чек-ин', icon: '✨' },
  { path: '/history', label: 'История', icon: '📊' },
  { path: '/profile', label: 'Профиль', icon: '👤' },
];

export const BottomNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t-2 border-purple-100 shadow-2xl safe-area-inset-bottom">
      <div className="flex justify-around items-center h-20 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center
                flex-1 h-full
                transition-all duration-200
                ${isActive ? 'scale-110' : 'scale-100'}
              `}
            >
              <span className={`text-3xl mb-1 ${isActive ? 'scale-110' : ''} transition-transform`}>
                {item.icon}
              </span>
              <span
                className={`text-xs font-semibold ${
                  isActive ? 'text-purple-600' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-purple-600 rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
