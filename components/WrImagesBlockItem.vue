<template>
    <NuxtImg
        :src="image.src"
        :alt="image.alt"
        :width="getWidth(index)"
        :height="getHeight(index)"
        :sizes="getSizes(index)"
        class="rounded"
        :class="{ 'js-animation-hidden': !isAnimationReady }"
    />
</template>

<script>
import animateMixin from '~/mixins/animate'
import { animate, stagger, onScroll, utils } from 'animejs'

export default {
    name: 'WrImagesBlockItem',

    mixins: [animateMixin],

    props: {
        image: {
            type: Object,
            required: true
        },

        index: {
            type: Number,
            default: 0
        },

        total: {
            type: Number,
            default: 1
        }
    },

    methods: {
        initAnimation() {
            const image = this.$el

            if (!image) {
                this.isAnimationReady = true
                return
            }

            utils.set(image, { opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% var(--clip, 100%), 0 var(--clip, 100%))', '--clip': '0%' })

            this.aniation = animate(image, {
                opacity: 1,
                delay: stagger(200, { from: this.index }),
                duration: 600,
                '--clip': '100%',
                autoplay: onScroll({
                    enter: 'bottom-=150px'
                    // debug: true
                }),
                onBegin: () => {
                    this.isAnimationReady = true
                }
            })
        },

        getWidth(index) {
            if (index === 0) return 192
            if (index === this.total - 1) return 288
            return null
        },

        getHeight(index) {
            if (index === 0) return 192
            if (index === this.total - 1) return 288
            return null
        },

        getSizes(index) {
            if (index === 0) return '84px, md:192px'
            if (index === this.total - 1) return '288px'
            return `${Math.floor(100 / (this.total - 2))}vw, lg:${Math.floor(110 / (this.total - 1))}vw`
        }
    }
}
</script>
