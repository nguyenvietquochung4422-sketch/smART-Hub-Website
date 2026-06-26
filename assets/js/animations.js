(function () {
    'use strict';

    if (!window.IntersectionObserver) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    function initReveal() {
        ['.shll-reveal', '.shll-reveal-left', '.shll-reveal-right'].forEach(function (sel) {
            document.querySelectorAll(sel).forEach(function (el) {
                observer.observe(el);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReveal);
    } else {
        initReveal();
    }
}());
