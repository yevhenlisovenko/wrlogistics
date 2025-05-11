<template>
    <div
        class="bg-white p-6 md:p-8 lg:p-10 rounded-2xl flex flex-col gap-8 md:gap-16 lg:gap-24 items-start origin-top-left"
        :class="{ 'js-animation-hidden': !isAnimationReady }"
    >
        <WrIcon :name="icon" />
        <div class="mt-auto">
            <p class="text-dark font-medium text-balance text-xl md:text-2xl lg:text-3xl">{{ text }}</p>
            <p class="md:text-lg mt-3">{{ description }}</p>
        </div>
    </div>
</template>

<script>
import { createTimeline, stagger, utils, onScroll } from 'animejs'
import animateMixin from '~/mixins/animate'

export default defineNuxtComponent({
    name: 'WrCardsGridItem',

    mixins: [animateMixin],

    props: {
        icon: {
            type: String,
            required: true
        },

        text: {
            type: String,
            default: ''
        },

        description: {
            type: String,
            default: ''
        },

        index: {
            type: Number,
            default: 0
        }
    },

    methods: {
        initAnimation() {
            const timeline = createTimeline({
                ease: 'outQuad',
                duration: 800,
                delay: ((this.index + 1) % 3) * 100,
                autoplay: onScroll({
                    enter: 'bottom-=150px'
                }),
                onBegin: () => {
                    this.isAnimationReady = true
                },
                onComplete: (self) => self.cancel()
            })

            this.animation = timeline

            utils.set(this.$el, {
                scaleX: 0,
                scaleY: 0.5
            })

            utils.set(this.$el.children, {
                opacity: 0,
                y: 20
            })

            timeline
                .add(this.$el, {
                    scaleX: 1,
                    scaleY: { to: 1, delay: 400 },
                    duration: 400
                })
                .add(this.$el.children, {
                    opacity: 1,
                    y: 0,
                    duration: 600,
                    delay: stagger(100, { start: 200 })
                })
        }
    }
})
</script>
