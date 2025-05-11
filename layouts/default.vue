<template>
    <VueLenis root :options="{ wheelMultiplier: 0.9, touchMultiplier: 0.9 }">
        <WrHeader />

        <slot />

        <WrFooter />
    </VueLenis>
</template>

<script>
import { VueLenis } from 'lenis/vue'
import { clearAllBodyScrollLocks } from 'body-scroll-lock'

export default {
    name: 'NuxtLayoutDefault',

    components: {
        VueLenis
    },

    setup() {
        const router = useRouter()

        router.afterEach((to, from) => {
            if (to.path !== from.path) {
                clearAllBodyScrollLocks()
            }
        })
    }
}
</script>
