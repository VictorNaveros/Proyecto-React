// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // 🎨 COLORES PERSONALIZADOS DE TECHSTORE
      colors: {
        brand: {
          // Color principal - Verde limón vibrante
          lime: "#d4fc79",
          
          // Azul principal
          blue: {
            DEFAULT: "#4A90E2",
            light: "#6BA3E8",
            dark: "#3A7BC8",
          },
          
          // Escala de grises (del más claro al más oscuro)
          gray: {
            50: "#FAFAFA",
            100: "#F5F5F5",
            200: "#E5E5E5",
            300: "#D4D4D4",
            400: "#A3A3A3",
            500: "#737373",
            600: "#525252",
            700: "#404040",
            800: "#262626",
            900: "#171717",
          },
          
          // Colores de acento
          accent: {
            orange: "#FF6B35",
            green: "#4ECDC4",
            red: "#FF004D",
            cyan: "#00D9FF",
          }
        }
      },
      
      // 📝 FUENTES
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      
      // 💫 SOMBRAS PERSONALIZADAS
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'hover': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      
      // 🎭 ANIMACIONES
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  
  // Modo oscuro basado en clase
  darkMode: "class",
  
  // Plugins
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#d4fc79",
              foreground: "#000000",
            },
            secondary: {
              DEFAULT: "#4A90E2",
              foreground: "#ffffff",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#d4fc79",
              foreground: "#000000",
            },
            secondary: {
              DEFAULT: "#4A90E2",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
}