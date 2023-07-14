export default defineAppConfig({
  docus: {
    title: 'Javascript Cheatsheet',
    description: 'The best place to start your documentation.',
    image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',

    socials: {
      twitter: '',
      github: 'https://github.com/wilfredinni/javascript-cheatsheet',
      nuxt: {
        label: 'Nuxt',
        icon: 'simple-icons:nuxtdotjs',
        href: 'https://nuxt.com'
      }
    },

    github: {
      dir: '',
      branch: 'master',
      repo: 'javascript-cheatsheet',
      owner: 'wilfredinni',
      edit: true
    },

    aside: {
      level: 0,
      collapsed: false,
      exclude: []
    },

    main: {
      padded: true,
      fluid: true
    },

    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true,
      title: 'Javascript Cheatsheet'
    },

    titleTemplate: '%s · Javascript Cheatsheet'
  }
})