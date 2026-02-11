/**
 * $1perday! - Main JavaScript
 * Site functionality for navigation, calculator, FAQ, sharing, and forms.
 */

// ============================================
// NAVIGATION HIGHLIGHTING
// ============================================
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.endsWith(href) ||
            (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/site/')))) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', highlightCurrentPage);

// ============================================
// REFERRAL LINK TRACKING
// ============================================
function trackReferralClick(linkName) {
    if (typeof gtag === 'function') {
        gtag('event', 'referral_click', { 'link_name': linkName });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const referralLinks = document.querySelectorAll('.referral-link');
    referralLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkName = this.dataset.ref || this.textContent;
            trackReferralClick(linkName);
        });
    });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// ============================================
// FAQ ACCORDION (with keyboard accessibility)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            // Add accessibility attributes
            question.setAttribute('role', 'button');
            question.setAttribute('tabindex', '0');
            question.setAttribute('aria-expanded', 'false');

            function toggleFaq() {
                // Close all other FAQs
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
});

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

document.addEventListener('DOMContentLoaded', function() {
    const calcInputs = document.querySelectorAll('.calc-input');
    calcInputs.forEach(input => {
        input.addEventListener('input', calculateEarnings);
        input.addEventListener('change', calculateEarnings);
    });

    if (document.getElementById('earnings-calculator')) {
        calculateEarnings();
    }
});

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
    const tocContainer = document.getElementById('table-of-contents');
    if (!tocContainer) return;

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
        if (!heading.id) {
            heading.id = 'section-' + index;
        }

        const li = document.createElement('li');
        li.className = heading.tagName === 'H3' ? 'toc-item toc-sub' : 'toc-item';

        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;

        li.appendChild(link);
        tocList.appendChild(li);
    });

    tocContainer.appendChild(tocList);
}

document.addEventListener('DOMContentLoaded', generateTOC);

// ============================================
// LAST UPDATED DISPLAY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const lastUpdatedEl = document.querySelector('.last-updated');
    if (lastUpdatedEl && !lastUpdatedEl.textContent.trim()) {
        const date = new Date(document.lastModified);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        lastUpdatedEl.textContent = 'Last updated: ' + date.toLocaleDateString('en-US', options);
    }
});

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
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
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

document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
});

// ============================================
// WARNING POPUP
// ============================================
function initPromoPopup() {
    if (sessionStorage.getItem('promoPopupShown')) {
        return;
    }

    const popupHTML = `
        <div class="promo-popup-overlay" id="promoPopup">
            <div class="promo-popup warning-popup">
                <button class="promo-popup-close" onclick="closePromoPopup()" aria-label="Close">&times;</button>
                <div class="promo-popup-header warning-header">
                    <span class="warning-icon">&#9888;</span>
                    <h3>VieFaucet Payout Warning</h3>
                </div>
                <div class="promo-popup-content warning-content">
                    <p class="warning-main-text">VieFaucet's payout wallets are currently <strong>empty</strong>. Withdrawals may be delayed or unavailable until funds are replenished.</p>
                    <p class="warning-editorial">While we love VieFaucet, we don't know if the situation will get worse or better, and our job here is to keep you informed.</p>
                    <p class="warning-advice">We recommend <strong>not investing significant time</strong> on the platform until payouts resume normally. If you have a pending withdrawal, keep an eye on it.</p>
                    <a href="reviews/viefaucet.html" class="warning-popup-cta">Read Our VieFaucet Review</a>
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

document.addEventListener('DOMContentLoaded', initPromoPopup);
