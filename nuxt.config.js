import {config as publicRuntimeConfig, secrets as privateRuntimeConfig} from './config'

export default {
  server: {
    port: publicRuntimeConfig.server.port,
    host: publicRuntimeConfig.server.host,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    './assets/scss/main.scss',
  ],
  styleResources: {
    scss: [
      './assets/scss/resources.scss',
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/utils.js',
    '~/plugins/channel-resolver.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['@nuxtjs/style-resources'],
    [
      'nuxt-i18n',
      {
        locales: ['en', 'fr'],
        defaultLocale: 'en',
        vueI18nLoader: true,
        vueI18n: {
          fallbackLocale: 'en',
          detectBrowserLanguage: {
            useCookie: true,
            // alwaysRedirect: true
          },
        }
      }
    ],
    '@nuxtjs/proxy',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  proxy: {
    ...( privateRuntimeConfig.proxy && privateRuntimeConfig.proxy.elasticsearch_api && {
      '/api/es/**': {
        target: privateRuntimeConfig.proxy.elasticsearch_api,
        pathRewrite: {'^/api/es/': ''},
        onProxyRes: function (proxyRes, req, res) {
          proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        }
      }
    } || {}),
  },
  publicRuntimeConfig: publicRuntimeConfig,
  privateRuntimeConfig: privateRuntimeConfig,
}
