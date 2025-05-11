<template>
    <button class="wr-home-intro-play relative overflow-hidden" @click="$emit('click')">
        <video src="/home-intro-video.mp4" poster="/img/home-intro-video-poster.jpg" class="absolute inset-0" muted autoplay loop playsinline></video>
        <span class="relative">
            {{ $t('play') }}
        </span>
    </button>
</template>

<script>
export default defineNuxtComponent({
    name: 'WrHomeIntroPlay',

    emits: ['click'],
})
</script>

<style lang="postcss">
.wr-home-intro-play {
    @apply bg-blue-500;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 8.75rem;
    height: 8.75rem;
    border-radius: 50%;

    @screen lg {
        width: 12rem;
        height: 12rem;
    }

    span {
        @apply bg-white text-dark;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 50%;
        aspect-ratio: 1;
        padding: 1rem;

        font-size: 0.875rem;
        font-weight: 400;
        letter-spacing: 0;
        text-transform: uppercase;

        transition: transform 0.5s;

        &:before {
            @apply bg-white bg-opacity-25;

            content: '';
            display: block;
            border-radius: 50%;
            width: calc(100% + 1rem);
            height: calc(100% + 1rem);

            position: absolute;
            top: -0.5rem;
            left: -0.5rem;

            transition: transform 0.5s;
        }
    }

    /* video {
        opacity: 0.8;
        transition: opacity 0.5s;
    } */

    &:hover span {
        transform: scale(1.2);
        transition: transform 0.3s;
    }

    &:hover span::before {
        transform: scale(1.2);
        transition: 0.4s transform 0.1s;
    }

    /* &:hover video {
        opacity: 1;
    } */
}
</style>
