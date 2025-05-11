<template>
    <div
        class="bg-white rounded-lg flex flex-col p-3 origin-top-left"
        :class="{ 'md:col-span-2': isSmall, 'md:col-span-3': !isSmall, 'js-animation-hidden': !isAnimationReady }"
    >
        <NuxtImg
            v-if="image"
            :src="image"
            :alt="title"
            :sizes="isSmall ? '100vw, md:33vw, lg:33vw' : '100vw, md:50vw, lg:50vw'"
            class="min-h-40 object-cover rounded-lg"
        />

        <div class="flex flex-col items-start mt-auto gap-3 pt-4 px-4 pb-2 lg:pt-7 lg:px-9 lg:pb-9">
            <p class="text-3xl lg:text-4xl font-medium text-dark">{{ title }}</p>
            <p v-if="description">{{ description }}</p>

            <!-- <WrButton :to="href" theme="secondary" size="lg" class="mt-3">
                {{ $t('learn_more') }}
            </WrButton> -->
        </div>
    </div>
</template>

<script>
import { createTimeline, stagger, utils, onScroll } from 'animejs'
import animateMixin from '~/mixins/animate'

export default defineNuxtComponent({
    name: 'WrProductsCard',

    mixins: [animateMixin],

    props: {
        title: {
            type: String,
            default: ''
        },

        description: {
            type: String,
            default: ''
        },

        image: {
            type: String,
            default: ''
        },

        href: {
            type: String,
            default: ''
        },

        isSmall: Boolean,

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
                delay: ((this.index + 1) % (this.isSmall ? 3 : 2)) * 100,
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
