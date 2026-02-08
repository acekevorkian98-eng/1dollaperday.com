/**
 * $1perday! Manual Ads System
 * ===========================
 * Central configuration for rotating affiliate banners across the site.
 *
 * Usage:
 * 1. Add your banner images to /assets/ads/
 * 2. Configure the ads array below with your affiliate info
 * 3. Call initManualAds() after DOM is ready
 */

const ADS_CONFIG = {
    // Leaderboard banners (728x90)
    leaderboard: [
        {
            name: "LuckyWatch",
            image: "../assets/ads/luckywatch-728.jpg",
            url: "https://luckywatch.io/?ref=1perday",
            alt: "LuckyWatch - Earn crypto watching ads"
        }
        // Add more 728x90 banners here:
        // { name: "Partner", image: "../assets/ads/partner-728.jpg", url: "https://...", alt: "..." }
    ],

    // Rectangle banners (300x250)
    rectangle: [
        {
            name: "LuckyWatch",
            image: "../assets/ads/luckywatch-300.jpg",
            url: "https://luckywatch.io/?ref=1perday",
            alt: "LuckyWatch - Earn crypto watching ads"
        }
        // Add more 300x250 banners here
    ],

    // Mobile banners (320x100 or responsive)
    mobile: [
        {
            name: "LuckyWatch",
            image: "../assets/ads/luckywatch-320.jpg",
            url: "https://luckywatch.io/?ref=1perday",
            alt: "LuckyWatch - Earn crypto watching ads"
        }
        // Add more mobile banners here
    ],

    // Banner banners (468x60)
    banner: [
        {
            name: "LuckyWatch",
            image: "../assets/ads/luckywatch-468.jpg",
            url: "https://luckywatch.io/?ref=1perday",
            alt: "LuckyWatch - Earn crypto watching ads"
        }
        // Add more 468x60 banners here
    ],

    // Settings
    rotation: "random",      // "random" or "sequential"
    trackClicks: true,       // Track clicks via GTM dataLayer
    fallbackText: "Ad space available",
    lazyLoad: true           // Use loading="lazy" for images
};

/**
 * Get a random ad from a category
 */
function getRandomAd(category) {
    const ads = ADS_CONFIG[category];
    if (!ads || ads.length === 0) return null;

    if (ADS_CONFIG.rotation === "sequential") {
        // Use session storage for sequential rotation
        const key = `ads_index_${category}`;
        let index = parseInt(sessionStorage.getItem(key) || '0');
        const ad = ads[index % ads.length];
        sessionStorage.setItem(key, (index + 1).toString());
        return ad;
    }

    return ads[Math.floor(Math.random() * ads.length)];
}

/**
 * Create an ad element
 */
function createAdElement(ad, size) {
    if (!ad) return null;

    const wrapper = document.createElement('a');
    wrapper.href = ad.url;
    wrapper.target = '_blank';
    wrapper.rel = 'noopener sponsored';
    wrapper.className = 'manual-ad';
    wrapper.setAttribute('data-ad-name', ad.name);
    wrapper.setAttribute('data-ad-size', size);

    const img = document.createElement('img');
    img.src = ad.image;
    img.alt = ad.alt;
    img.className = 'manual-ad-img';
    if (ADS_CONFIG.lazyLoad) {
        img.loading = 'lazy';
    }

    // Error handling - hide ad if image fails to load
    img.onerror = function() {
        wrapper.style.display = 'none';
    };

    wrapper.appendChild(img);

    // Click tracking
    if (ADS_CONFIG.trackClicks && typeof dataLayer !== 'undefined') {
        wrapper.addEventListener('click', function() {
            dataLayer.push({
                event: 'ad_click',
                ad_name: ad.name,
                ad_size: size,
                ad_url: ad.url
            });
        });
    }

    return wrapper;
}

/**
 * Initialize manual ads on the page
 * Replaces elements with class "ad-placeholder" based on their data attributes
 */
function initManualAds() {
    // Get all ad placeholders
    const placeholders = document.querySelectorAll('.ad-placeholder');

    placeholders.forEach(placeholder => {
        let category = null;
        let size = null;

        // Determine ad type from placeholder classes
        if (placeholder.classList.contains('header') || placeholder.classList.contains('leaderboard')) {
            category = 'leaderboard';
            size = '728x90';
        } else if (placeholder.classList.contains('sidebar') || placeholder.classList.contains('rectangle')) {
            category = 'rectangle';
            size = '300x250';
        } else if (placeholder.classList.contains('footer') || placeholder.classList.contains('banner')) {
            category = 'banner';
            size = '468x60';
        } else if (placeholder.classList.contains('mobile')) {
            category = 'mobile';
            size = '320x100';
        }

        if (category) {
            const ad = getRandomAd(category);
            if (ad) {
                const adElement = createAdElement(ad, size);
                if (adElement) {
                    // Clear placeholder content and insert ad
                    placeholder.innerHTML = '';
                    placeholder.appendChild(adElement);
                    placeholder.classList.add('ad-loaded');
                }
            }
        }
    });
}

/**
 * Initialize responsive header banner
 * Shows leaderboard on desktop, mobile banner on small screens
 */
function initResponsiveHeaderAd() {
    const headerBanner = document.querySelector('.header-banner');
    if (!headerBanner) return;

    const updateHeaderAd = () => {
        const isMobile = window.innerWidth < 768;
        const category = isMobile ? 'mobile' : 'leaderboard';
        const size = isMobile ? '320x100' : '728x90';

        const ad = getRandomAd(category);
        if (ad) {
            const adElement = createAdElement(ad, size);
            if (adElement) {
                headerBanner.innerHTML = '';
                headerBanner.appendChild(adElement);
            }
        } else {
            // Hide if no ads available
            headerBanner.style.display = 'none';
        }
    };

    // Initial load
    updateHeaderAd();

    // Update on resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateHeaderAd, 250);
    });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initManualAds();
        initResponsiveHeaderAd();
    });
} else {
    initManualAds();
    initResponsiveHeaderAd();
}

// Export for manual use
window.ADS_CONFIG = ADS_CONFIG;
window.initManualAds = initManualAds;
window.initResponsiveHeaderAd = initResponsiveHeaderAd;
