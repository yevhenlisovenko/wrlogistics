<template>
    <span class="wr-globe-pin" :style="{ top: `${top}%`, left: `${left}%`, zIndex: z }">
        <span class="hidden md:inline">
            <slot></slot>
        </span>
        <NuxtIcon name="wr:map-marker" class="w-2.5 h-2.5 md:hidden" />
    </span>
</template>

<script>
export default defineNuxtComponent({
    name: 'WrGlobePin',

    props: {
        top: {
            type: Number,
            default: 50
        },

        left: {
            type: Number,
            default: 50
        },

        z: {
            type: Number,
            default: 1
        }
    }
})
</script>

<style lang="postcss">
.wr-globe-pin {
    @apply bg-dark text-white border-blue-500 border-opacity-25;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.25rem;
    height: 1.25rem;

    border-radius: 50%;
    border-width: 1.5px;
    background-clip: padding-box;

    position: absolute;
    transform: translate(-50%, -0.75rem);

    @screen md {
        width: auto;
        min-width: 4rem;
        height: 2rem;
        padding: 0.5rem 0.75rem;
        border-radius: 1rem;

        font-size: 0.75rem;
        text-align: center;

        transform: translate(-50%, -100%);

        &:after {
            @apply border-dark;

            content: '';
            border-top-width: 10px;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 0;

            position: absolute;
            top: 100%;
            left: 50%;
            transform: translate(-50%, -4px);
        }
    }
}
</style>
