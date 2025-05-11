<template>
    <section id="contacts" class="section bg-white overflow-hidden">
        <div class="container relative" aria-hidden="true">
            <WrPattern class="hidden lg:block absolute top-[6rem] left-[3rem]" :rotate="30" lines="left,top" />

            <WrPattern class="hidden lg:block absolute top-0 right-[3rem]" />
        </div>

        <div class="container container--md">
            <WrHeading :tag="titleTag" :uppercase="titleUppercase" class="text-center">
                <slot name="title" mdc-unwrap="p">{{ $t('contact_us') }}</slot>
                <template v-if="$slots.subtitle" #subtitle>
                    <slot name="subtitle" mdc-unwrap="p"></slot>
                </template>
            </WrHeading>

            <form
                ref="form"
                action="https://n8n.awescode.com/webhook/wr-logistics/contact"
                method="POST"
                class="bg-blue-100 px-4 py-6 md:p-10 lg:px-24 lg:py-16 mt-8 md:mt-12 lg:mt-16 rounded-md md:rounded-2xl"
                :class="{ 'js-animation-hidden': !isAnimationReady }"
                @submit.prevent="submit"
            >
                <div ref="success" style="display: none" class="flex flex-col items-center justify-center">
                    <div class="text-3xl lg:text-4xl text-dark font-medium text-center text-balance mb-8 lg:mb-12">
                        {{ $t('thank_you') }}
                    </div>

                    <WrButton to="/" class="w-full md:w-auto md:mx-auto">{{ $t('homepage') }}</WrButton>
                </div>

                <div ref="content">
                    <h3 v-if="$slots.form_title" class="text-3xl lg:text-4xl text-dark font-medium text-center text-balance mb-8 lg:mb-12">
                        <slot name="form_title" mdc-unwrap="p"></slot>
                    </h3>

                    <div class="grid gap-6 md:grid-cols-2">
                        <WrInput
                            v-model="form.first_name"
                            v-model:error="errors.first_name"
                            :label="$t('first_name')"
                            :disabled="loading"
                            name="first_name"
                            autocomlete="given-name"
                            required
                        />

                        <WrInput
                            v-model="form.last_name"
                            v-model:error="errors.last_name"
                            :label="$t('last_name')"
                            :disabled="loading"
                            name="last_name"
                            autocomplete="family-name"
                            required
                        />

                        <WrInput
                            v-model="form.email"
                            v-model:error="errors.email"
                            :label="$t('email')"
                            :disabled="loading"
                            class="md:col-span-2"
                            name="email"
                            autocomplete="email"
                            type="email"
                            required
                        />

                        <WrInput
                            v-model="form.company_name"
                            v-model:error="errors.company_name"
                            :label="$t('company_name')"
                            :disabled="loading"
                            name="company_name"
                            class="md:col-span-2"
                        />

                        <WrInput
                            v-model="form.message"
                            v-model:error="errors.message"
                            :label="$t('message')"
                            :disabled="loading"
                            name="message"
                            class="md:col-span-2"
                            type="textarea"
                        />

                        <div class="flex md:col-span-2">
                            <WrButton type="submit" class="w-full md:w-auto md:mx-auto" :disabled="loading">{{ $t('submit') }}</WrButton>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import { animate, createTimeline, utils } from 'animejs'
import animateMixin from '~/mixins/animate'

export default defineNuxtComponent({
    name: 'WrContactForm',

    mixins: [animateMixin],

    props: {
        titleTag: {
            type: String,
            default: 'h2'
        },

        titleUppercase: Boolean
    },

    data() {
        return {
            form: {
                first_name: '',
                last_name: '',
                email: '',
                company_name: '',
                message: ''
            },
            loading: false,
            errors: {}
        }
    },

    methods: {
        initAnimation() {
            const el = this.$refs.form

            if (!el) {
                this.isAnimationReady = true
                return
            }

            utils.set(el, { opacity: 0, y: 20 })

            this.animation = animate(el, {
                opacity: 1,
                y: 0,
                duration: 800,
                delay: 500,
                ease: 'outQuart',
                onBegin: () => (this.isAnimationReady = true)
            })
        },

        async submit() {
            const form = this.$refs.form

            try {
                this.loading = true

                const response = await fetch(form.action, {
                    method: form.method,
                    body: JSON.stringify(this.form),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data = await response.json()

                this.animateSuccess()

                console.log(data)
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },

        animateSuccess() {
            const { content, success } = this.$refs

            utils.set(success, { opacity: 0, position: 'absolute', display: 'flex' })

            const successHeight = success.scrollHeight

            utils.set(success, { height: 0, position: 'static' })

            const timeline = createTimeline()

            document.querySelector('#contacts').scrollIntoView({ behavior: 'smooth', block: 'start' })

            timeline.add(content, {
                opacity: 0,
                height: { to: 0, duration: 800 },
                duration: 300,
                ease: 'outQuad',
                onComplete: () => {
                    this.$refs.form.reset()
                }
            })

            timeline.add(
                success,
                {
                    height: successHeight,
                    duration: 400,
                    opacity: { to: 1, delay: 400, duration: 500 },
                    ease: 'inQuad'
                },
                0
            )
        }
    }
})
</script>
