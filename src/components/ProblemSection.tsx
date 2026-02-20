import React from 'react';
import ScrollReveal from './ScrollReveal';

const ProblemSection: React.FC = () => (
    <section id="problem" className="relative py-24 lg:py-32 px-5">
        <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="up">
                <p className="text-sapphire-light text-sm font-semibold uppercase tracking-widest mb-4 text-center">
                    The Problem
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-text-primary mb-6 tracking-tight">
                    You're earning rewards.
                    <br />
                    <span className="text-text-secondary">You're losing most of them.</span>
                </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
                <div className="max-w-3xl mx-auto space-y-5 text-text-secondary text-base sm:text-lg leading-relaxed mb-12">
                    <p>
                        You have three, maybe four credit cards. Each one promises incredible rewards.
                        And every month, you spend — on groceries, dining, travel, EMIs — and those
                        rewards quietly accumulate in five different bank apps you never open.
                    </p>
                    <p>
                        The rules are deliberately complex. Rotating categories. Hidden caps. Milestone
                        thresholds. Point values that shift depending on how you redeem. By the time
                        you understand the system, half your points have expired.
                    </p>
                    <p>
                        This isn't bad luck. It's how reward programs are designed.
                        <span className="text-text-primary font-medium"> Banks profit from your confusion.</span>
                    </p>
                </div>
            </ScrollReveal>

            {/* Pull quote */}
            <ScrollReveal direction="up" delay={300}>
                <blockquote className="glass-card rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto border-l-2 border-primary/40">
                    <p className="text-text-primary text-base sm:text-lg font-medium leading-relaxed italic">
                        "Indians leave over ₹8,000 crore in unredeemed credit card rewards on the
                        table every year. Not because they don't want them. Because nobody made it
                        easy to claim them."
                    </p>
                </blockquote>
            </ScrollReveal>
        </div>
    </section>
);

export default ProblemSection;
