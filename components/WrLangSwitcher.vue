<template>
    <span class="inline-flex relative">
        <button class="flex items-center gap-1 text-dark py-3" @click="isOpened = !isOpened">
            {{ locale.short_name }}
            <NuxtIcon ref="caret" name="wr:caret" mode="svg" class="block w-3 h-3 fill-dark" />
        </button>

        <span ref="dropdown" class="hidden flex-col absolute right-0 top-full bg-white border border-blue-200 rounded-lg overflow-hidden origin-top">
            <NuxtLink
                v-for="(locale, index) in locales"
                :to="localePath($route.path, locale.code)"
                :key="locale.code"
                class="px-6 py-3 hover:bg-blue-100 hover:text-dark transition"
                :class="{ 'border-t border-blue-200': index > 0 }"
                @click="isOpened = false"
            >
                {{ locale.name }}
            </NuxtLink>
        </span>
    </span>
</template>

<script>
import { createTimeline, utils } from 'animejs'

export default {
    name: 'WrLangSwitcher',

    data() {
        return {
            isOpened: false
        }
    },

    setup() {
        const { locale, locales } = useI18n()
        const localePath = useLocalePath()

        return {
            locale: computed(() => {
                return locales.value.find((l) => l.code === locale.value)
            }),
            locales,
            localePath,
            timeline: null
        }
    },

    watch: {
        isOpened(isOpened) {
            if (isOpened) {
                this.showDropdown()
                this.listenOutsideClicks()
            } else {
                this.hideDropdown()
                this.removeOutsideClicks()
            }
        }
    },

    beforeUnmount() {
        this.removeOutsideClicks()

        if (this.timeline) {
            this.timeline.cancel()
            this.timeline = null
        }
    },

    methods: {
        showDropdown() {
            if (this.timeline) {
                this.timeline.cancel()
            } else {
                utils.set(this.$refs.dropdown, {
                    opacity: 0,
                    scaleY: 0.9,
                    display: 'flex'
                })
            }

            const timeline = createTimeline({
                onComplete: () => {
                    timeline.cancel()
                    this.timeline = null
                }
            })

            timeline.add(
                this.$refs.dropdown,
                {
                    opacity: 1,
                    scaleY: 1,
                    ease: 'outQuad',
                    duration: 200
                },
                0
            )

            timeline.add(
                this.$refs.caret.$el,
                {
                    rotate: -180,
                    ease: 'outQuad',
                    duration: 200
                },
                0
            )

            this.timeline = timeline
        },

        hideDropdown() {
            if (this.timeline) {
                this.timeline.cancel()
            }
            const timeline = createTimeline({
                onComplete: () => {
                    timeline.cancel()
                    this.timeline = null
                    utils.set(this.$refs.dropdown, {
                        display: 'none'
                    })
                }
            })

            timeline.add(
                this.$refs.dropdown,
                {
                    opacity: 0,
                    scaleY: 0.97,
                    ease: 'inQuad',
                    duration: 170
                },
                0
            )

            timeline.add(
                this.$refs.caret.$el,
                {
                    rotate: 0,
                    ease: 'inQuad',
                    duration: 170
                },
                0
            )

            this.timeline = timeline
        },

        listenOutsideClicks() {
            document.addEventListener('click', this.handleClickOutside)
        },

        removeOutsideClicks() {
            document.removeEventListener('click', this.handleClickOutside)
        },

        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpened = false
            }
        }
    }
}
</script>
