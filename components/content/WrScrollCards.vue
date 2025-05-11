<template>
    <section class="wr-scroll-cards section container" :style="styles">
        <WrHeading ref="header" :tag="titleTag" class="wr-scroll-cards__header text-center">
            <slot name="title" mdc-unwrap="p">{{ $t('products') }}</slot>
            <template v-if="$slots.subtitle" #subtitle>
                <slot name="subtitle" mdc-unwrap="p"></slot>
            </template>
        </WrHeading>

        <div
            ref="content"
            class="wr-scroll-cards__content grid gap-[2px] md:grid-cols-2 md:gap-4 lg:gap-8"
            :class="{ 'js-animation-hidden': !isAnimationReady }"
        >
            <div ref="mainImage" class="contents md:block md:z-10">
                <div ref="imageWrapper" class="md:top-4 z-10 rounded-xl overflow-hidden wr-scroll-cards__main-image">
                    <NuxtImg v-for="(item, index) in items" :data-index="index" class="aspect-[8/5] object-cover" :src="item.image" />
                </div>
            </div>
            <div ref="items" class="grid gap-[2px]">
                <WrScrollCardsItem
                    v-for="(item, index) in items"
                    :icon="item.icon"
                    :data-index="index"
                    :title="item.title"
                    :description="item.description"
                    class="wr-scroll-cards__item"
                />
            </div>
        </div>
    </section>
</template>

<script>
import { animate, onScroll, utils, createTimeline } from 'animejs'
import animateMixins from '~/mixins/animate'

let z = 5

