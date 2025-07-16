/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                custom: '0 2px 4px rgba(85, 85, 114, 0.549)',
            },
            borderRadius: { xl4: '2rem', xl5: '2.5rem', xl6: '3rem' },
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0 },
                },
            },
            animation: {
                'blink-delay': 'blink 4s infinite 2s',
            },
        },
    },
    plugins: [],
}
