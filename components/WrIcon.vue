<template>
    <span class="wr-icon relative" :class="{ 'w-20 h-20 md:w-24 md:h-24': size === 'md' }">
        <NuxtIcon name="wr:grid-bg-fill" size="6rem" :class="{ 'w-20 h-20 md:w-24 md:h-24': size === 'md' }" />

        <NuxtIcon
            :name="name"
            size="4.5rem"
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            :class="{ 'w-[4rem] h-[4rem] md:w-[4.5rem] md:h-[4.5rem]': size === 'md' }"
        />
    </span>
</template>

<script>
export default defineNuxtComponent({
    name: 'WrIcon',

    props: {
        name: {
            type: String,
            required: true
        },

        bgFill: {
            type: String,
            default: '#fff'
        },

        size: {
            type: String,
            default: 'md'
        }
    }
})
</script>
