import React from 'react';
import ScrollReveal from './ScrollReveal';
import TrustBadge from './TrustBadge';
import { LockIcon, ShieldIcon, EncryptionKeyIcon, CloudIcon, AnalyticsIcon } from './icons';

const badges = [
    { icon: <EncryptionKeyIcon size={16} />, label: 'AES-256 Encrypted' },
    { icon: <LockIcon size={16} />, label: 'TLS 1.3 Secure', animate: true },
    { icon: <CloudIcon size={16} />, label: 'RBI AA Enabled' },
    { icon: <ShieldIcon size={16} />, label: 'DPDP Compliant' },
    { icon: <AnalyticsIcon size={16} />, label: 'VAPT Audited' },
];

const TrustSection: React.FC = () => (
    <section id="trust" className="relative py-24 lg:py-32 px-5">
        <div className="section-line max-w-4xl mx-auto mb-24" />

        <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up">
                <p className="text-sapphire-light text-sm font-semibold uppercase tracking-widest mb-4">
                    Trust & Compliance
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6 tracking-tight">
                    Security isn't a feature.
                    <br />
                    <span className="text-text-secondary">It's the architecture.</span>
                </h2>
                <p className="text-text-secondary max-w-xl mx-auto text-lg mb-12">
                    Built compliance-first from day one. Your financial data is encrypted in
                    transit and at rest, with zero server-side storage of raw credentials.
                </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
                <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
                    {badges.map((badge) => (
                        <TrustBadge key={badge.label} {...badge} />
                    ))}
                </div>
            </ScrollReveal>
        </div>
    </section>
);

export default TrustSection;
