<template>
    <div class="section container">
        <WrHeading :tag="titleTag" :size="titleSize" class="text-center">
            <template v-if="$slots.caption" #caption>
                <slot name="caption" mdc-unwrap="p"></slot>
            </template>
            <slot name="title" mdc-unwrap="p"></slot>
            <template v-if="$slots.subtitle" #subtitle>
                <slot name="subtitle" mdc-unwrap="p"></slot>
            </template>
        </WrHeading>

        <div
            class="grid gap-[2px] mt-8 md:mt-12 lg:mt-16"
            :class="{ 'grid-cols-2': items.length === 2, 'md:grid-cols-3': items.length == 3, 'grid-cols-2 lg:grid-cols-4': items.length > 3 }"
        >
            <WrCardsGridItem v-for="(item, index) in items" :key="index" :index="index" v-bind="item" />
        </div>
    </div>
</template>

<script>
export default defineNuxtComponent({
    name: 'WrCardsGrid',

    props: {
        titleTag: {
            type: String,
            default: 'h2'
        },

        titleSize: {
            type: String,
            default: 'md'
        },

        items: {
            type: Array,
            default: () => []
        }
    }
})
</script>
