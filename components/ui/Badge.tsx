
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'gray' | 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, color = 'gray', className = '' }) => {
  const colorClasses = {
    gray: 'bg-slate-600 text-slate-100',
    blue: 'bg-blue-900/50 text-blue-300 border border-blue-500/30',
    green: 'bg-green-900/50 text-green-300 border border-green-500/30',
    yellow: 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30',
    red: 'bg-red-900/50 text-red-300 border border-red-500/30',
    purple: 'bg-purple-900/50 text-purple-300 border border-purple-500/30',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
