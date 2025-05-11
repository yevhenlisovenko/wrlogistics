<template>
    <Component
        :is="computedTag"
        :to="(to && localePath(to)) || null"
        class="wr-button"
        :class="{
            'wr-button--primary': theme === 'primary',
            'wr-button--secondary': theme === 'secondary',
            'wr-button--outline': theme === 'outline',
            'wr-button--md': size === 'md',
            'wr-button--lg': size === 'lg',
            'lg:wr-button--lg': size === 'lg:lg'
        }"
        v-bind="$attrs"
        @click="$emit('click', $event)"
    >
        <slot mdc-unwrap="p"></slot>
    </Component>
</template>

<script>
import { NuxtLink } from '#components'

export default {
    name: 'WrButton',

    props: {
        tag: {
            type: String,
            default: 'button'
        },

        size: {
            type: String,
            default: 'md'
        },

        theme: {
            type: String,
            default: 'primary'
        },

        to: {
            type: String,
            default: ''
        }
    },

    emits: ['click'],

    setup() {
        const localePath = useLocalePath()

        return {
            localePath
        }
    },

    computed: {
        computedTag() {
            return this.to ? NuxtLink : this.tag
        }
    }
}
</script>

<style lang="postcss">
.wr-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;

    border-radius: 6px;
    line-height: 1;
    letter-spacing: 0;
    vertical-align: middle;
    font-size: 0.875rem;
    font-weight: 400;

    transition: color 0.2s, background-color 0.2s, border-color 0.2s;

    &--md {
        padding: 0.25rem 1rem;
        height: 2.5rem;
    }

    &--lg {
        padding: 0.5rem 1.5rem;
        height: 3rem;
    }

    &--lg:lg {
        padding: 0.25rem 1rem;
        height: 2.5rem;

        @screen lg {
            padding: 0.75rem 1.5rem;
            height: 3.75rem;
        }
    }

    &--primary {
        @apply bg-blue-500 text-white;

        &:hover,
        &:focus-visible {
            @apply bg-blue-700;
        }
    }

    &--primary&--md {
        padding: 0.5rem 1.5rem;
        height: 3rem;
    }

    &--primary&--lg {
        @screen lg {
            border-radius: 0.5rem;
            padding: 0.75rem 1.5rem;
            height: 3.75rem;
        }
    }

    &--primary&--lg:lg {
        padding: 0.5rem 1.5rem;
        height: 3rem;

        @screen lg {
            border-radius: 0.5rem;
            padding: 0.75rem 1.5rem;
            height: 3.75rem;
        }
    }

    &--secondary {
        @apply bg-blue-100 border border-gray-300 text-blue-500;

        &:hover,
        &:focus-visible {
            @apply border-gray-400 text-blue-700;
        }
    }

    &--outline {
        @apply border border-blue-500 text-blue-500;

        &:hover,
        &:focus-visible {
            @apply border-blue-700 text-blue-700;
        }
    }
}
</style>
