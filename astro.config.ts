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
      // TODO(HiDeoo)
      title: 'My Docs',
      // TODO(HiDeoo)
      social: {
        github: 'https://github.com/withastro/starlight',
      },
      // TODO(HiDeoo)
      sidebar: [
        { label: 'Guides', autogenerate: { directory: 'guides' } },
        { label: 'Reference', autogenerate: { directory: 'reference' } },
        { label: 'Customers', autogenerate: { directory: 'customers' } },
      ],
    }),
  ],
})
