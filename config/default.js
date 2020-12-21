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
  },
  "payment": {
    "dalenys": {
      "sdkUrl": "https://js.sandbox.be2bill.com/hosted-fields/v2.0.0/hosted-fields.min.js",
      "key": {
        "id": "32f4103e-360f-4374-a3c3-d2fa7c4ad758",
        "value": "1*nA=Z}InNtT:LG-"
      }
    }
  }
}

export const secrets = {
  "proxy": {
    "elasticsearch_api": "http://localhost:9201"
  }
}