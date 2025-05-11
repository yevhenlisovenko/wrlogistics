<template>
    <aside
        role="dialog"
        class="hidden items-center fixed inset-0 z-[100] bg-dark/95 overscroll-contain"
        @click.self="$emit('update:modelValue', false)"
    >
        <button :aria-label="$t('close')" class="absolute top-2 right-4" @click="$emit('update:modelValue', false)">
            <NuxtIcon name="wr:close" mode="svg" size="1.5rem" class="fill-white" />
        </button>
        <slot v-if="modelValue"></slot>
    </aside>
</template>

<script>
import { animate, utils } from 'animejs'
import { useLenis } from 'lenis/vue'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'

export default {
    name: 'WrModal',

    props: {
        modelValue: Boolean
    },

    emits: ['update:modelValue'],

    setup() {
        const lenis = useLenis()

        return {
            lenis,
            animation: null
        }
    },

    watch: {
        modelValue(isVisible) {
            if (isVisible) {
                this.open()
            } else {
                this.close()
            }
        }
    },

    beforeUnmount() {
        this.lenis?.start()

        enableBodyScroll(this.$el)

        this.$emit('update:modelValue', false)

        if (this.animation) {
            this.animation.cancel()
            this.animation = null
        }
    },

    methods: {
        open() {
            this.lenis.stop()

            disableBodyScroll(this.$el)
            document.body.classList.add('js-scroll-disabled')

            this.getAnimation().play()
        },

        close() {
            this.lenis.start()

            enableBodyScroll(this.$el)
            document.body.classList.remove('js-scroll-disabled')

            this.getAnimation().reverse()
        },

        getAnimation() {
            if (!this.animation) {
                this.animation = animate(this.$el, {
                    opacity: [0, 1],
                    scale: [0.9, 1],
                    duration: 400,
                    ease: 'outSine',
                    autoplay: false,
                    onBegin: (self) => {
                        self.stretch(this.modelValue ? 400 : 200)

                        if (this.modelValue && this.$el.style.display !== 'flex') {
                            utils.set(this.$el, { display: 'flex', opacity: 0, scale: 0.8 })
                        }
                    },
                    onComplete: () => {
                        if (!this.modelValue) {
                            utils.set(this.$el, { display: 'none' })
                        }
                    }
                })
            }

            return this.animation
        }
    }
}
</script>
