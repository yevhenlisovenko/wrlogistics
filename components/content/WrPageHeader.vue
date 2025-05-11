<template>
    <div class="wr-page-header relative">
        <div class="container">
            <WrHeading :tag="titleTag" :uppercase="titleUppercase" :class="{ 'text-center': center }" size="lg">
                <slot name="title" mdc-unwrap="p"></slot>
                <template v-if="$slots.subtitle" #subtitle>
                    <slot name="subtitle" mdc-unwrap="p"></slot>
                </template>
            </WrHeading>
        </div>

        <WrPattern class="hidden lg:block absolute right-[13.4%] bottom-[60%]" :ratio="[15]" once />

        <div v-if="image" class="wr-page-header__mask" :class="{ 'js-animation-hidden': !isAnimationReady }">
            <NuxtImg ref="image" :src="image.src" :alt="image.alt" sizes="100vw, md:100vw, lg:100vw, xl:100vw" class="wr-page-header__image" />
        </div>
    </div>
</template>

<script>
import animateMixin from '~/mixins/animate'
import { animate, utils } from 'animejs'

export default {
    name: 'WrPageHeader',

    mixins: [animateMixin],

    props: {
        titleTag: {
            type: String,
            default: 'h1'
        },

        image: {
            type: Object,
            default: null
        },

        titleUppercase: {
            type: Boolean,
            default: true
        },

        center: Boolean
    },

    methods: {
        initAnimation() {
            const image = this.$refs.image?.$el

            if (!image) {
                this.isAnimationReady = true
                return
            }

            utils.set(image, { y: '100%' })

            animate(image, { y: '0%', ease: 'outCirc', duration: 600, onBegin: () => (this.isAnimationReady = true) })
        }
    }
}
</script>

<style lang="postcss">
.wr-page-header {
    @apply bg-white;

    &__mask {
        mask-image: url('/img/page_bg_mask.svg');
        mask-size: auto 100%;
        mask-repeat: no-repeat;
        aspect-ratio: 7 / 4;

        position: relative;
        overflow: hidden;

        @screen md {
            margin-top: -4rem;

            aspect-ratio: 15 / 4;
            mask-image: url('/img/page_bg_mask_lg.svg');
        }
    }

    &__image {
        object-fit: cover;
        object-position: center top;

        width: 100%;
        height: 100%;

        position: absolute;
        inset: 0;
    }
}
</style>
