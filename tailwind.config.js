/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
        gradientX: "gradientX 5s ease infinite", // ✅ corrected name
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      fontFamily: {
    handwritten: ['Pacifico', 'cursive'],
  },
      backgroundSize: {
        "200": "200% 200%", // ✅ allows smoother animation
      },
      colors: {
        brand: {
          DEFAULT: "#6366F1",
          light: "#A5B4FC",
          dark: "#4338CA",
        },
      },
      backdropBlur: {
        xs: '2px', // ✅ correctly nested
      },
      boxShadow: {
        card: "0 4px 14px rgba(0, 0, 0, 0.1)",
        glow: "0 0 15px rgba(255, 255, 255, 0.2)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
