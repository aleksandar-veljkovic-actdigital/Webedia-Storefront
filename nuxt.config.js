import {config as publicRuntimeConfig, secrets as privateRuntimeConfig} from './config'

export default {
  server: {
    port: publicRuntimeConfig.server.port,
    host: publicRuntimeConfig.server.host,
  },
  publicRuntimeConfig: publicRuntimeConfig,
  privateRuntimeConfig: privateRuntimeConfig,
  build: {
    extend (config, ctx) {
    }
  },
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
  loading: { color: '#fff' },
  css: [
    './assets/scss/main.scss',
  ],
  plugins: [
    '~/plugins/utils.js',
    '~/plugins/api-es.js',
    '~/plugins/api-bitbag.js',
    '~/plugins/events.js',
  ],
  buildModules: [
  ],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/proxy',
    'nuxt-i18n',
  ],
  axios: {
  },
  styleResources: {
    scss: [
      './assets/scss/resources.scss',
    ]
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
  i18n: {
    locales: [
      { 
        code: 'en', 
        iso: 'en-US', /*file: 'en.js'*/ 
        esStoreCode: "en",
      },
      { 
        code: 'fr', 
        iso: 'fr-FR', /*file: 'fr.js'*/ 
        esStoreCode: "",
      },
    ],
    defaultLocale: 'fr',
    vueI18nLoader: true,
    vueI18n: {
      fallbackLocale: 'fr',
      // detectBrowserLanguage: {
      //   useCookie: true,
      //   // alwaysRedirect: true
      // },
    }
  },
}
