<template>
    <nav class="hidden bg-white fixed inset-0 w-full h-full z-[19] pt-16 pb-2 origin-top">
        <div class="flex flex-col gap-3 p-4">
            <WrButton to="/contacts" theme="primary" size="md">
                {{ $t('contact_us') }}
            </WrButton>

            <!-- <div class="flex justify-center">
                <WrLangSwitcher />
            </div> -->
        </div>
    </nav>
</template>

<script>
import { useLenis } from 'lenis/vue'
import { animate, utils } from 'animejs'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'

export default defineNuxtComponent({
    name: 'WrMobileMenu',

    props: {
        menu: {
            type: Array,
            default: () => []
        },

        modelValue: Boolean
    },

    emits: ['update:modelValue'],

    setup(props, { emit }) {
        const router = useRouter()
        const lenis = useLenis()

        router.beforeEach((to, from) => {
            if (to.path !== from.path) {
                emit('update:modelValue', false)
            }
        })

        return {
            lenis,
            animation: null
        }
    },

    watch: {
        modelValue(isOpened) {
            if (isOpened) {
                this.lenis?.stop()
                window.scrollTo(0, 0, { behavior: 'instant' })
                disableBodyScroll(this.$el)
                document.body.classList.add('js-scroll-disabled')
                this.getAnimation().play()
            } else {
                this.lenis?.start()
                enableBodyScroll(this.$el)
                document.body.classList.remove('js-scroll-disabled')
                this.getAnimation().reverse()
            }
        }
    },

    methods: {
        getAnimation() {
            if (!this.animation) {
                this.animation = animate(this.$el, {
                    opacity: [0, 1],
                    scaleY: [0.8, 1],
                    ease: 'inOutQuad',
                    duration: 300,
                    autoplay: false,
                    onBegin: () => {
                        if (this.modelValue) {
                            utils.set(this.$el, {
                                display: 'block',
                                opacity: 0,
                                scaleY: 0.8
                            })
                        }
                    },
                    onComplete: (self) => {
                        if (!this.modelValue) {
                            utils.set(this.$el, {
                                display: 'none'
                            })
                        }
                    }
                })
            }

            return this.animation
        }
    }
})
</script>
