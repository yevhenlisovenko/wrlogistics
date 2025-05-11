<template>
    <div class="hidden bg-dark/50 fixed inset-0 w-full h-full z-[19] pt-16 lg:pt-24" @click.self="$emit('update:modelValue', null)">
        <div class="bg-white border-t border-gray-300 rounded-b-2xl">
            <div ref="container" class="relative overflow-hidden">
                <div ref="sections" class="origin-top w-full" style="display: none" v-for="section in menu" :key="section.name">
                    <div class="container flex">
                        <div class="hidden py-12 pr-28 border-r border-gray-300 xl:block w-[32rem] flex-none">
                            <NuxtImg v-if="section.image" :src="section.image" width="390" height="235" class="object-cover rounded-xl" />
                            <div class="text-dark text-3xl font-medium mt-6">{{ $t(section.title) }}</div>
                            <div class="mt-3">{{ $t(section.description) }}</div>
                        </div>

                        <div class="flex-grow grid py-12 px-28 xl:pr-0" :class="section.columns.length === 1 ? 'grid-cols-1' : 'gap-12 grid-cols-2'">
                            <div v-for="column in section.columns" :key="column.name">
                                <div class="text-dark text-3xl font-medium">{{ $t(column.name) }}</div>

                                <div class="mt-6" :class="{ 'columns-2': section.columns.length === 1 }">
                                    <NuxtLink
                                        v-for="item in column.items"
                                        :key="item.name"
                                        :to="localePath(item.href)"
                                        class="block mb-4 hover:text-dark transition"
                                        >{{ $t(item.name) }}</NuxtLink
                                    >
                                </div>

                                <div v-if="column.more" class="mt-8">
                                    <NuxtLink :to="localePath(column.more.href)" class="text-blue-500 hover:text-blue-700 transition">
                                        {{ $t(column.more.name || 'learn_more') }}
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useLenis } from 'lenis/vue'
import { animate, createTimeline, stagger, utils } from 'animejs'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'

export default defineNuxtComponent({
    name: 'WrMegaMenu',

    props: {
        modelValue: {
            type: Number,
            default: null
        },

        menu: {
            type: Array,
            required: true
        }
    },

    emits: ['update:modelValue'],

    setup(props, { emit }) {
        const router = useRouter()
        const lenis = useLenis()

        router.beforeEach((to, from) => {
            if (to.path !== from.path) {
                emit('update:modelValue', null)
            }
        })

        return {
            lenis,
            animation: null
        }
    },

    watch: {
        modelValue(newValue, oldValue) {
            if (newValue === null) {
                this.lenis?.start()
                enableBodyScroll(this.$el)
                document.body.classList.remove('js-scroll-disabled')
                this.getAnimation().reverse()
            } else {
                if (oldValue === null) {
                    this.lenis?.stop()
                    window.scrollTo(0, 0, { behavior: 'instant' })
                    disableBodyScroll(this.$el)
                    document.body.classList.add('js-scroll-disabled')
                    this.getAnimation().play()
                } else {
                    this.animateTransition(newValue, oldValue)
                }
            }
        }
    },

    methods: {
        getAnimation() {
            if (!this.animation) {
                this.animation = animate(this.$el, {
                    opacity: [0, 1],
                    ease: 'inOutQuad',
                    duration: 500,
                    autoplay: false,
                    onBegin: (self) => {
                        if (this.modelValue !== null) {
                            self.stretch(500)

                            utils.set(this.$el, {
                                display: 'block',
                                opacity: 0
                            })
                            utils.set(this.$refs.sections[this.modelValue], {
                                display: 'flex',
                                opacity: 0,
                                y: -20
                            })
                        } else {
                            self.stretch(200)

                            utils.remove(this.$refs.sections[this.modelValue])
                        }
                    },
                    onComplete: (self) => {
                        if (this.modelValue === null) {
                            utils.set(this.$el, {
                                display: 'none'
                            })
                            utils.set(this.$refs.sections, {
                                display: 'none'
                            })
                        } else {
                            animate(this.$refs.sections[this.modelValue], {
                                opacity: 1,
                                y: 0,
                                duration: 300,
                                ease: 'outCirc'
                            })
                        }
                    }
                })
            }

            return this.animation
        },

        animateTransition(newIndex, oldIndex) {
            utils.remove(this.$refs.sections)

            utils.set(this.$refs.container, {
                height: `${this.$refs.sections[oldIndex].offsetHeight}px`
            })

            utils.set(this.$refs.sections[oldIndex], {
                position: 'absolute',
                top: 0
            })

            utils.set(this.$refs.sections[newIndex], {
                opacity: 0,
                position: 'static',
                display: 'flex'
            })

            createTimeline({
                onComplete: () => {
                    utils.set(this.$refs.container, {
                        height: 'auto'
                    })
                    utils.set(this.$refs.sections[oldIndex], { display: 'none', position: 'static' })
                }
            })
                .add(this.$refs.container, {
                    height: `${this.$refs.sections[newIndex].offsetHeight}px`,
                    duration: 300,
                    ease: 'outCirc'
                })
                .add(
                    this.$refs.sections[oldIndex],
                    {
                        opacity: 0,
                        duration: 300,
                        ease: 'outCirc'
                    },
                    150
                )
                .add(
                    this.$refs.sections[newIndex],
                    {
                        opacity: 1,
                        duration: 400,
                        ease: 'outCirc'
                    },
                    '-=100'
                )
        }
    }
})
</script>
