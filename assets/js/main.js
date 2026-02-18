/**
 * $1perday! - Main JavaScript
 * Site functionality: navigation, calculator, FAQ, sharing, forms,
 * scroll reveals, smart header, animated counters.
 */

// ============================================
// SCROLL REVEAL — IntersectionObserver (zero deps)
// ============================================
function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!revealEls.length) return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealEls.forEach(el => el.classList.add('revealed'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
}

// ============================================
// AUTO-APPLY REVEAL CLASSES (no HTML changes needed)
// ============================================
function autoApplyReveals() {
    // Sections that should fade-in on scroll
    const revealSelectors = [
        '.method-card',
        '.funnel-step',
        '.review-card',
        '.guide-card',
        '.faq-item',
        '.info-box',
        '.disclaimer-section',
        '.earnings-showcase',
        '.calculator-section',
        '.newsletter-section',
        '.share-section',
        '.link-block',
        '.comparison-table-wrapper',
        '.start-funnel',
        'section > h2',
        'section > p'
    ];

    revealSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            // Don't double-apply
            if (el.classList.contains('reveal') || el.classList.contains('reveal-scale')) return;

            // Cards get staggered delays
            if (el.classList.contains('method-card') ||
                el.classList.contains('funnel-step') ||
                el.classList.contains('guide-card') ||
                el.classList.contains('faq-item')) {
                el.classList.add('reveal');
                const delay = (index % 5) + 1;
                el.classList.add('reveal-delay-' + delay);
            } else if (el.classList.contains('earnings-showcase') ||
                       el.classList.contains('calculator-section')) {
                el.classList.add('reveal-scale');
            } else {
                el.classList.add('reveal');
            }
        });
    });
}

// ============================================
// SMART HEADER — hide on scroll down, show on up
// ============================================
function initSmartHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 80) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        // Hide/show based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });
}

// ============================================
// HERO FLOATING PARTICLES (auto-injected)
// ============================================
function initHeroParticles() {
    const hero = document.querySelector('.hero');
    if (!hero || hero.querySelector('.hero-particles')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const particlesDiv = document.createElement('div');
    particlesDiv.className = 'hero-particles';
    particlesDiv.setAttribute('aria-hidden', 'true');

    const symbols = ['$', '\u00A2', '\u20BF', '\u00A5', '\u20AC', '\u00A3'];
    symbols.forEach(symbol => {
        const span = document.createElement('span');
        span.className = 'hero-particle';
        span.textContent = symbol;
        particlesDiv.appendChild(span);
    });

    hero.appendChild(particlesDiv);
}

// ============================================
// ANIMATED COUNTER — counts up on scroll
// ============================================
function initAnimatedCounters() {
    const amountEl = document.querySelector('.earnings-main .amount');
    if (!amountEl) return;

    const targetText = amountEl.textContent.trim(); // e.g. "$1.05"
    const targetVal = parseFloat(targetText.replace('$', ''));
    if (isNaN(targetVal)) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateCounter(amountEl, 0, targetVal, 1500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(amountEl);
}

function animateCounter(el, start, end, duration) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * eased;

        el.textContent = '$' + current.toFixed(2);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ============================================
// NAVIGATION HIGHLIGHTING
// ============================================
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.endsWith(href) ||
            (href === './' && (currentPath.endsWith('/') || currentPath.endsWith('/site/')))) {
            link.classList.add('active');
        }
    });
}

// ============================================
// REFERRAL LINK TRACKING
// ============================================
function trackReferralClick(linkName) {
    if (typeof gtag === 'function') {
        gtag('event', 'referral_click', { 'link_name': linkName });
    }
}

function initReferralTracking() {
    const referralLinks = document.querySelectorAll('.referral-link');
    referralLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkName = this.dataset.ref || this.textContent;
            trackReferralClick(linkName);
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// FAQ ACCORDION (with keyboard accessibility)
// ============================================
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.setAttribute('role', 'button');
            question.setAttribute('tabindex', '0');
            question.setAttribute('aria-expanded', 'false');

            function toggleFaq() {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherQ = otherItem.querySelector('.faq-question');
                        if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
                    }
                });

                item.classList.toggle('active');
                question.setAttribute('aria-expanded', item.classList.contains('active'));
            }

            question.addEventListener('click', toggleFaq);
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFaq();
                }
            });
        }
    });
}

// ============================================
// EARNINGS CALCULATOR (with input validation)
// ============================================
function clampValue(value, min, max) {
    if (isNaN(value) || value < min) return min;
    if (value > max) return max;
    return value;
}

