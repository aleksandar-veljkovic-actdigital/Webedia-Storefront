export const config = {
  "server": {
    "port": 3003,
    "host": '0.0.0.0'
  },
  "sylius": {
    "api": "http://plab.en/shop-api",
    "bitbag_api": "https://staging-plab-bo.webedia.shop/vsbridge/api",
  },
  "elasticsearch": {
    "api": "http://0.0.0.0:3003/api/es"
  }
}

export const secrets = {
  "proxy": {
    "elasticsearch_api": "http://localhost:9201"
  }
}