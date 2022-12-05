/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],

    theme: {
        boxShadow: {
            '3xl': '0px 0x 0px 0px 0px 0px #000000',
            '4xl': '0px -6px 0px 0px 0px 0px #000000',
            'product': '-5px 5px 0px 2px #17BEBB',
        },
        extend: {
            colors: {
                primary: '#F4B942',
                secondary: '#17BEBB',
                tertiary: '#2E282A',
            },
            fontFamily: {
                sans: ['Archivo Black', 'sans-serif'],
                heading: ['Archivo Black', 'sans-serif'],
            },
        },
        plugins: [],
    },
};