function calculateEarnings() {
    const faucetTime = clampValue(parseFloat(document.getElementById('faucet-time')?.value), 0, 120);
    const ptcTime = clampValue(parseFloat(document.getElementById('ptc-time')?.value), 0, 120);
    const offerwallTime = clampValue(parseFloat(document.getElementById('offerwall-time')?.value), 0, 180);
    const socialTime = clampValue(parseFloat(document.getElementById('social-time')?.value), 0, 120);

    const rates = {
        faucet: 0.30,
        ptc: 0.20,
        offerwall: 1.50,
        social: 0.50
    };

    const dailyEarnings = (
        (faucetTime / 60) * rates.faucet +
        (ptcTime / 60) * rates.ptc +
        (offerwallTime / 60) * rates.offerwall +
        (socialTime / 60) * rates.social
    );

    const monthlyEarnings = dailyEarnings * 30;
    const totalTime = faucetTime + ptcTime + offerwallTime + socialTime;
    const hourlyRate = totalTime > 0 ? (dailyEarnings / (totalTime / 60)) : 0;

    const dailyEl = document.getElementById('daily-earnings');
    const monthlyEl = document.getElementById('monthly-earnings');
    const hourlyEl = document.getElementById('hourly-rate');
    const verdictEl = document.getElementById('earnings-verdict');

    if (dailyEl) dailyEl.textContent = '$' + dailyEarnings.toFixed(2);
    if (monthlyEl) monthlyEl.textContent = '$' + monthlyEarnings.toFixed(2);
    if (hourlyEl) hourlyEl.textContent = '$' + hourlyRate.toFixed(2) + '/hr';

    if (verdictEl) {
        if (hourlyRate < 0.50) {
            verdictEl.textContent = 'Very low return - consider other options';
            verdictEl.className = 'verdict verdict-low';
        } else if (hourlyRate < 1.00) {
            verdictEl.textContent = 'Below minimum wage in most countries';
            verdictEl.className = 'verdict verdict-medium';
        } else if (hourlyRate < 2.00) {
            verdictEl.textContent = 'Decent for passive income supplement';
            verdictEl.className = 'verdict verdict-good';
        } else {
            verdictEl.textContent = 'Above average - good method mix!';
            verdictEl.className = 'verdict verdict-great';
        }
    }
}

function initCalculator() {
    const calcInputs = document.querySelectorAll('.calc-input');
    calcInputs.forEach(input => {
        input.addEventListener('input', calculateEarnings);
        input.addEventListener('change', calculateEarnings);
    });

    if (document.getElementById('earnings-calculator')) {
        calculateEarnings();
    }
}

// ============================================
// SOCIAL SHARING
// ============================================
function shareOnTwitter() {
    const text = encodeURIComponent('Check out this honest guide to micro-earning online - no hype, just facts!');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=550,height=420');
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=550,height=420');
}

function shareOnReddit() {
    const title = encodeURIComponent(document.title);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://reddit.com/submit?url=${url}&title=${title}`, '_blank', 'width=550,height=420');
}

function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        const btn = document.querySelector('.share-copy');
        if (btn) {
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        }
    }).catch(() => {
        const btn = document.querySelector('.share-copy');
        if (btn) {
            btn.textContent = 'Copy failed';
            setTimeout(() => {
                btn.textContent = 'Copy Link';
            }, 2000);
        }
    });
}

// ============================================
// TABLE OF CONTENTS GENERATOR
// ============================================
function generateTOC() {
    // Original behavior: populate #table-of-contents container
    const tocContainer = document.getElementById('table-of-contents');
    if (tocContainer) {
        const article = document.querySelector('.article-content') || document.querySelector('main');
        if (!article) return;

        const headings = article.querySelectorAll('h2, h3');
        if (headings.length < 3) {
            tocContainer.style.display = 'none';
            return;
        }

        const tocList = document.createElement('ul');
        tocList.className = 'toc-list';

        headings.forEach((heading, index) => {
            if (!heading.id) heading.id = 'section-' + index;
            const li = document.createElement('li');
            li.className = heading.tagName === 'H3' ? 'toc-item toc-sub' : 'toc-item';
            const link = document.createElement('a');
            link.href = '#' + heading.id;
            link.textContent = heading.textContent;
            li.appendChild(link);
            tocList.appendChild(li);
        });

        tocContainer.appendChild(tocList);
        return;
    }

    // Fallback: auto-populate sidebar "In This Article" widget if its <ul> is empty
    const sidebarWidgets = document.querySelectorAll('.sidebar-widget');
    let tocWidget = null;
    sidebarWidgets.forEach(function(widget) {
        const h3 = widget.querySelector('h3');
        if (h3 && h3.textContent.trim() === 'In This Article') {
            tocWidget = widget;
        }
    });
    if (!tocWidget) return;

    const tocUl = tocWidget.querySelector('ul');
    if (!tocUl || tocUl.querySelectorAll('li').length > 0) return;

    const article = document.querySelector('.article-content');
    if (!article) return;

    const headings = article.querySelectorAll('h2, h3');
    if (headings.length < 2) {
        tocWidget.style.display = 'none';
        return;
    }

    headings.forEach(function(heading, index) {
        if (!heading.id) heading.id = 'section-' + index;
        var li = document.createElement('li');
        if (heading.tagName === 'H3') li.style.paddingLeft = '1rem';
        var link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        li.appendChild(link);
        tocUl.appendChild(li);
    });
}

