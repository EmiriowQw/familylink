import React from 'react';

interface RecommendationCardProps {
  title: string;
  message: string;
  onDismiss?: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  message,
  onDismiss,
}) => {
  return (
    <div className="relative p-6 rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-indigo-200 shadow-xl">
      <div className="absolute top-4 right-4">
        <span className="text-4xl">💡</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3 pr-12">{title}</h3>
      <p className="text-gray-700 text-lg leading-relaxed mb-4">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="mt-4 w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg active:scale-98 transition-transform touch-target"
        >
          Понятно
        </button>
      )}
    </div>
  );
};
