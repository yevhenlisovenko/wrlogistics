export default defineNuxtConfig({
    ssr: true,

    compatibilityDate: '2025-04-25',

    nitro: {
        preset: 'netlify'
    },

    app: {
        head: {
            title: 'WR Logistics',
            // titleTemplate: '%s | WR Logistics',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
                { name: 'description', content: 'WR Logistics website' },
                { name: 'apple-mobile-web-app-title', content: 'WR Logistics' },
                {
                    hid: 'og:site_name',
                    name: 'og:site_name',
                    content: 'WR Logistics'
                },
                {
                    hid: 'og:image:width',
                    name: 'og:image:width',
                    content: '600'
                },
                {
                    hid: 'og:image:height',
                    name: 'og:image:height',
                    content: '336'
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: 'summary_large_image'
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: '/img/cover.jpg'
                },
                {
                    hid: 'og:image',
                    name: 'og:image',
                    content: '/img/cover.jpg'
                },
                {
                    hid: 'og:video',
                    name: 'og:video',
                    content: 'https://wr-logistics.de/assets/Uploads/WR-Logistics-Movie.mp4'
                },
                {
                    hid: 'og:video:secure_url',
                    name: 'og:video:secure_url',
                    content: 'https://wr-logistics.de/assets/Uploads/WR-Logistics-Movie.mp4'
                },
                {
                    hid: 'og:video:width',
                    name: 'og:video:width',
                    content: '1280'
                },
                {
                    hid: 'og:video:height',
                    name: 'og:video:height',
                    content: '720'
                }
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    sizes: 'any',
                    href: '/favicon.ico'
                },
                {
                    rel: 'icon',
                    type: 'image/svg+xml',
                    href: '/favicons/favicon.svg'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '96x96',
                    href: '/favicons/favicon-96x96.png'
                },

                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: '/favicons/apple-touch-icon.png'
                },
                {
                    rel: 'manifest',
                    href: '/favicons/site.webmanifest'
                }
            ],
            script: [
                {
                    innerHTML: 'document.documentElement.setAttribute("data-animatable", "true")'
                }
            ]
        }
    },

    css: ['~/assets/css/tailwind.css'],

    components: {
        dirs: [
            {
                path: '~/components'
            }
        ]
    },

    modules: ['@nuxt/content', '@nuxt/image', '@nuxt/icon', '@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/eslint', 'lenis/nuxt'],

    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config.js',
        exposeConfig: false,
        injectPosition: 0,
        viewer: true
    },

    i18n: {
        strategy: 'prefix_except_default',
        defaultLocale: 'en',
        locales: [
            {
                code: 'en',
                short_name: 'ENG',
                name: 'English',
                files: ['en.js']
            }
            // {
            //     code: 'de',
            //     short_name: 'DE',
            //     name: 'Deutsch',
            //     files: ['de.js']
            // }
        ],
        langDir: 'i18n/locales/',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected'
        }
    },

    icon: {
        componentName: 'NuxtIcon',
        customCollections: [
            {
                prefix: 'wr',
                dir: './assets/icons'
            }
        ]
    },

    $development: {
        devServer: {
            host: '0.0.0.0'
        }
    },

    $production: {
        app: {
            head: {
                script: [
                    {
                        id: 'Cookiebot',
                        src: 'https://consent.cookiebot.com/uc.js',
                        'data-cbid': '043e7813-9666-47d3-8c2d-0f51b2347b79',
                        'data-culture': 'en',
                        async: true
                    },
                    {
                        'data-cookieconsent': 'ignore',
                        innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments)
}
gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
    wait_for_update: 500
});
gtag("set", "ads_data_redaction", true);
gtag("set", "url_passthrough", true);`
                    },
                    {
                        'data-cookieconsent': 'statistics',
                        type: 'text/plain',
                        innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);`
                    }
                ]
            }
        }
    }
})
