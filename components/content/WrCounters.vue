<template>
    <section class="section container">
        <WrHeading :tag="titleTag" :size="titleSize" class="text-center" center>
            <template v-if="$slots.caption" #caption>
                <slot name="caption" mdc-unwrap="p"></slot>
            </template>
            <slot name="title" mdc-unwrap="p">{{ $t('products') }}</slot>
            <template v-if="$slots.subtitle" #subtitle>
                <slot name="subtitle" mdc-unwrap="p"></slot>
            </template>
        </WrHeading>

        <div class="grid grid-cols-2 lg:grid-cols-4 mt-8 md:mt-10 lg:mt-16">
            <WrCounter
                v-for="(counter, index) in counters"
                v-bind="counter"
                :class="{ 'border-l border-gray-400': index % 2 > 0, 'lg:border-l lg:border-gray-400': index === 2 }"
            />
        </div>
    </section>
</template>

<script>
export default defineNuxtComponent({
    name: 'WrCounters',

    props: {
        titleTag: {
            type: String,
            default: 'h2'
        },

        titleSize: {
            type: String,
            default: 'sm'
        },

        counters: {
            type: Array,
            default: () => []
        }
    }
})
</script>
