<template>
    <section class="section">
        <div class="container">
            <WrHeading :tag="titleTag" class="text-center">
                <slot name="title" mdc-unwrap="p">{{ $t('products') }}</slot>
                <template v-if="$slots.subtitle" #subtitle>
                    <slot name="subtitle" mdc-unwrap="p"></slot>
                </template>
            </WrHeading>

            <div class="grid gap-[2px] md:grid-cols-6 mt-6 md:mt-9 lg:mt-12">
                <WrProductsCard
                    v-for="(item, index) in items"
                    :key="index"
                    :index="index"
                    :title="item.title"
                    :description="item.meta?.card_description"
                    :image="item.meta?.card_image"
                    :is-small="item.meta?.card_size === 'sm'"
                />
            </div>
        </div>
    </section>
</template>

<script>
export default defineNuxtComponent({
    name: 'WrProducts',

    props: {
        titleTag: {
            type: String,
            default: 'h2'
        }
    },

    async setup() {
        const i18n = useI18n()
        const locale = unref(i18n.locale)
        const localePrefix = '/' + locale

        const { data: items } = await useAsyncData(locale + '-products', () => {
            return queryCollection('products').select('path', 'title', 'meta').all()
        })

        return {
            items: computed(() => {
                return locale === i18n.defaultLocale
                    ? items.value.reduce(
                          (acc, item) =>
                              item.path.startsWith(localePrefix) ? acc.concat({ ...item, path: item.path.replace(localePrefix, '') }) : acc,
                          []
                      )
                    : items.value.filter((item) => item.path.startsWith(localePrefix))
            })
        }
    }
})
</script>
