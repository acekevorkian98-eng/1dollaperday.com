/**
 * MONETIZATION BLOG - Main JavaScript
 * Minimal JS for header/footer includes and basic functionality
 *
 * NOTE: For local file:// usage, includes won't work due to CORS.
 * When hosted on a server, the includes will function properly.
 * For local testing, the full HTML is already in each page.
 */

// ============================================
// HEADER/FOOTER INCLUDES (Server Only)
// ============================================
// Uncomment and use these functions when hosted on a server
// They fetch external header.html and footer.html files

/*
async function loadIncludes() {
    // Determine if we're in a subdirectory
    const isSubpage = window.location.pathname.includes('/pages/');
    const basePath = isSubpage ? '../' : './';

    // Load header
    const headerEl = document.getElementById('site-header');
    if (headerEl) {
        try {
            const response = await fetch(basePath + 'header.html');
            if (response.ok) {
                headerEl.innerHTML = await response.text();
                highlightCurrentPage();
            }
        } catch (e) {
            console.log('Header include failed - using inline header');
        }
    }

    // Load footer
    const footerEl = document.getElementById('site-footer');
    if (footerEl) {
        try {
            const response = await fetch(basePath + 'footer.html');
            if (response.ok) {
                footerEl.innerHTML = await response.text();
            }
        } catch (e) {
            console.log('Footer include failed - using inline footer');
        }
    }
}

// Call on DOM ready
document.addEventListener('DOMContentLoaded', loadIncludes);
*/

// ============================================
// NAVIGATION HIGHLIGHTING
// ============================================
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Check if current path ends with this href or matches
        if (currentPath.endsWith(href) ||
            (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/site/')))) {
            link.classList.add('active');
        }
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', highlightCurrentPage);

// ============================================
// AD SLOT INITIALIZATION PLACEHOLDER
// ============================================
// This function is a placeholder for initializing ad networks
// Replace the console.log with actual ad provider code

function initializeAds() {
    /*
    * AD PROVIDER INITIALIZATION
    * --------------------------
    * Paste your ad network initialization code here.
    *
    * Example for Google AdSense:
    * (adsbygoogle = window.adsbygoogle || []).push({});
    *
    * Example for Ezoic:
    * ezstandalone.cmd.push(function() {
    *     ezstandalone.showAds();
    * });
    */

    console.log('Ad slots ready for initialization');
}

// ============================================
// OFFERWALL INITIALIZATION PLACEHOLDER
// ============================================
function initializeOfferwall() {
    /*
    * OFFERWALL PROVIDER CODE
    * -----------------------
    * Paste your offerwall initialization here.
    *
    * Example providers:
    * - CPX Research
    * - Ayet Studios
    * - AdGate Media
    * - Lootably
    *
    * Each provider will give you specific embed code.
    */

    console.log('Offerwall placeholder ready');
}

// ============================================
// FAUCET PLACEHOLDER
// ============================================
function initializeFaucet() {
    /*
    * FAUCET IMPLEMENTATION
    * ---------------------
    * If running your own faucet, initialize it here.
    * This could be:
    * - An iframe to FaucetPay
    * - ExpressCrypto widget
    * - Custom faucet script
    */

    console.log('Faucet placeholder ready');
}

// ============================================
// AUTOSURF SCRIPT PLACEHOLDER
// ============================================
function initializeAutosurf() {
    /*
    * AUTOSURF / TRAFFIC EXCHANGE
    * ---------------------------
    * WARNING: Be careful with autosurf scripts.
    * Many ad networks ban sites that use autosurfs.
    *
    * If using traffic exchanges, place their
    * verification/earning scripts here.
    *
    * Common traffic exchanges:
    * - Hitleap
    * - 10KHits
    * - TrafficG
    */

    console.log('Autosurf placeholder ready');
}

// ============================================
// REFERRAL LINK TRACKING (Optional)
// ============================================
function trackReferralClick(linkName) {
    /*
    * REFERRAL TRACKING
    * -----------------
    * Add analytics tracking for referral clicks.
    *
    * Example with Google Analytics:
    * gtag('event', 'referral_click', {
    *     'link_name': linkName
    * });
    */

    console.log('Referral clicked:', linkName);
}

// Add click tracking to referral links
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
// UTILITY FUNCTIONS
// ============================================

// Simple cookie consent placeholder
function showCookieConsent() {
    /*
    * COOKIE CONSENT
    * --------------
    * If targeting EU users, implement cookie consent here.
    * Consider using a library like:
    * - Osano
    * - CookieYes
    * - Cookiebot
    */
}

// Smooth scroll for anchor links
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
// FAQ ACCORDION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('active');

                // Close all other FAQs (optional - remove for multi-open)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current FAQ
                item.classList.toggle('active');
            });
        }
    });
});

// ============================================
// EARNINGS CALCULATOR
// ============================================
function calculateEarnings() {
    const faucetTime = parseFloat(document.getElementById('faucet-time')?.value) || 0;
    const ptcTime = parseFloat(document.getElementById('ptc-time')?.value) || 0;
    const offerwallTime = parseFloat(document.getElementById('offerwall-time')?.value) || 0;
    const socialTime = parseFloat(document.getElementById('social-time')?.value) || 0;

    // Realistic hourly rates (in dollars)
    const rates = {
        faucet: 0.30,      // $0.30/hour
        ptc: 0.20,         // $0.20/hour
        offerwall: 1.50,   // $1.50/hour (best ROI)
        social: 0.50       // $0.50/hour
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

    // Update display
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

// Attach calculator listeners
document.addEventListener('DOMContentLoaded', function() {
    const calcInputs = document.querySelectorAll('.calc-input');
    calcInputs.forEach(input => {
        input.addEventListener('input', calculateEarnings);
        input.addEventListener('change', calculateEarnings);
    });

    // Initial calculation
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
        // Add ID if not present
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
        // Use document's last modified date as fallback
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
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button');
    const message = form.querySelector('.newsletter-message');

    // Simulate submission (replace with actual endpoint)
    button.disabled = true;
    button.textContent = 'Subscribing...';

    // Placeholder - replace with actual newsletter service
    setTimeout(() => {
        if (message) {
            message.textContent = 'Thanks for subscribing! Check your email to confirm.';
            message.className = 'newsletter-message success';
        }
        form.reset();
        button.disabled = false;
        button.textContent = 'Subscribe';
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
});
