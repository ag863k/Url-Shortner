/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(135deg, #10b981 0%, #059669 25%, #047857 50%, #065f46 75%, #064e3b 100%)",
        "custom-gradient-2": "linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)",
        "card-gradient": "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
      },
      colors: {
        navbarColor: "#ffffff",
        btnColor: "#059669",
        linkColor: "#10b981",
      },
      boxShadow: {
        custom: "0 0 15px rgba(0, 0, 0, 0.3)",
        right: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat"],
      },
    },
  },

  variants: {
    extend: {
      backgroundImage: ["responsive"],
    },
  },

  plugins: [],
};