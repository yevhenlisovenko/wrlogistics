<template>
    <div
        class="flex flex-col wr-heading"
        :class="{
            'w-[42rem] max-w-full mx-auto': size === 'sm',
            'gap-3 lg:gap-6': size === 'md',
            'gap-4 md:gap-10 lg:gap-16': size === 'lg',
            'js-animation-hidden': !isAnimationReady
        }"
    >
        <span v-if="$slots.caption" class="text-blue-500 mb-4">
            <slot name="caption" />
        </span>
        <Component
            :is="tag"
            class="wr-heading__title text-dark text-balance"
            :class="{
                'font-medium text-3xl lg:text-5xl': size === 'sm',
                'font-medium text-4xl lg:text-7xl': size === 'md',
                'wr-heading__title--large font-black text-6xl md:text-8xl lg:text-9xl': size === 'lg',
                uppercase: uppercase
            }"
        >
            <slot />
        </Component>

        <p v-if="$slots.subtitle" :class="{ 'lg:text-xl': !uppercase, 'lg:text-2xl': uppercase }">
            <slot name="subtitle" />
        </p>
    </div>
</template>

<script>
import animateMixin from '~/mixins/animate'
import { animate, stagger, onScroll } from 'animejs'

export default {
    name: 'WrHeading',

    mixins: [animateMixin],

    props: {
        tag: {
            type: String,
            default: 'h2'
        },

        size: {
            type: String,
            default: 'md'
        },

        uppercase: Boolean
    },

    methods: {
        initAnimation() {
            const children = this.$el?.children

            if (!children) {
                this.isAnimationReady = true
                return
            }

            this.animation = animate(children, {
                opacity: { from: 0 },
                y: { from: stagger(['70px', '50px']) },
                delay: stagger(200),
                duration: stagger([600, 800]),
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
        }
    }
}
</script>

<style lang="postcss">
.wr-heading {
    &__title {
        @apply text-dark;

        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        letter-spacing: -1.2%;

        line-height: 1;
        pointer-events: none;

        &--large {
            letter-spacing: -6.5%;
        }

        & > * {
            display: block;
        }

        small {
            text-transform: none;
            font-weight: 500;
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
}
</style>
