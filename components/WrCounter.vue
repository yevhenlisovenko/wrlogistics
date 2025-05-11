<template>
    <div class="flex flex-col gap-4 lg:gap-6 text-center px-4 origin-top" :class="{ 'js-animation-hidden': !isAnimationReady }">
        <span
            ref="count"
            class="text-dark text-4xl md:text-6xl lg:text-7xl font-medium"
            :class="{ 'pt-12 md:pt-20 lg:pt-28': home, 'pt-4 md:pt-12 lg:pt-24': !home }"
            >{{ animated.count }}</span
        >
        <span ref="text" class="text-balance md:text-xl" :class="{ 'pb-4 md:pb-8 lg:pb-16': home, 'pb-4 md:pb-12 lg:pb-24': !home }">{{ text }}</span>
    </div>
</template>

<script>
import { createTimeline, onScroll, utils } from 'animejs'
import animateMixin from '~/mixins/animate'

export default defineNuxtComponent({
    name: 'WrCounter',

    mixins: [animateMixin],

    props: {
        count: {
            type: [String, Number],
            default: 0
        },

        text: {
            type: String,
            default: ''
        },

        home: Boolean
    },

    setup() {
        const animated = reactive({ count: '0' })

        return {
            animated
        }
    },

    methods: {
        initAnimation() {
            const wrapper = this.$el
            const text = this.$refs.text
            const number = this.$refs.count

            if (!number || !text) {
                this.isAnimationReady = true
                return
            }

            utils.set(wrapper, {
                scaleY: 0,
                opacity: 0
            })

            utils.set(number, {
                opacity: 0,
                y: 20
            })

            utils.set(text, {
                opacity: 0,
                y: 30
            })

            const timeline = createTimeline({
                autoplay: onScroll({
                    enter: 'center top'
                    // debug: true
                }),
                duration: 500,
                easing: 'easeOutQuad',
                onBegin: () => {
                    this.isAnimationReady = true
                }
            })

            this.animation = timeline

            timeline.add(wrapper, {
                scaleY: 1,
                opacity: 1,
                duration: 200
            })

            timeline.add(number, {
                opacity: [0, 1],
                y: 0
            })

            timeline.add(this.animated, { count: this.count, modifier: utils.round(0), duration: 1000 }, '-=1000')

            timeline.add(
                text,
                {
                    opacity: [0, 1],
                    y: 0
                },
                '-=300'
            )
        }
    }
})
</script>
