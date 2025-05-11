<template>
    <div class="overflow-hidden">
        <div class="wr-home-intro">
            <div class="container wr-home-intro__grid" :class="{ 'js-animation-hidden': !isAnimationReady }">
                <h1 ref="title" class="wr-home-intro__title">
                    <slot mdc-unwrap="p"></slot>
                </h1>

                <WrButton ref="button" size="lg" to="/contacts" class="mt-8 md:col-start-1 md:row-start-2">
                    {{ $t('get_in_touch') }}
                    <NuxtIcon name="wr:arrow-tr" size="1.25rem" mode="svg" class="fill-white" />
                </WrButton>

                <div class="flex items-center gap-6 md:flex-col md:items-start md:gap-0 md:row-start-1 md:row-span-2">
                    <div ref="videoTitle" class="text-dark text-xl lg:text-3xl py-6 md:pt-0 font-medium">
                        <slot name="video-title" mdc-unwrap="p"></slot>
                    </div>

                    <WrHomeIntroPlay ref="playButton" class="flex-shrink-0" @click="isVideoModalOpened = true" />
                </div>
            </div>
        </div>

        <div class="wr-home-intro-image" :class="{ 'js-animation-hidden': !isAnimationReady }">
            <div ref="image" class="container overflow-hidden relative z-10">
                <NuxtImg
                    src="/img/home-intro.png"
                    alt="Home intro"
                    sizes="120vw sm:100vw md:100vw lg:100vw"
                    width="1365"
                    height="664"
                    class="h-auto object-contain sm:object-cover object-center"
                />
            </div>
        </div>

        <div class="hidden lg:block">
            <div class="container">
                <WrPattern class="relative ml-auto -mt-[3rem] -mb-[3rem] mr-[6rem] 2xl:mr-0" />
            </div>
        </div>

        <div v-if="counters?.length">
            <div class="container relative">
                <div class="grid grid-cols-3">
                    <WrCounter
                        v-for="(counter, index) in counters"
                        v-bind="counter"
                        :class="{ 'border-l border-gray-400': index > 0 }"
                        class="pt-[40%] -mt-[40%]"
                        home
                    />
                </div>
            </div>
        </div>
    </div>

    <ClientOnly>
        <Teleport to="body">
            <WrModal v-model="isVideoModalOpened">
                <WrVideo v-if="isVideoModalOpened" class="w-[64rem] max-w-full m-auto" data-cookieconsent="marketing" data-src />
            </WrModal>
        </Teleport>
    </ClientOnly>
</template>

<script>
import { animate, createTimeline, stagger, utils, onScroll } from 'animejs'
import animateMixin from '~/mixins/animate'

export default defineNuxtComponent({
    name: 'WrHomeIntro',

    mixins: [animateMixin],

    props: {
        counters: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            isVideoModalOpened: false
        }
    },

    methods: {
        initAnimation() {
            const timeline = createTimeline({
                ease: 'outQuad',
                duration: 700,
                // autoplay: onScroll({
                //     enter: 'bottom-=150px',
                //     debug: true
                // }),
                onBegin: () => {
                    this.isAnimationReady = true
                },
                onComplete: (self) => {
                    self.cancel()

                    this.initImageAnimation()
                }
            })

            this.animation = timeline

            const titleItems = [...(this.$refs.title?.children || []), this.$refs.button?.$el].filter(Boolean)
            const { image, videoTitle } = this.$refs
            const playButton = this.$refs.playButton?.$el

            if (titleItems) {
                utils.set(titleItems, { opacity: 0, y: stagger(['50px', '25px']) })

                timeline.add(
                    titleItems,
                    {
                        opacity: 1,
                        y: 0,
                        delay: stagger(100),
                        duration: stagger(200, { start: 600 })
                    },
                    0
                )
            }

            if (videoTitle) {
                utils.set(videoTitle, { opacity: 0, x: '30px' })

                timeline.add(
                    videoTitle,
                    {
                        opacity: 1,
                        x: 0,
                        duration: 600
                    },
                    '-=300'
                )
            }

            if (playButton) {
                utils.set(playButton, { opacity: 0, scale: 0.8 })

                timeline.add(
                    playButton,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 600
                    },
                    '-=500'
                )
            }

            if (image) {
                utils.set(image, { opacity: 0, scale: 1.05 })

                timeline.add(
                    image,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 800
                    },
                    '-=300'
                )
            }
        },

        initImageAnimation() {
            const image = this.$refs.image

            this.animation = animate(image, {
                y: 40,
                duration: 800,
                ease: 'outCirc',
                autoplay: onScroll({
                    sync: 0.5,
                    enter: '150 -48',
                    leave: '250 bottom'
                    // debug: true
                })
            })
        }
    }
})
</script>

<style lang="postcss">
.wr-home-intro {
    @apply bg-white;
    padding-top: 2.5rem;

    @screen md {
        padding-top: 4rem;
    }

    @screen lg {
        padding-top: 6rem;
    }

    &__title {
        @apply text-dark;

        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        text-transform: uppercase;
        letter-spacing: -6.5%;
        font-weight: 900;
        font-size: 4rem;
        line-height: 1;

        & > * {
            display: block;
        }

        @screen md {
            font-size: 6rem;
            gap: 1rem;
        }

        @screen lg {
            font-size: 8rem;
            gap: 1.5rem;
        }

        small {
            text-transform: none;
            font-weight: bold;
            letter-spacing: 2.5%;

            font-size: 50%;

            @screen md {
                font-size: 42.5%;
            }

            @screen lg {
                font-size: 37.5%;
            }
        }
    }

    &__grid {
        display: grid;
        justify-items: start;

        @screen md {
            grid-template-columns: 1fr minmax(10rem, 18rem);
            grid-template-rows: 1fr auto;
            gap: 2rem;
        }
    }
}

.wr-home-intro-image {
    background-image: linear-gradient(
        180deg,
        rgb(255 255 255 / var(--tw-bg-opacity, 1)) 0%,
        rgb(255 255 255 / var(--tw-bg-opacity, 1)) 50%,
        rgb(240 245 252 / var(--tw-bg-opacity, 1)) 50%
    );

    img {
        margin-left: -10%;
        margin-right: -20%;
        max-width: 130%;

        @screen sm {
            margin-left: 0;
            margin-right: 0;
            max-width: 100%;
        }
    }
}
</style>
