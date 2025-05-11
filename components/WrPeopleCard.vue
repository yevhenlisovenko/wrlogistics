<template>
    <div class="bg-white p-6 rounded-2xl flex items-center gap-4 h-full origin-top-left" :class="{ 'js-animation-hidden': !isAnimationReady }">
        <NuxtImg :src="image" :alt="name" width="110" height="110" />
        <div class="flex flex-col gap-3" :class="{ 'max-w-[10rem]': name.length < 16 }">
            <div class="text-dark text-2xl lg:text-3xl font-medium">{{ name }}</div>
            <div class="text-sm">{{ position }}</div>
        </div>
    </div>
</template>

<script>
import { createTimeline, utils, stagger, onScroll } from 'animejs'
import animateMixin from '~/mixins/animate'

export default defineNuxtComponent({
    name: 'WrPeopleCard',

    mixins: [animateMixin],

    props: {
        name: {
            type: String,
            required: true
        },

        position: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        index: {
            type: Number,
            default: 0
        }
    },

    methods: {
        initAnimation() {
            utils.set(this.$el, {
                opacity: 0,
                scaleX: 0,
                scaleY: 0.5
            })

            utils.set(this.$el.children, {
                opacity: 0
            })

            this.animation = createTimeline({
                delay: (this.index % 3) * 100,
                autoplay: onScroll({
                    enter: 'bottom-=150'
                }),
                onBegin: () => {
                    this.isAnimationReady = true
                }
            })
                .add(this.$el, {
                    opacity: 1,
                    scaleX: 1,
                    duration: 500,
                    ease: 'outQuart'
                })
                .add(this.$el, { scaleY: 1, duration: 400, ease: 'outQuart' }, '-=100')
                .add(this.$el.children, {
                    opacity: 1,
                    duration: 800,
                    ease: 'outQuart',
                    delay: stagger(200)
                })
        }
    }
})
</script>
