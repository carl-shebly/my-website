/**
 * 谢辉 · 个人简历
 * Organic motion — gentle reveals, breathing rings, print guard
 */
(function () {
    'use strict';

    const EASE = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
    const DURATION = 400;

    /* ---- Staggered card entry ---- */
    const cards = document.querySelectorAll('.card');

    if (' IntersectionObserver' in window) {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        obs.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '0px 0px -32px 0px', threshold: 0.06 }
        );

        cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(14px)';
            card.style.transition = `opacity ${DURATION}ms ${EASE} ${i * 60}ms, transform ${DURATION}ms ${EASE} ${i * 60}ms`;
            obs.observe(card);
        });
    }

    /* ---- Masthead immediate reveal ---- */
    const masthead = document.querySelector('.masthead');
    if (masthead) {
        masthead.style.opacity = '0';
        masthead.style.transform = 'translateY(-6px)';
        masthead.style.transition = `opacity 420ms ${EASE}, transform 420ms ${EASE}`;
        requestAnimationFrame(() => {
            masthead.style.opacity = '1';
            masthead.style.transform = 'translateY(0)';
        });
    }

    /* ---- Print guard — reveal all before print ---- */
    window.addEventListener('beforeprint', () => {
        cards.forEach((c) => {
            c.style.opacity = '1';
            c.style.transform = 'none';
        });
    });
})();
