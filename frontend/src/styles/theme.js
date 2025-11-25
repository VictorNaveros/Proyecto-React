// src/styles/theme.js

export const theme = {
  // 🎨 COLORES
  colors: {
    // Color principal
    lime: "#d4fc79",
    
    // Azul
    blue: "#4A90E2",
    blueLight: "#6BA3E8",
    blueDark: "#3A7BC8",
    
    // Grises
    gray50: "#FAFAFA",
    gray100: "#F5F5F5",
    gray200: "#E5E5E5",
    gray300: "#D4D4D4",
    gray400: "#A3A3A3",
    gray500: "#737373",
    gray600: "#525252",
    gray700: "#404040",
    gray800: "#262626",
    gray900: "#171717",
    
    // Acentos
    orange: "#FF6B35",
    green: "#4ECDC4",
    red: "#FF004D",
    cyan: "#00D9FF",
    
    // Semánticos
    success: "#4ECDC4",
    error: "#FF004D",
    warning: "#FF6B35",
    info: "#00D9FF",
  },
  
  // 📏 ESPACIADOS
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  
  // 🔲 BORDER RADIUS
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },
  
  // 💫 SOMBRAS
  shadows: {
    soft: "0 2px 8px rgba(0, 0, 0, 0.08)",
    card: "0 4px 12px rgba(0, 0, 0, 0.1)",
    hover: "0 8px 24px rgba(0, 0, 0, 0.15)",
  },
  
  // 📝 TIPOGRAFÍA
  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
  },
  
  // ⚖️ FONT WEIGHT
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

// Exportar también como default
export default theme;