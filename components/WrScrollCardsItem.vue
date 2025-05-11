<template>
    <div class="bg-white flex flex-col gap-3 p-6 rounded-2xl min-h-64 lg:aspect-[8/5]">
        <WrIcon :name="icon" class="mb-auto" />
        <p class="text-dark font-medium text-2xl md:text-3xl lg:text-4xl">{{ title }}</p>
        <p class="lg:text-lg">{{ description }}</p>
    </div>
</template>

<script>
export default defineNuxtComponent({
    name: 'WrScrollCardsItem',

    props: {
        icon: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ''
        }
    }
})
</script>
