import vercelPrettierConfig from '@vercel/style-guide/prettier';

export default {
  ...vercelPrettierConfig,
  plugins: [...vercelPrettierConfig.plugins, 'prettier-plugin-tailwindcss'],
};
