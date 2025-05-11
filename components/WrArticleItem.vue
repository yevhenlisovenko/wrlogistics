<template>
    <div class="bg-white rounded-2xl overflow-hidden border border-gray-300">
        <NuxtImg :src="image.src" :alt="image.alt || title" sizes="100vw, md:50vw, lg:33vw" class="w-full aspect-[3/2] object-cover" />
        <div class="flex flex-col gap-3 px-6 pt-4 pb-6">
            <h3 class="text-dark text-xl font-medium line-clamp-2">{{ title }}</h3>
            <p class="text-sm">{{ description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WrArticleItem',

    props: {
        image: {
            type: Object,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        }
    }
}
</script>
