export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
        './resources/js/**/*.ts',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', 'sans-serif'],
            },
            colors: {
                'familiehjælp-blue': '#003366',
            },
            keyframes: {
                appear: {
                    "0%": {
                        opacity: "0",
                    },
                    "100%": {
                        opacity: "1",
                    },
                },
            },
            animation: {
                appear: "appear 1s ease-in-out",
            }
        }
    },
    plugins: [],
}