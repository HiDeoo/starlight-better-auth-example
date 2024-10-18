import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    starlight({
      prerender: false,
      components: {
        Pagination: './src/overrides/Pagination.astro',
        Sidebar: './src/overrides/Sidebar.astro',
        ThemeSelect: './src/overrides/ThemeSelect.astro',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Guides', autogenerate: { directory: 'guides' } },
        { label: 'Reference', autogenerate: { directory: 'reference' } },
        { label: 'Customers', autogenerate: { directory: 'customers' } },
      ],
      social: {
        github: 'https://github.com/HiDeoo/starlight-better-auth-example',
      },
      title: 'Starlight x Better Auth',
    }),
  ],
})
