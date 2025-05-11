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

        <div class="flex flex-wrap justify-center mt-8 md:mt-10 lg:mt-16">
            <div v-for="(item, index) in items" class="p-px w-full sm:w-1/2 lg:w-1/3">
                <WrPeopleCard v-bind="item" :index="index" />
            </div>
        </div>
    </section>
</template>

<script>
export default defineNuxtComponent({
    name: 'WrPeople',

    props: {
        titleTag: {
            type: String,
            default: 'h2'
        },

        titleSize: {
            type: String,
            default: 'sm'
        },

        items: {
            type: Array,
            default: () => []
        }
    }
})
</script>
