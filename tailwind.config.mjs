/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "coffee-dark": "var(--color-coffee-dark)",
        "coffee-medium": "var(--color-coffee-medium)",
        "coffee-light": "var(--color-coffee-light)",
        cream: "var(--color-cream)",
        "cream-light": "var(--color-cream-light)",
        mocha: "var(--color-mocha)",
        caramel: "var(--color-caramel)",
        "text-dark": "var(--color-text-dark)",
        "text-light": "var(--color-text-light)",
        "text-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
        "scale-1": "var(--color-scale-1)",
        "scale-2": "var(--color-scale-2)",
        "scale-3": "var(--color-scale-3)",
        "scale-4": "var(--color-scale-4)",
        "scale-5": "var(--color-scale-5)",
        selected: "var(--color-selected)",
        "selected-dark": "var(--color-selected-dark)",
      },
      boxShadow: {
        coffee: "var(--shadow-coffee)",
      },
    },
  },
  plugins: [],
};
