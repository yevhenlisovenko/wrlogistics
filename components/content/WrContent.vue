<template>
    <div class="container container--md py-8 md:py-12 lg:py-16">
        <div class="content bg-white px-4 py-6 md:p-10 lg:px-24 lg:py-16 rounded-md md:rounded-2xl">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WrContent'
}
</script>
