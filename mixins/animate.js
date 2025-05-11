export default {
    setup() {
        return {
            animation: null
        }
    },

    data() {
        return {
            isAnimationReady: false
        }
    },

    mounted() {
        this.initAnimation()
    },

    beforeUnmount() {
        if (this.animation) {
            this.animation.cancel()
            this.animation = null
        }
    },

    methods: {
        initAnimation() {
            console.log('Init animation')
        }
    }
}