// ============================================
// READING PROGRESS BAR
// ============================================
function initReadingProgress() {
    var articleContent = document.querySelector('.article-content');
    if (!articleContent) return;

    var bar = document.createElement('div');
    bar.className = 'reading-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    var ticking = false;

    function updateProgress() {
        var rect = articleContent.getBoundingClientRect();
        var articleTop = rect.top + window.scrollY;
        var articleHeight = rect.height;
        var windowHeight = window.innerHeight;
        var scrollY = window.scrollY;

        var start = articleTop;
        var end = articleTop + articleHeight - windowHeight;
        var progress = 0;

        if (end <= start) {
            progress = 100;
        } else if (scrollY <= start) {
            progress = 0;
        } else if (scrollY >= end) {
            progress = 100;
        } else {
            progress = ((scrollY - start) / (end - start)) * 100;
        }

        bar.style.width = progress + '%';
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });

    updateProgress();
}

// ============================================
// NATIVE MOBILE SHARE (Web Share API)
// ============================================
function initNativeShare() {
    if (!navigator.share) return;

    var shareSections = document.querySelectorAll('.share-section');
    shareSections.forEach(function(section) {
        var buttonsContainer = section.querySelector('.share-buttons');
        if (!buttonsContainer) return;

        // Remove platform-specific buttons (Twitter, Reddit, Facebook) but keep Copy Link
        var platformBtns = buttonsContainer.querySelectorAll('.share-twitter, .share-reddit, .share-facebook');
        platformBtns.forEach(function(btn) { btn.remove(); });

        // Create native share button and insert before Copy Link
        var nativeBtn = document.createElement('button');
        nativeBtn.className = 'share-btn share-btn-native';
        nativeBtn.textContent = 'Share';
        nativeBtn.addEventListener('click', function() {
            navigator.share({
                title: document.title,
                url: window.location.href
            }).catch(function() {});
        });

        var copyBtn = buttonsContainer.querySelector('.share-copy');
        buttonsContainer.insertBefore(nativeBtn, copyBtn);
    });
}

// ============================================
// BLOG CATEGORY FILTERING
// ============================================
function initCategoryFilter() {
    var categoryLinks = document.querySelectorAll('.category-tags a[data-category]');
    if (!categoryLinks.length) return;

    var cards = document.querySelectorAll('.guide-card[data-category]');
    if (!cards.length) return;

    var postCount = document.querySelector('.post-count');

    categoryLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var category = this.getAttribute('data-category');

            // Update active state
            categoryLinks.forEach(function(l) { l.classList.remove('active'); });
            this.classList.add('active');

            // Filter cards
            var visibleCount = 0;
            cards.forEach(function(card) {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Update post count badge
            if (postCount) {
                if (category === 'all') {
                    postCount.textContent = cards.length + ' article' + (cards.length !== 1 ? 's' : '');
                } else {
                    postCount.textContent = visibleCount + ' ' + category + ' article' + (visibleCount !== 1 ? 's' : '');
                }
            }

            // Update URL hash
            if (category === 'all') {
                history.replaceState(null, '', window.location.pathname);
            } else {
                history.replaceState(null, '', '#' + category.toLowerCase().replace(/\s+/g, '-'));
            }
        });
    });

    // Check for hash on page load
    var hash = window.location.hash.slice(1);
    if (hash) {
        var matchingLink = null;
        categoryLinks.forEach(function(link) {
            var cat = link.getAttribute('data-category');
            if (cat && cat.toLowerCase().replace(/\s+/g, '-') === hash) {
                matchingLink = link;
            }
        });
        if (matchingLink) matchingLink.click();
    }
}

