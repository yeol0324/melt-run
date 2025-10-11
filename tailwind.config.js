module.exports = {
  content: ["index.html", "src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".pixelated": { imageRendering: "pixelated" },
        ".no-aa": {
          "-webkit-font-smoothing": "none",
          "-moz-osx-font-smoothing": "grayscale",
        },
      });
    },
  ],
};
