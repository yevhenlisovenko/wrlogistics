<template>
    <span class="wr-menu-toggler" :class="{ 'wr-menu-toggler--close': isOpenedMobileMenu }"></span>
</template>

<script>
export default defineNuxtComponent({
    name: 'WrMobileMenuToggler',

    props: {
        isOpenedMobileMenu: Boolean
    }
})
</script>

<style lang="postcss">
.wr-menu-toggler {
    --bar-width: 20px;
    --bar-height: 2px;
    --bar-spacing: 5px;

    display: block;
    position: relative;
    transition: background-color 0ms 300ms;

    &,
    &:after,
    &:before {
        width: var(--bar-width);
        height: var(--bar-height);
        background-color: theme('colors.blue.500');
    }

    &:before {
        content: '';
        position: absolute;
        left: 0;
        bottom: var(--bar-spacing);
        transition: bottom 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    &:after {
        content: '';
        position: absolute;
        left: 0;
        top: var(--bar-spacing);
        transition: top 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    &--close {
        background-color: theme('colors.blue.500/0');

        &:after {
            top: 0;
            transform: rotate(45deg);
            transition: top 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        &:before {
            bottom: 0;
            transform: rotate(-45deg);
            transition: bottom 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
        }
    }
}
</style>
