/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        surface: "#18181b",
        "surface-card": "#27272a",
        "surface-elevated": "#3f3f46",
        primary: "#13ec6a",
        "primary-hover": "#0fd65f",
        sapphire: "#2563eb",
        "sapphire-light": "#3b82f6",
        "text-primary": "#fafafa",
        "text-secondary": "#a1a1aa",
        "text-muted": "#71717a",
        "border-subtle": "#27272a",
        "danger-soft": "rgba(239, 68, 68, 0.2)",
      },
      fontFamily: {
        display: ["IBM Plex Sans", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.7s ease-out forwards",
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        "fade-in-left": "fadeInLeft 0.7s ease-out forwards",
        "fade-in-right": "fadeInRight 0.7s ease-out forwards",
        "counter-glow": "counterGlow 2s ease-in-out",
        sheen: "sheen 0.42s ease-in-out",
        "lock-pulse": "lockPulse 2s ease-in-out infinite",
        ribbon: "ribbon 0.9s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          from: { opacity: "0", transform: "translateX(-40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          from: { opacity: "0", transform: "translateX(40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        counterGlow: {
          "0%": { textShadow: "0 0 0px rgba(19, 236, 106, 0)" },
          "50%": { textShadow: "0 0 20px rgba(19, 236, 106, 0.5)" },
          "100%": { textShadow: "0 0 0px rgba(19, 236, 106, 0)" },
        },
        sheen: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        lockPulse: {
          "0%, 100%": { filter: "drop-shadow(0 0 2px rgba(37, 99, 235, 0.3))" },
          "50%": { filter: "drop-shadow(0 0 8px rgba(37, 99, 235, 0.6))" },
        },
        ribbon: {
          "0%": { transform: "scaleX(0)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "scaleX(1)", opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};
