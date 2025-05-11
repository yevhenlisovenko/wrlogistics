<template>
    <div class="flex items-center h-dvh">
        <div class="container container--sm">
            <div class="bg-white px-4 py-6 md:p-10 lg:px-24 lg:py-16 rounded-md md:rounded-2xl flex flex-col items-center">
                <h1 class="text-3xl lg:text-4xl text-dark font-medium text-balance mb-8 lg:mb-12 text-center">
                    <span class="block">{{ error.statusCode }}</span>
                    <small class="text-xl lg:text-2xl">{{ error.message }}</small>
                </h1>

                <WrButton @click="handleError">
                    {{ $t('homepage') }}
                </WrButton>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        error: {
            type: Object,
            required: true
        }
    },

    setup() {
        return {
            handleError: () => clearError({ redirect: '/' })
        }
    }
}
</script>
