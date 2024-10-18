import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a73e8', // A modern blue shade for primary actions and highlights
        secondary: '#f0f4ff', // Light blue for backgrounds and accents
        background: '#f9fafb', // Light gray for page backgrounds to keep it subtle
        textPrimary: '#1f2937', // Dark gray for main text, easy on the eyes
        textSecondary: '#4b5563', // Medium gray for secondary text
        linkHover: '#0c47a1', // Darker shade for link hover to improve contrast
        accent: '#ff5722', // Bright accent color for calls to action
        success: '#4caf50', // Green for success messages
        warning: '#ff9800', // Orange for warnings
        error: '#f44336', // Red for errors
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], // Modern, clean font
      },
      boxShadow: {
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Subtle shadow for a modern look
      },
    },
  },
  plugins: [],
} satisfies Config;
