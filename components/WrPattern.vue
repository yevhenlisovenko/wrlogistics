<template>
    <div class="wr-pattern" :style="style" :class="{ 'wr-pattern--ratio': !!ratio, 'js-animation-hidden': !isAnimationReady }">
        <span v-if="lines.includes('top')" class="wr-pattern__line wr-pattern__line--top"></span>
        <span v-if="lines.includes('left')" class="wr-pattern__line wr-pattern__line--left"></span>

        <span class="wr-pattern__center" :style="{ transformOrigin }">
            <span :style="{ transform: `rotate(${rotate}deg)` }"></span>
        </span>

        <span v-if="lines.includes('right')" class="wr-pattern__line wr-pattern__line--right"></span>
        <span v-if="lines.includes('bottom')" class="wr-pattern__line wr-pattern__line--bottom"></span>
    </div>
</template>

<script>
import { utils, createTimeline, stagger, onScroll } from 'animejs'
import animteMixin from '~/mixins/animate'

export default {
    name: 'WrPattern',

    mixins: [animteMixin],

    props: {
        lines: {
            type: String,
            default: 'right,top'
        },

        rotate: {
            type: Number,
            default: -30
        },

        once: Boolean,

        ratio: {
            type: [Array, Boolean],
            default: null
        }
    },

    computed: {
        style() {
            if (!Array.isArray(this.ratio)) return null

            return {
                '--ratio': this.ratio[0],
                '--ratio-lg': this.ratio[1]
            }
        },

        transformOrigin() {
            return `${this.lines.includes('bottom') ? 'bottom' : 'top'} ${this.lines.includes('left') ? 'left' : 'right'}`
        }
    },

    methods: {
        initAnimation() {
            const center = this.$el.querySelector('.wr-pattern__center')
            const vertical = this.$el.querySelectorAll('.wr-pattern__line--left,.wr-pattern__line--right')
            const horizontal = this.$el.querySelectorAll('.wr-pattern__line--top,.wr-pattern__line--bottom')

            const timeline = createTimeline({
                autoplay: this.once
                    ? true
                    : onScroll({
                          enter: 'bottom+=200px',
                          leave: 'center-=150px',
                          sync: true
                          // debug: true
                      }),
                duration: 500,
                easing: 'easeOutQuad',
                onBegin: () => {
                    this.isAnimationReady = true
                }
            })

            this.animaton = timeline

            if (center) {
                utils.set(center, { opacity: 0, scale: 0.8, translateY: '100%' })

                timeline.add(
                    center,
                    {
                        opacity: 1,
                        scale: 1,
                        translateY: 0,
                        onUpdate: (self) => {
                            const percent = Math.floor((100 * (1 - self.progress)) / 1.2)
                            self.targets.forEach((target) => {
                                target.style.clipPath = `polygon(0 ${percent}%, 100% ${percent}%, 100% 100%, 0 100%)`
                            })
                        }
                    },
                    0
                )
            }

            if (vertical.length) {
                vertical.forEach((line) => {
                    utils.set(line, { opacity: 0, scaleY: 0 })
                })

                timeline.add(vertical, { opacity: 1, scaleY: 1, delay: stagger(100) }, 300)
            }

            if (horizontal.length) {
                horizontal.forEach((line) => {
                    utils.set(line, { opacity: 0, scaleX: 0 })
                })

                timeline.add(horizontal, { opacity: 1, scaleX: 1, delay: stagger(100) }, 500)
            }
        }
    }
}
</script>

<style lang="postcss">
.wr-pattern {
    width: 6rem;
    height: 6rem;

    &--ratio {
        width: calc(100% / var(--ratio, 7));
        aspect-ratio: 1;

        @screen lg {
            width: calc(100% / var(--ratio-lg, var(--ratio, 14)));
        }
    }

    &__center {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        aspect-ratio: 1;

        border-radius: 4px;
        overflow: hidden;

        span {
            display: block;
            width: calc(100% * 1.3);
            aspect-ratio: 1;
            margin: -1.5rem;

            background-image: linear-gradient(90deg, theme('colors.gray.300'), theme('colors.gray.300') 50%, transparent 50%, transparent);
            background-size: 8px 100%;
        }
    }

    &__line {
        position: absolute;

        &--top,
        &--bottom {
            width: 300%;
            height: 1px;
            background-image: linear-gradient(
                90deg,
                theme('colors.gray.500 / 0%'),
                theme('colors.gray.500 / 20%') 20%,
                theme('colors.gray.500 / 20%') 80%,
                theme('colors.gray.500 / 0%')
            );
            transform-origin: right center;

            left: -100%;
        }

        &--bottom {
            bottom: 0;
        }

        &--left,
        &--right {
            width: 1px;
            height: 300%;
            background-image: linear-gradient(
                0deg,
                theme('colors.gray.500 / 0%'),
                theme('colors.gray.500 / 20%') 20%,
                theme('colors.gray.500 / 20%') 80%,
                theme('colors.gray.500 / 0%')
            );
            transform-origin: bottom center;
        }

        &--left {
            top: -100%;
        }

        &--right {
            top: -100%;
            right: 0;
        }
    }
}
</style>
