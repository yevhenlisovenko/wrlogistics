/** @type {import('tailwindcss').Config} */
export default {
    content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './app.vue', './error.vue'],

    theme: {
        colors: {
            white: '#fff',
            dark: '#08112C',
            transparent: 'rgba(255,255,255,0)',
            gray: {
                300: '#E2E8F0',
                400: '#D1D6E4',
                500: '#798095',
            },
            blue: {
                100: '#F0F5FC',
                200: '#E2E8F0',
                300: '#C7CDE0',
                500: '#2483D6',
                700: '#195999'
            },
            red: {
                500: '#FF5252'
            }
        },

        extend: {
            // fontFamily: {
            //     sans: ['Inter']
            // },
        }
    },

    plugins: []
}
