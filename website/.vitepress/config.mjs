import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/owis/',
  title: "OWIS",
  description: "Open Workspace Intelligence Specification",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Specification', link: '/docs/10-SPEC/CAS' },
      { text: 'Roadmap', link: '/roadmap' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is OWIS?', link: '/' },
          { text: 'Roadmap', link: '/roadmap' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Contributing', link: '/contributing' }
        ]
      },
      {
        text: 'Specifications',
        items: [
          { text: 'Core Architecture (CAS)', link: '/docs/10-SPEC/CAS' },
          { text: 'Document Architecture (DAS)', link: '/docs/10-SPEC/DAS' },
          { text: 'Reference Architecture (RAS)', link: '/docs/10-SPEC/RAS' },
          { text: 'Universal Agent Runtime (UARS)', link: '/docs/10-SPEC/UARS' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zaditprodakwah/owis' }
    ],

    search: {
      provider: 'local'
    }
  }
})
