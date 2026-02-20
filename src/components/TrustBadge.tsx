import React from 'react';

interface TrustBadgeProps {
    icon: React.ReactNode;
    label: string;
    animate?: boolean;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon, label, animate = false }) => (
    <div
        className={`
      flex items-center gap-2.5 px-4 py-2.5 rounded-lg
      border border-white/[0.06] bg-white/[0.03]
      text-text-secondary text-xs tracking-wider uppercase font-medium
      select-none
      ${animate ? 'animate-lock-pulse' : ''}
    `}
    >
        <span className="text-sapphire-light flex-shrink-0">{icon}</span>
        <span>{label}</span>
    </div>
);

export default TrustBadge;
