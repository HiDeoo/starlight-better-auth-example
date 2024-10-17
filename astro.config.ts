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
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
})
