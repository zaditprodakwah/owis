import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/owis/',
  title: "OWIS",
  description: "Open Workspace Intelligence Specification",
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'OWIS' }],
    ['meta', { property: 'og:description', content: 'Open Workspace Intelligence Specification' }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:title', content: 'OWIS' }],
    ['meta', { property: 'twitter:description', content: 'Open Workspace Intelligence Specification' }]
  ],
  srcDir: '..',
  srcExclude: ['**/node_modules/**', 'website/dist/**', 'website/cache/**'],
  sitemap: {
    hostname: 'https://zaditprodakwah.github.io/owis/'
  },
  rewrites: {
    'README.md': 'index.md',
    'GETTING_STARTED.md': 'getting_started.md',
    'ROADMAP.md': 'roadmap.md',
    'CHANGELOG.md': 'changelog.md',
    'CONTRIBUTING.md': 'contributing.md',
    'CODE_OF_CONDUCT.md': 'code_of_conduct.md',
    'LICENSE.md': 'license.md'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    editLink: {
      pattern: 'https://github.com/zaditprodakwah/owis/edit/main/:path',
      text: 'Edit this page on GitHub'
    },
    lastUpdated: {
      text: 'Last Updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'medium'
      }
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting_started' },
      { text: 'Constitution', link: '/docs/00-CONSTITUTION/Project_Constitution' },
      { text: 'Specification', link: '/docs/10-SPEC/UARS' },
      { text: 'Roadmap', link: '/roadmap' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is OWIS?', link: '/' },
          { text: 'Getting Started', link: '/getting_started' },
          { text: 'Roadmap', link: '/roadmap' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'Code of Conduct', link: '/code_of_conduct' }
        ]
      },
      {
        text: 'Constitution',
        items: [
          { text: 'Project Constitution', link: '/docs/00-CONSTITUTION/Project_Constitution' },
          { text: 'Documentation Governance', link: '/docs/00-CONSTITUTION/DOCUMENTATION_GOVERNANCE' },
          { text: 'Release Governance', link: '/docs/00-CONSTITUTION/RELEASE_GOVERNANCE' },
          { text: 'Architecture Index', link: '/docs/00-CONSTITUTION/ARCHITECTURE_INDEX' }
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
      },
      {
        text: 'Schemas',
        items: [
          { text: 'Specification Schemas', link: '/docs/20-SCHEMA/' }
        ]
      },
      {
        text: 'Runtime',
        items: [
          { text: 'Reference Runtime', link: '/docs/30-RUNTIME/' }
        ]
      },
      {
        text: 'Tooling',
        items: [
          { text: 'CLI Tooling', link: '/docs/40-CLI/' }
        ]
      },
      {
        text: 'SDK',
        items: [
          { text: 'SDK Integration', link: '/docs/50-SDK/' }
        ]
      },
      {
        text: 'Registry',
        items: [
          { text: 'Registry Catalog', link: '/docs/60-REGISTRY/' }
        ]
      },
      {
        text: 'Certification',
        items: [
          { text: 'Agent Certification', link: '/docs/70-CERTIFICATION/' }
        ]
      },
      {
        text: 'Governance',
        items: [
          { text: 'License', link: '/license' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zaditprodakwah/owis' }
    ],

    footer: {
      message: 'OWIS Specification v0.2.0-rc.1 | Documentation v0.2.0-rc.1 | Released under the MIT License.',
      copyright: 'Copyright © 2026-present OWIS Project Contributors & Zadit Prodakwah'
    },

    search: {
      provider: 'local'
    }
  }
})
