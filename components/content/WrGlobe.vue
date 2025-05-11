<template>
    <section class="wr-globe overflow-hidden" :class="{ 'pt-10 md:pt-16 lg:pt-24': offsetTop }">
        <div class="container">
            <div class="grid grid-cols-1 gap-6" :class="{ 'lg:grid-cols-2': $slots.content }">
                <WrHeading :tag="titleTag" :size="titleSize" :class="{ 'text-center': !$slots.content }">
                    <template v-if="$slots.caption" #caption>
                        <slot name="caption" mdc-unwrap="p"></slot>
                    </template>
                    <slot name="title" mdc-unwrap="p">{{ $t('products') }}</slot>
                    <template v-if="$slots.subtitle" #subtitle>
                        <slot name="subtitle" mdc-unwrap="p"></slot>
                    </template>
                </WrHeading>

                <div ref="content" class="content w-[42rem] max-w-full mx-auto" :class="{ 'lg:pt-10': $slots.content }">
                    <slot name="content"></slot>
                </div>
            </div>

            <div ref="wrapper" class="mt-6 lg:mt-8 relative" :class="{ 'js-animation-hidden': !isAnimationReady }">
                <div class="overflow-hidden aspect-[2.15] relative z-[1]">
                    <NuxtImg ref="globe" src="/img/planet.png" width="1248" height="1248" />
                </div>

                <div ref="path" class="wr-globe__ship-path"></div>

                <div ref="ship" class="wr-globe__ship">
                    <span ref="pulse"></span>
                    <NuxtImg ref="ship" src="/img/ship.png" with="48" height="26" />
                </div>

                <WrGlobePin v-for="pin in pins" v-bind="pin.pos" class="js-pin">
                    {{ $t(pin.title) }}
                </WrGlobePin>
            </div>
        </div>
    </section>
</template>

<script>
import animateMixin from '~/mixins/animate'
import { createTimeline, stagger, onScroll, utils, animate } from 'animejs'

const PINS = [
    {
        pos: {
            top: 24,
            left: 58
        },
        title: 'Germany'
    },
    {
        pos: {
            top: 38,
            left: 58
        },
        title: 'France'
    },
    {
        pos: {
            top: 35,
            left: 65
        },
        title: 'Italy'
    },
    {
        pos: {
            top: 11,
            left: 64
        },
        title: 'Latvia'
    },
    {
        pos: {
            top: 30,
            left: 86,
            z: 0
        },
        title: 'China'
    },
    {
        pos: {
            top: 23,
            left: 80
        },
        title: 'Kazakhstan'
    },
    {
        pos: {
            top: 41,
            left: 88
        },
        title: 'Uzbekistan'
    },
    {
        pos: {
            top: 58,
            left: 86
        },
        title: 'KSA'
    },
    {
        pos: {
            top: 62,
            left: 93.5
        },
        title: 'UAE'
    },
    {
        pos: {
            top: 69,
            left: 98,
            z: 0
        },
        title: 'India'
    },
    {
        pos: {
            top: 33,
            left: 18
        },
        title: 'USA'
    },
    {
        pos: {
            top: 54,
            left: 5,
            z: 0
        },
        title: 'Colombia'
    }
]

export default defineNuxtComponent({
    name: 'WrGlobe',

    mixins: [animateMixin],

    props: {
        titleTag: {
            type: String,
            default: 'h2'
        },

        titleSize: {
            type: String,
            default: 'md'
        },

        offsetTop: Boolean
    },

    setup() {
        return {
            pins: PINS
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

            const globe = this.$refs?.globe.$el

            if (globe) {
                utils.set(globe, { rotate: 15, scale: 0.9, opacity: 0 })

                timeline.add(globe, {
                    opacity: {
                        to: 1,
                        duration: 400
                    },
                    scale: 1,
                    rotate: 0,
                    duration: 800
                })
            }

            const pins = this.$refs.wrapper?.querySelectorAll('.js-pin')

            if (pins) {
                utils.set(pins, { opacity: 0 })

                timeline.add(pins, {
                    opacity: 1,
                    delay: stagger(100),
                    duration: 400
                })
            }

            const path = this.$refs.path

            if (path) {
                utils.set(path, { '--scale-x': 0, '--path-x': 0 })

                timeline
                    .add(path, {
                        '--scale-x': 1,
                        duration: 400
                    })
                    .add(path, {
                        '--path-x': '33%',
                        duration: 400
                    })
            }

            const ship = this.$refs.ship

            if (ship) {
                utils.set(ship, { opacity: 0, '--bg-scale': 0 })

                timeline.add(
                    ship,
                    {
                        opacity: 1,
                        duration: 400
                    },
                    '-=100'
                )
            }

            const pulse = this.$refs.pulse

            if (pulse) {
                utils.set(pulse, { opacity: 0, scale: 0 })

                timeline.add(
                    pulse,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1200,
                        ease: 'outExpo',
                        onComplete: () => {
                            animate(pulse, { scale: [1, 0.9], duration: 1000, ease: 'inOutCirc', loop: true, alternate: true })
                        }
                    },
                    '-=200'
                )
            }

            this.animation = timeline
        }
    }
})
</script>

<style lang="postcss">
.wr-globe {
    &__ship-path {
        display: none;

        /* background-color: red; */
        background-image: linear-gradient(
            90deg,
            theme('colors.dark'),
            theme('colors.dark') var(--path-x, 33%),
            theme('colors.white') var(--path-x, 33%),
            theme('colors.white')
        );
        width: 40%;
        height: 4px;
        border-radius: 2px;

        transform-origin: left center;
        transform: translateY(2px) rotate(3deg) scaleX(var(--scale-x, 1));

        position: absolute;
        left: 18%;
        top: 33%;
        z-index: 1;

        @screen md {
            display: block;
        }
    }

    &__ship {
        display: none;

        width: 6rem;
        height: 6rem;

        img {
            border: 1px solid theme('colors.white');
            border-radius: 6rem;
            z-index: 1;
        }

        transform: translate(-50%, -50%);

        position: absolute;
        left: 31%;
        top: 35%;
        z-index: 2;

        span {
            @apply bg-blue-500/45;

            display: block;
            width: 6rem;
            height: 6rem;
            border-radius: 3rem;
        }

        @screen md {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            place-items: center;

            & > * {
                grid-row: 1;
                grid-column: 1;
            }
        }
    }
}
</style>
