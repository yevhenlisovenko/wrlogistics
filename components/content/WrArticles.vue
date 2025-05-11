<template>
    <section class="wr-articles section">
        <div class="container overflow-hidden">
            <div class="grid grid-cols-1 gap-6" :class="{ 'lg:grid-cols-2': $slots.content }">
                <WrHeading :tag="titleTag" :size="titleSize" :class="{ 'text-center': !$slots.content }">
                    <template v-if="$slots.caption" #caption>
                        <slot name="caption" mdc-unwrap="p"></slot>
                    </template>
                    <slot name="title" mdc-unwrap="p">{{ $t('products') }}</slot>
                    <template v-if="$slots.subtitle" #subtitle>
                        <slot name="subtitle" mdc-unwrap="p"></slot>
                    </template>
                </WrHeading>

                <div
                    ref="content"
                    class="content w-[42rem] max-w-full mx-auto"
                    :class="{ 'lg:pt-10': $slots.content, 'js-animation-hidden': !isAnimationReady }"
                >
                    <slot name="content"></slot>
                </div>
            </div>
        </div>

        <div class="container mt-8 md:mt-10 lg:mt-16">
            <div class="wr-articles__slider">
                <div v-for="article in articles" class="wr-articles__slide">
                    <WrArticleItem v-bind="article" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { animate, onScroll, utils } from 'animejs'
import animateMixin from '~/mixins/animate'

export default {
    name: 'WrArticles',

    mixins: [animateMixin],

    props: {
        titleTag: {
            type: String,
            default: 'h2'
        },

        titleSize: {
            type: String,
            default: 'sm'
        },

        articles: {
            type: Array,
            default: () => []
        }
    },

    methods: {
        initAnimation() {
            const content = this.$refs.content

            if (!content) {
                this.isAnimationReady = true
                return
            }

            utils.set(content, { opacity: 0, y: 20 })

            animate(content, {
                opacity: 1,
                y: 0,
                duration: 400,
                ease: 'outSine',
                autoplay: onScroll({
                    enter: 'bottom-=150px'
                }),
                onBegin: () => {
                    this.isAnimationReady = true
                }
            })
        }
    }
}
</script>

<style lang="postcss">
.wr-articles {
    &__slider {
        display: flex;
        margin-left: -1rem;
        margin-right: -1rem;
        width: calc(100% + 2rem);

        overflow-x: auto;
        scrollbar-width: none;
        scroll-snap-type: x mandatory;

        &::-webkit-scrollbar {
            display: none;
        }

        @screen lg {
            width: 100%;
            gap: 2px;
            margin-left: 0;
            margin-right: 0;
            overflow: hidden;
        }
    }

    &__slide {
        flex: 0 0 auto;
        display: flex;

        width: calc(100% - 2px - 2rem);
        min-width: calc(100% - 2px - 2rem);
        scroll-snap-align: center;

        &:where(:first-child) {
            padding-left: 1rem;
            width: calc(100% - 2px - 1rem);
            scroll-snap-align: start;
        }

        &:where(:last-child) {
            padding-right: 1rem;
            width: calc(100% - 2px - 1rem);
            scroll-snap-align: end;
        }

        @screen md {
            width: calc(50% - 2px - 1rem);
            min-width: calc(50% - 2px - 1rem);

            &:where(:first-child) {
                padding-left: 1rem;
                width: calc(50% - 2px);
                scroll-snap-align: start;
            }

            &:where(:last-child) {
                padding-right: 1rem;
                width: calc(50% - 2px);
                scroll-snap-align: end;
            }
        }

        @screen lg {
            width: calc((100% - 4px) / 3);
            min-width: calc((100% - 4px) / 3);
            padding: 0;
        }
    }
}
</style>
