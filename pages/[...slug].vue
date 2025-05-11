<template>
    <ContentRenderer :value="page" />
</template>

<script>
import { joinURL } from 'ufo'

export default {
    name: 'HomePage',

    async setup() {
        definePageMeta({
            // fix HMR issue with catch all route
            validate: (route) =>
                route.fullPath !== '/__webpack_hmr/client' &&
                !/.(ico|png|svg|jpg|jpeg|gif|webp|avif|ico|svg|ttf|woff|woff2|eot|otf|webp|mp4|webm|ogg|wav|mp3|m4a|aac|oga|ico|svg|ttf|woff|woff2|eot|otf|webp|mp4|webm|ogg|wav|mp3|m4a|aac|oga)$/.test(
                    route.path
                ),
            scrollToTop: true
        })

        const slug = useRoute().params.slug
        const i18n = useI18n()
        const locale = unref(i18n.locale)
        const title = ref('title')
        const description = ref('description')

        useSeoMeta({
            title,
            description
        })

        const { data: page } = await useAsyncData(`page-${locale}-${slug}`, async () => {
            const path = joinURL(`/${locale}`, ...slug)

            return queryCollection('content').path(path).first()
        })

        title.value = page.value.title
        description.value = page.value.description

        if (!page.value) {
            showError({
                statusCode: 404,
                statusMessage: i18n.t('page_not_found')
            })
        }

        return {
            page
        }
    }
}
</script>
