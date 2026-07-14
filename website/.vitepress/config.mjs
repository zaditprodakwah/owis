import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/owis/',
  title: "OWIS",
  description: "Open Workspace Intelligence Specification",
  cleanUrls: true,
  srcDir: '..',
  srcExclude: ['**/node_modules/**', 'website/dist/**', 'website/cache/**'],
  rewrites: {
    'README.md': 'index.md',
    'ROADMAP.md': 'roadmap.md',
    'CHANGELOG.md': 'changelog.md',
    'CONTRIBUTING.md': 'contributing.md'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Constitution', link: '/docs/00-CONSTITUTION/Project_Constitution' },
      { text: 'Specification', link: '/docs/10-SPEC/UARS' },
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
        text: 'Constitution',
        items: [
          { text: 'Project Constitution', link: '/docs/00-CONSTITUTION/Project_Constitution' }
        ]
      },
      {
        text: 'Foundation Architecture',
        items: [
          { text: 'Document Architecture (DAS)', link: '/docs/01-FOUNDATION/DAS' },
          { text: 'Core Architecture (CAS)', link: '/docs/01-FOUNDATION/CAS' },
          { text: 'Reference Architecture (RAS)', link: '/docs/01-FOUNDATION/RAS' }
        ]
      },
      {
        text: 'Core Specifications',
        items: [
          { text: 'Universal Agent Runtime (UARS)', link: '/docs/10-SPEC/UARS' },
          { text: 'Workspace Intelligence Report (WIR)', link: '/docs/10-SPEC/WIR' }
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
