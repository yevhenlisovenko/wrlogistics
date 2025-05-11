<template>
    <footer role="colophone" class="footer bg-white pt-20 lg:pt-24">
        <h2 class="sr-only">{{ $t('site_nav') }}</h2>

        <div class="container container--sm flex flex-col gap-8 lg:gap-12 items-center">
            <WrHeading class="text-center">
                {{ $t('footer_title') }}
                <template #subtitle>
                    {{ $t('footer_subtitle') }}
                </template>
            </WrHeading>

            <WrButton :to="$route.path === '/contacts' ? null : '/contacts'" @click="scrollToContacts">
                {{ $t('contacts') }}
            </WrButton>
        </div>

        <div class="text-white mt-6 lg:-mt-20">
            <div class="footer__masker mb-px relative pointer-events-none" aria-hidden="true">
                <NuxtImg
                    src="/img/footer_bg.png"
                    alt="Seaport view"
                    class="lg:hidden absolute inset-0 object-cover object-top w-full h-full"
                    sizes="100vw, md:100vw"
                    aria-hidden="true"
                />

                <NuxtImg
                    src="/img/footer_bg_lg.png"
                    alt="Seaport view"
                    class="hidden lg:block absolute inset-0 object-cover object-top w-full h-full"
                    sizes="lg:100vw, xl:100vw"
                    aria-hidden="true"
                />
            </div>

            <div class="footer__bottom relative">
                <NuxtImg
                    src="/img/footer_bg.png"
                    alt="Seaport view"
                    class="absolute inset-0 object-cover w-full h-full lg:hidden"
                    sizes="100vw, md:100vw"
                    aria-hidden="true"
                />

                <NuxtImg
                    src="/img/footer_bg_lg.png"
                    alt="Seaport view"
                    class="hidden lg:block absolute inset-0 object-cover w-full h-full"
                    sizes="lg:100vw, xl:100vw"
                    aria-hidden="true"
                />
                <div class="footer__container pt-10 lg:pt-24 relative">
                    <div class="container pb-8">
                        <div class="footer__menu">
                            <nav class="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-4 lg:gap-12">
                                <div v-for="menu in menus" :key="menu.title" :class="{ 'hidden lg:block': !menu.items }">
                                    <h3 v-if="menu.title" class="text-gray-400 mb-8">{{ menu.title }}</h3>

                                    <ul class="flex flex-col gap-2">
                                        <li v-for="item in menu.items" :key="item.label">
                                            <NuxtLink :to="item.href" class="hover:underline">{{ item.label }}</NuxtLink>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>

                        <hr class="border-white border-opacity-15 my-8" />

                        <div class="footer__contacts">
                            <NuxtIcon name="wr:mail" mode="svg" size="1.25rem" class="footer__contacts-icon" />
                            <a :href="`mailto:${contacts.email}`" class="lg:col-start-2">
                                {{ contacts.email }}
                            </a>

                            <NuxtIcon name="wr:phone" mode="svg" size="1.25rem" class="footer__contacts-icon" />
                            <a :href="`tel:${contacts.phone}`">
                                {{ contacts.phone }}
                            </a>

                            <NuxtIcon name="wr:linkedin" mode="svg" size="1.25rem" class="footer__contacts-icon" />
                            <a :href="contacts.linkedin" target="_blank"> LinkedIn </a>

                            <div class="footer__logo">
                                <NuxtLink to="/" class="flex items-center">
                                    <NuxtIcon name="wr:logo" mode="svg" class="fill-white w-auto h-8" />
                                </NuxtLink>
                                <span class="text-blue-300 text-xs">{{ $t('footer_copy', { year: new Date().getFullYear() }) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- TODO: add resize -->
        <!-- <WrPattern class="hidden lg:block absolute left-0 top-24" />

        <WrPattern class="hidden lg:block absolute right-24 top-24" /> -->
    </footer>
</template>

<script>
export default defineNuxtComponent({
    name: 'WrFooter',

    setup() {
        const { contacts } = useAppConfig()

        return {
            contacts
        }
    },

    computed: {
        menus() {
            return [
                {
                    items: [
                        // {
                        //     label: this.$t('about'),
                        //     href: '/about'
                        // },
                        {
                            label: this.$t('contacts'),
                            href: '/contacts'
                        }
                    ]
                },
                {},
                {},
                {
                    // title: this.$t('company'),
                    items: [
                        // {
                        //     label: this.$t('about'),
                        //     href: '/about'
                        // },
                        // {
                        //     label: this.$t('contacts'),
                        //     href: '/contacts'
                        // },
                        {
                            label: this.$t('imprint'),
                            href: '/imprint'
                        },
                        {
                            label: this.$t('privacy'),
                            href: '/privacy'
                        }
                    ]
                }
            ]
        }
    },

    methods: {
        scrollToContacts() {
            const contacts = document.querySelector('#contacts')

            if (contacts) {
                contacts.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }
})
</script>

<style lang="postcss">
.footer {
    position: relative;

    &__masker {
        aspect-ratio: 7 / 4;

        @screen lg {
            aspect-ratio: 15 / 4;
        }
    }

    &__masker img {
        @apply bg-blue-700;

        mask-image: url('/img/footer_bg_mask.svg');
        mask-size: auto 100%;
        mask-position: top center;
        mask-repeat: no-repeat;

        @screen lg {
            mask-image: url('/img/footer_bg_mask_lg.svg');
            mask-size: 100% auto;
            mask-position: center center;
        }
    }

    &__bottom {
        @apply bg-blue-700;
    }

    &__bottom img {
        object-position: 50% calc(4 / 7 * -100vw);

        @screen lg {
            object-position: 50% calc(4 / 15 * -100vw);
        }
    }

    &__container {
        background-image: linear-gradient(to bottom, theme('colors.blue.700 / 0%'), theme('colors.blue.700 / 60%'), theme('colors.blue.700'));
    }

    &__contacts {
        display: grid;
        grid-template-columns: min-content minmax(1rem, 1fr);
        gap: 1.5rem 0.75rem;

        @screen md {
            grid-template-columns: min-content minmax(1rem, 1fr) min-content minmax(1rem, 1fr) min-content minmax(1rem, 1fr);
        }

        @screen lg {
            grid-template-columns: repeat(4, minmax(1rem, 1fr));
            grid-gap: 1.75rem 3rem;
        }
    }

    &__contacts-icon {
        @apply fill-blue-300;

        @screen lg {
            grid-row: 1;
        }
    }

    &__logo {
        grid-column: 1 / -1;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;

        @screen lg {
            grid-column: 1;
            grid-row: 1 / span 2;
        }
    }
}
</style>
