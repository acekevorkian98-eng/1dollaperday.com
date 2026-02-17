/**
 * CookieConsent v3 Configuration — $1perday!
 * https://cookieconsent.orestbida.com/
 *
 * Categories:
 *   - necessary:  always enabled (consent preferences)
 *   - analytics:  GTM + GA4
 *   - marketing:  Google AdSense
 *
 * All optional categories are ENABLED by default (opt-out model).
 * A small, non-intrusive bottom bar lets users opt out if they choose.
 */

CookieConsent.run({
    guiOptions: {
        consentModal: {
            layout: 'bar inline',
            position: 'bottom',
            equalWeightButtons: false
        },
        preferencesModal: {
            layout: 'box'
        }
    },

    categories: {
        necessary: {
            enabled: true,
            readOnly: true
        },
        analytics: {
            enabled: true,
            autoClear: {
                cookies: [
                    { name: /^_ga/ },
                    { name: '_gid' }
                ]
            }
        },
        marketing: {
            enabled: true,
            autoClear: {
                cookies: [
                    { name: /^_gcl/ },
                    { name: /^__gads/ }
                ]
            }
        }
    },

    language: {
        default: 'en',
        translations: {
            en: {
                consentModal: {
                    title: 'Cookie Notice',
                    description: 'We use cookies for analytics and advertising. All categories are enabled by default — you can opt out below.',
                    acceptAllBtn: 'Accept All',
                    acceptNecessaryBtn: 'Necessary Only',
                    showPreferencesBtn: 'Manage Preferences'
                },
                preferencesModal: {
                    title: 'Cookie Preferences',
                    acceptAllBtn: 'Accept All',
                    acceptNecessaryBtn: 'Necessary Only',
                    savePreferencesBtn: 'Save Preferences',
                    sections: [
                        {
                            title: 'Cookie Usage',
                            description: 'We use cookies to ensure basic site functionality and to improve your experience. You can choose which categories to allow.'
                        },
                        {
                            title: 'Necessary Cookies',
                            description: 'These cookies are essential for the site to function and cannot be disabled.',
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Analytics Cookies',
                            description: 'We use Google Analytics and Google Tag Manager to understand how visitors interact with our site. This helps us improve content and user experience.',
                            linkedCategory: 'analytics'
                        },
                        {
                            title: 'Marketing Cookies',
                            description: 'These cookies are used by Google AdSense to display relevant advertisements. Ad revenue helps keep this site free.',
                            linkedCategory: 'marketing'
                        },
                        {
                            title: 'More Information',
                            description: 'For questions about our cookie policy, please <a href="/pages/contact">contact us</a>. You can also read our <a href="/pages/privacy">Privacy Policy</a>.'
                        }
                    ]
                }
            }
        }
    }
});
