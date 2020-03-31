module.exports = {
    theme: {
        extend: {
            screens: {
                dark: { raw: "(prefers-color-scheme: dark)" },
            },
        },
    },
    plugins: [require("@tailwindcss/ui")],
};