export default defineNuxtComponent({
    name: 'WrScrollCards',

    mixins: [animateMixins],

    props: {
        titleTag: {
            type: String,
            default: 'h2'
        },

        items: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            isDesktop: false,
            currentIndex: 0,
            progress: 0,
            heights: {}
        }
    },

    setup() {
        return {
            scrollAnimation: null
        }
    },

    computed: {
        styles() {
            return {
                '--header-height': this.heights.header ? `${this.heights.header}px` : null,
                '--card-height': this.heights.card ? `${this.heights.card}px` : null,
                '--image-height': this.heights.image ? `${this.heights.image}px` : null
            }
        }
    },

    watch: {
        currentIndex(newIndex, oldIndex) {
            this.animate(newIndex, oldIndex, oldIndex > newIndex ? 'top' : 'bottom')
        }
    },

    mounted() {
        window.addEventListener('resize', this.updateHeights, { passive: false })

        // hide images
        this.$nextTick(() => {
            const images = this.$refs.imageWrapper.querySelectorAll('img')

            for (let i = 0; i < images.length; i++) {
                if (i === this.currentIndex) continue
                utils.set(images[i], { display: 'none' })
            }

            this.updateHeights()
        })
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.updateHeights, { passive: false })

        this.scrollAnimation?.cancel()
    },

    methods: {
        initAnimation() {
            const content = this.$refs.content

            utils.set(content, { opacity: 0 })

            this.animation = animate(content, {
                opacity: 1,
                duration: 1000,
                ease: 'outSine',
                composition: 'replace',
                autoplay: onScroll({
                    sync: 'play'
                }),
                onBegin: () => {
                    this.$nextTick(() => {
                        this.initScrollAnimation()
                    })

                    this.isAnimationReady = true
                }
            })
        },

        initScrollAnimation() {
            const itemsLength = this.items.length

            this.scrollAnimation = animate(this.$refs.items, {
                autoplay: this._getAutoplaySettings(),
                onUpdate: (self) => {
                    const currentIndex = utils.clamp(Math.round(self.progress * (itemsLength - 1)), 0, itemsLength - 1)

                    if (currentIndex !== this.currentIndex) {
                        this.currentIndex = currentIndex
                    }
                }
            })
        },

        updateHeights() {
            this.heights.card = null

            this.isDesktop = window.innerWidth > 768

            this.$nextTick(() => {
                this.heights = this._getHeights()

                if (this.scrollAnimation) {
                    this.scrollAnimation.cancel()
                    this.scrollAnimation = null
                    this.initScrollAnimation()
                }
            })
        },

        _getHeights() {
            // const scroll = this.$el.clientHeight
            // const inner = window.innerHeight
            const header = this.$refs.header.$el.clientHeight
            const card = Math.max.apply(
                null,
                [...this.$refs.items.querySelectorAll('.wr-scroll-cards__item')].map((item) => item.clientHeight)
            )
            const image = this.$refs.imageWrapper.clientHeight

            return {
                // scroll,
                // inner,
                header,
                card,
                image
            }
        },

        _getAutoplaySettings() {
            const enter = this.isDesktop ? this.heights.header + 96 : this.heights.header + this.heights.image + this.heights.card + 32
            const leave = this.isDesktop ? this.heights.header + 96 : this.heights.header + this.heights.image + 32
            const start = 0 // this.isDesktop ? 0 : this.heights.card / 1.5
            const end = this.heights.card

            return onScroll({
                enter: `top+=${enter} start-=${start}px`,
                leave: `top+=${leave} end-=${end}px`,
                sync: true,
                onUpdate: (self) => {
                    this.progress = self.progress
                }
            })
        },

        getImageAtIndex(index) {
            return this.$refs.imageWrapper.querySelector(`img[data-index="${index}"]`)
        },

        animate(newIndex, oldIndex) {
            // dir = 'bottom'
            const newImage = this.getImageAtIndex(newIndex)
            const oldImage = this.getImageAtIndex(oldIndex)

            utils.remove(newImage)
            utils.set(newImage, { display: 'block', zIndex: 0, opacity: 0 }) // y: 0,
            newImage.classList.remove('absolute', 'inset-0', 'pointer-events-none')

            oldImage.classList.add('absolute', 'inset-0', 'pointer-events-none')
            utils.set(oldImage, { opacity: 1, zIndex: z++ }) // y: 0,

            const timeline = createTimeline()

            timeline.add(oldImage, {
                opacity: 0,
                duration: 400,
                ease: 'inSine',
                onComplete: () => {
                    utils.set(oldImage, { display: 'none', zIndex: 0 })
                    oldImage.classList.remove('absolute', 'inset-0', 'pointer-events-none')
                }
            })

            timeline.add(
                newImage,
                {
                    opacity: 1,
                    duration: 400,
                    ease: 'outSine'
                },
                200
            )

            timeline.play()

            // animate(oldImage, {
            //     y: dir === 'bottom' ? '-100%' : '100%',
            //     opacity: 1,
            //     ease: 'inSine',
            //     duration: 400,
            //     onComplete: () => {
            //         utils.set(oldImage, { display: 'none', zIndex: 0 })
            //         oldImage.classList.remove('absolute', 'inset-0', 'pointer-events-none')
            //     }
            // })
        }
    }
})
</script>

<style lang="postcss">
.wr-scroll-cards {
    --cards-offset: 2rem;

    @screen md {
        --cards-offset: 3rem;
    }

    @screen lg {
        --cards-offset: 4rem;
    }

    &__content {
        margin-top: calc(-1 * var(--image-height));
    }

    &__header {
        position: sticky;
        top: var(--section-padding);
        z-index: 2;
        margin-bottom: calc(var(--image-height) + var(--card-height) + var(--cards-offset));

        @screen md {
            margin-bottom: calc(var(--card-height) + var(--cards-offset));
        }
    }

    &__main-image {
        position: sticky;
        top: calc(var(--section-padding) + var(--header-height) + var(--cards-offset));
        margin-top: calc(-1 * var(--card-height));
        margin-bottom: var(--card-height);

        @screen md {
            margin-top: 0;
            margin-bottom: 0;

            img {
                min-height: var(--card-height);
            }
        }
    }

    &__item {
        min-height: var(--card-height);
        position: sticky;
        border: 2px solid theme('colors.blue.100');
        top: calc(var(--section-padding) + var(--header-height) + var(--cards-offset) + var(--image-height));

        @screen md {
            top: calc(var(--section-padding) + var(--header-height) + var(--cards-offset));
        }

        &:first-child {
            margin-top: calc(-1 * var(--card-height));

            @screen md {
                margin-top: 0;
            }
        }
    }
}
</style>
