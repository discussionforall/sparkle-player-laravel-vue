import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "sparkle",
  description: "The official documentation for Sparkle, the music streaming solution that works",
  head: [
    [
      'script',
      {
        defer: 'defer',
        src: 'https://app.lemonsqueezy.com/js/lemon.js'
      }
    ],
    ['link', { rel: 'icon', href: '/favicon.png', type: 'image/x-png' }]
  ],
  cleanUrls: true,
  markdown: {
    linkify: false,
    image: {
      lazyLoading: true
    }
  },
  themeConfig: {
    search: {
      provider: 'algolia',
      options: {
        appId: '2EQKL1O1UU',
        apiKey: 'e9d7b5be73f29af4030535a726ec7196',
        indexName: 'sparkle'
      }
    },

    outline: {
      level: 'deep'
    },

    logo: '/logo.svg',
    logoLink: '/guide/what-is-sparkle',

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: 'https://sparkle.dev' },
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'Sparkle Plus', link: '' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What Is Sparkle?',  link: '/guide/what-is-sparkle' },
          { text: 'Getting Started', link: '/guide/getting-started' },
        ]
      },
      {
        text: 'Usage',
        items: [
          { text: 'Music Discovery', link: '/usage/music-discovery' },
          { text: 'Streaming Music', link: '/usage/streaming' },
          { text: 'Using the Web Interface', link: '/usage/web-interface' },
          { text: 'Instant Search', link: '/usage/search' },
          { text: 'Themes', link: '/usage/themes' },
          { text: 'Artist, Album, & Playlist Arts', link: '/usage/artist-album-playlist-arts' },
          { text: 'Podcasts', link: '/usage/podcasts' },
          { text: 'User Management', link: '/usage/user-management' },
          { text: 'Profile & Preferences', link: '/usage/profile-preferences' },
          { text: 'Remote Controller', link: '/usage/remote-controller' },
        ]
      },
      {
        text: 'Sparkle Plus',
        items: [
          { text: 'What Is Sparkle Plus?', link: '' },
          { text: 'Purchase & Activation', link: '' },
          { text: 'Cloud Storage Support', link: '' },
          { text: 'Collaboration', link: '' },
          { text: 'Single Sign-On', link: '' },
          { text: 'Proxy Authentication', link: '' },
        ]
      },
      {
        text: 'Service Integrations',
        link: '/service-integrations.md'
      },
      {
        text: 'Mobile Apps',
        link: '/mobile-apps'
      },
      {
        text: 'CLI Commands',
        link: '/cli-commands'
      },
      {
        text: 'Local Development',
        link: '/development'
      },
      {
        text: 'Troubleshooting',
        link: '/troubleshooting'
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/discussionforall/sparkle-player-laravel-vue' }
    ]
  }
})
