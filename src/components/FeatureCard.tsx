import React from 'react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    image: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, image }) => (
    <div className="glass-card-hover rounded-2xl overflow-hidden group cursor-pointer">
        <div className="aspect-[4/3] overflow-hidden bg-background">
            <img
                src={image}
                alt={`Illustration of Velox feature: ${title}`}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
            />
        </div>
        <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
                <span className="text-primary">{icon}</span>
                <h3 className="text-text-primary font-semibold text-lg">{title}</h3>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
        </div>
    </div>
);

export default FeatureCard;
