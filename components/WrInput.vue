<template>
    <label class="wr-input" :class="[{ 'wr-input--error': !!error }, $attrs.class]">
        <span class="sr-only">{{ label }}</span>
        <Component :is="component.tag" v-bind="{ ...$attrs, ...component.attrs }" :placeholder="label" @input="onInput" @invalid="onInvalid" />
        <span v-if="error" class="wr-input__error">{{ error }}</span>
    </label>
</template>

<script>
export default {
    name: 'WrInput',

    inheritAttrs: false,

    props: {
        type: {
            type: String,
            default: 'text'
        },

        label: {
            type: String,
            required: true
        },

        modelValue: {
            type: String,
            default: ''
        },

        error: {
            type: String,
            default: ''
        }
    },

    emits: ['update:modelValue', 'update:error'],

    computed: {
        component() {
            const result = { tag: 'input', attrs: {} }

            if (this.type === 'textarea') {
                result.tag = 'textarea'
            } else {
                result.attrs.type = this.type
            }

            return result
        }
    },

    methods: {
        onInput($event) {
            if (this.error) {
                this.$emit('update:error', '')
            }

            this.$emit('update:modelValue', $event.target.value)
        },

        onInvalid($event) {
            $event.preventDefault()

            this.$emit('update:error', $event.target.validationMessage)
        }
    }
}
</script>

<style lang="postcss">
.wr-input {
    display: flex;
    position: relative;

    input,
    textarea {
        @apply bg-white text-dark border-gray-300 border;

        width: 100%;
        min-width: 0;
        padding: 0.75rem;
        border-radius: 6px;

        &:focus-visible {
            @apply border-blue-500;
            outline: none;
        }

        &::placeholder {
            @apply text-gray-500;
        }
    }

    input {
        min-height: 3rem;
    }

    textarea {
        min-height: 9rem;
        resize: vertical;
    }

    &--error {
        input,
        textarea {
            @apply border-red-500/30;
        }
    }

    &__error {
        @apply text-red-500 truncate;

        font-size: 0.6875rem;
        max-width: 100%;

        position: absolute;
        left: 0;
        top: calc(100% + 0.225rem);
    }
}
</style>
