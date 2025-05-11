<template>
    <header class="bg-white relative z-20">
        <div
            ref="container"
            class="container h-16 lg:h-24 flex items-center justify-between gap-4"
            :class="{ 'js-animation-hidden': !isAnimationReady }"
        >
            <NuxtLink :to="localePath('/')">
                <NuxtIcon name="wr:logo" mode="svg" class="fill-dark w-auto h-7 lg:h-8" />
            </NuxtLink>

            <div class="flex items-center md:hidden">
                <WrButton theme="outline" size="lg" :aria-label="$t('toggle_menu')" @click="isOpenedMobileMenu = !isOpenedMobileMenu">
                    <WrMobileMenuToggler class="-mx-3" :is-opened-mobile-menu="isOpenedMobileMenu" />
                </WrButton>
            </div>

            <div class="hidden md:flex md:items-center md:gap-5">
                <ClientOnly>
                    <div v-if="isDesktop" class="flex items-center gap-6 lg:gap-10 mr-8 lg:mr-16">
                        <button
                            v-for="({ name }, index) in menu"
                            :key="index"
                            class="flex items-center gap-1 hover:text-dark transition"
                            :class="{ 'text-dark': openedMenuItem === index }"
                            @click="toggleMenuItem(index)"
                        >
                            {{ $t(name) }}
                            <NuxtIcon
                                name="wr:caret"
                                mode="svg"
                                class="fill-current h-3 w-3 transition"
                                :class="{ '-rotate-180': openedMenuItem === index }"
                            />
                        </button>
                    </div>
                </ClientOnly>

                <!-- <WrLangSwitcher /> -->

                <WrButton to="/contacts" theme="primary" size="md">{{ $t('contact_us') }}</WrButton>
            </div>
        </div>
    </header>

    <WrMobileMenu v-model="isOpenedMobileMenu" :menu="menu" />

    <WrMegaMenu v-model="openedMenuItem" :menu="menu" />
</template>

<script>
import { MAIN_MENU } from '~/assets/js/menu'
import WrMobileMenu from './WrMobileMenu.vue'

export default defineNuxtComponent({
    name: 'WrHeader',

    data() {
        return {
            isAnimationReady: true,
            isOpenedMobileMenu: false,
            openedMenuItem: null,
            isDesktop: false
        }
    },

    async setup() {
        return {
            localePath: useLocalePath(),
            menu: MAIN_MENU,
            mq: null
        }
    },

    mounted() {
        this.mq = window.matchMedia('(min-width: 768px)')

        this.isDesktop = this.mq.matches

        this.mq.addEventListener('change', this.handleMQChange)
    },

    beforeUnmount() {
        this.mq?.removeEventListener('change', this.handleMQChange)
    },

    methods: {
        handleMQChange(e) {
            if (e.matches) {
                this.isOpenedMobileMenu = false
            } else {
                this.openedMenuItem = null
            }

            this.isDesktop = e.matches
        },

        toggleMenuItem(index) {
            this.openedMenuItem = this.openedMenuItem === index ? null : index
        }
    }
})
</script>
