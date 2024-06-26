import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';
import tailwindBgPatternsPlugin from 'tailwindcss-bg-patterns';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      textStrokeWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '5': '5px',
        '6': '6px',
        '7': '7px',
        '8': '8px',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }: PluginAPI) {
      const textStrokeWidths = theme('textStrokeWidth');
      if (!textStrokeWidths) return;
      const newUtilities = Object.keys(textStrokeWidths).map((key) => ({
        [`.font-outline-${key}`]: {
          '-webkit-text-stroke': `${textStrokeWidths[key]} black`,
          'paint-order': 'stroke fill',
        },
      }));
      addUtilities(newUtilities, {
        respectPrefix: true,
        respectImportant: true,
      });
    },
    tailwindBgPatternsPlugin,
  ],
} satisfies Config;