// ============================================
// LAST UPDATED DISPLAY
// ============================================
function initLastUpdated() {
    const lastUpdatedEl = document.querySelector('.last-updated');
    if (lastUpdatedEl && !lastUpdatedEl.textContent.trim()) {
        const date = new Date(document.lastModified);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        lastUpdatedEl.textContent = 'Last updated: ' + date.toLocaleDateString('en-US', options);
    }
}

// ============================================
// NEWSLETTER FORM
// ============================================
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const button = form.querySelector('button');
    const message = form.querySelector('.newsletter-message');
    const formData = new FormData(form);

    button.disabled = true;
    button.textContent = 'Subscribing...';

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok || response.redirected) {
            if (message) {
                message.textContent = 'Thanks for subscribing! Check your email to confirm.';
                message.className = 'newsletter-message success';
            }
            form.reset();
        } else {
            if (message) {
                message.textContent = 'Something went wrong. Please try again.';
                message.className = 'newsletter-message error';
            }
        }
    })
    .catch(() => {
        if (message) {
            message.textContent = 'Something went wrong. Please try again.';
            message.className = 'newsletter-message error';
        }
    })
    .finally(() => {
        button.disabled = false;
        button.textContent = 'Subscribe';
    });
}

function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

// ============================================
// PROMO POPUP
// ============================================
function initPromoPopup() {
    if (sessionStorage.getItem('promoPopupShown')) {
        return;
    }

    const popupHTML = `
        <div class="promo-popup-overlay" id="promoPopup">
            <div class="promo-popup promo-success-popup">
                <button class="promo-popup-close" onclick="closePromoPopup()" aria-label="Close">&times;</button>
                <div class="promo-popup-header promo-success-header">
                    <span class="promo-success-icon">&#11088;</span>
                    <h3>MakeYouTask &mdash; The #1 Micro-Earning Site</h3>
                </div>
                <div class="promo-popup-content promo-success-content">
                    <p class="promo-highlight-text">Looking for the <strong>best way to earn online</strong> in 2026? MakeYouTask is the undisputed champion of micro-earning platforms.</p>
                    <p class="promo-feature-text">Easy payouts, minimal thresholds, and one of the most <strong>lucrative referral programs</strong> in the space &mdash; earn up to <strong>20% of your referrals' earnings</strong> for life.</p>
                    <p class="promo-cta-text">Whether you're completing surveys, tasks, or offerwalls, MakeYouTask makes every minute count.</p>
                    <a href="reviews/makeyoutask" class="promo-success-cta">Read Our Full Review &rarr;</a>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);

    setTimeout(() => {
        const popup = document.getElementById('promoPopup');
        if (popup) {
            popup.classList.add('active');
        }
    }, 500);

    sessionStorage.setItem('promoPopupShown', 'true');
}

function closePromoPopup() {
    const popup = document.getElementById('promoPopup');
    if (popup) {
        popup.classList.remove('active');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
}

// ============================================
// ENHANCED CARD HOVER — subtle tilt effect
// ============================================
function initCardTilt() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window) return; // Skip on touch devices

    const cards = document.querySelectorAll('.method-card, .funnel-step, .guide-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `translateY(-6px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ============================================
// PROGRESS BAR ANIMATION — animate bar fills on scroll
// ============================================
function initBarAnimations() {
    const bars = document.querySelectorAll('.bar-fill');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        bar.style.width = width;
                    });
                });
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));
}

// ============================================
// DARK MODE TOGGLE
// ============================================
function initDarkMode() {
    // Determine initial theme
    var stored = localStorage.getItem('theme');
    var theme;
    if (stored === 'dark' || stored === 'light') {
        theme = stored;
    } else {
        theme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);

    // Inject toggle button into header
    var headerInner = document.querySelector('.header-inner');
    if (!headerInner) return;

    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.setAttribute('title', 'Toggle dark mode');
    btn.innerHTML = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';

    btn.addEventListener('click', function() {
        var current = document.documentElement.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        btn.innerHTML = next === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    });

    headerInner.appendChild(btn);
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Theme
    initDarkMode();

    // Core functionality
    highlightCurrentPage();
    initReferralTracking();
    initSmoothScroll();
    initFaqAccordion();
    initCalculator();
    generateTOC();
    initLastUpdated();
    initNewsletter();
    initPromoPopup();

    // Blog enhancements
    initReadingProgress();
    initNativeShare();
    initCategoryFilter();

    // Enhanced interactions
    autoApplyReveals();
    initScrollReveal();
    initSmartHeader();
    initHeroParticles();
    initAnimatedCounters();
    initCardTilt();
    initBarAnimations();
});

// Close popup on overlay click or escape
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('promo-popup-overlay')) {
        closePromoPopup();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePromoPopup();
    }
});
