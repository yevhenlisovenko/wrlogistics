<template>
    <section class="wr-images-block section">
        <div class="container relative">
            <WrPattern class="hidden lg:block absolute top-[-6rem] right-[6rem]" />

            <WrHeading :tag="titleTag">
                <slot name="title" mdc-unwrap="p"></slot>
            </WrHeading>
        </div>

        <div
            ref="content"
            class="container content container--sm mt-8 md:mt-12 lg:mt-16 lg:text-2xl"
            :class="{ 'js-animation-hidden': !isAnimationReady }"
        >
            <slot name="content"></slot>
        </div>

        <div class="container relative">
            <div v-if="images?.length" ref="images" class="wr-images-block__images mt-10 lg:mt-16">
                <WrImagesBlockItem v-for="(image, index) in images" :key="index" :index="index" :image="image" :total="images.length" />
            </div>

            <WrPattern class="hidden lg:block absolute top-[12rem] left-[7rem]" :rotate="30" :lines="''" />
        </div>
    </section>
</template>

<script>
import animateMixin from '~/mixins/animate'
import { createTimeline, stagger, onScroll, utils } from 'animejs'

export default defineNuxtComponent({
    name: 'WrImagesBlock',

    mixins: [animateMixin],

    props: {
        titleTag: {
            type: String,
            default: 'h2'
        },

        images: {
            type: Array,
            default: () => []
        }
    },

    methods: {
        initAnimation() {
            const timeline = createTimeline({
                ease: 'outQuad',
                autoplay: onScroll({
                    enter: 'bottom-=150px'
                    // debug: true
                }),
                onBegin: () => {
                    this.isAnimationReady = true
                },
                onComplete: (self) => self.cancel()
            })

            const content = this.$refs?.content.children

            if (content) {
                utils.set(content, { y: 20, opacity: 0 })

                timeline.add(content, {
                    opacity: 1,
                    y: 0,
                    delay: stagger(200),
                    duration: 600
                })
            }

            this.animation = timeline
        }
    }
})
</script>

<style lang="postcss">
.wr-images-block {
    &__images {
        display: grid;
        grid-template-columns: 5.25rem 1fr;
        gap: 0.5rem;

        @screen md {
            grid-template-columns: 12rem 1fr;
        }

        @screen lg {
            grid-template-columns: 12rem 1fr 18rem;
            gap: 2px;
        }

        :first-child {
            aspect-ratio: 1;
            width: 5.25rem;
            height: 5.25rem;
            object-fit: cover;
            object-position: center;

            @screen md {
                width: 12rem;
                height: 12rem;
            }
        }

        :nth-child(n + 3) {
            display: none;

            @screen lg {
                display: block;
                aspect-ratio: 1;
                width: 18rem;
                height: 18rem;
                object-fit: cover;
                object-position: center;
            }
        }
    }
}
</style>
