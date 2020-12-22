<template>
  <div class="c--checkout--payment--dalenys">
    <client-only>
    <form
      method="post"
      action="#"
      id="cart"
      name="be2billForm"
      @submit.prevent="tokenizeHandlerSubmitDetails"
    >
      <div>
        <span class="input-container brand-container" :id="`brand-container-${rndId}`" />
      </div>

      <div>
        <span class="input-container name-container">
          <div class="iframe">
            <input
              v-model.trim="cardHolderName"
              class="payment--full-name"
              :placeholder="$t('Last name and first name')"/>
          </div>
        </span>
      </div>

      <div>
        <!-- Here is the card container -->
        <span class="input-container card-container" :id="`card-container-${rndId}`" />
      </div>

      <div>
        <!-- Here is the expiry container -->
        <span class="input-container expiry-container" :id="`expiry-container-${rndId}`" />
      </div>

      <div>
        <!-- Here is the cryptogram container -->
        <span class="input-container cvv-container" :id="`cvv-container-${rndId}`" />
      </div>

    </form>
    </client-only>
  </div>
</template>

<script>

// import { required, minLength } from "vuelidate/lib/validators";

export default {

  data() {
    const storeView = this.$i18n.locale;
    const rnd = Math.floor(Math.random() * 10000000);
    // Define some style properties to apply on hosted-fields inputs
    const style = {
      input: {
        "font-size": "18px",
        "line-height": "47px",
        color: "#737373",
        "font-family": "Times New Roman"
      },
      "::placeholder": {
        "font-size": "1em",
        color: "#737373"
      }
    };
    // Initialize the hosted-fields library
    const hfieldsConfig = {
      // SDK api key
      key: {
        id: this.$config.payment.dalenys.key.id,
        value: this.$config.payment.dalenys.key.value
      },
      // Manages each hosted-field container
      fields: {
        brand: {
          id: `brand-container-${rnd}`,
          style: style,
        },
        card: {
          id: `card-container-${rnd}`,
          placeholder: "Numéro de la carte",
          enableAutospacing: true,
          style: style,
        },
        expiry: {
          id: `expiry-container-${rnd}`,
          placeholder: "Date d'expiration (MM/AA)",
          style: style,
        },
        cryptogram: {
          id: `cvv-container-${rnd}`,
          placeholder: "Cryptogramme",
          style: style,
        }
      }
    };
    return {
      rndId: `${rnd}`,
      hfieldsConfig: hfieldsConfig,
      hfields: false,
      cardHolderName: "",
    };
  },

  mounted () {
    if (!window.document.getElementById('dalenys-script')) {
      const script = window.document.createElement('script');
      script.onload = () => {
        this.initDalenys()
      }
      script.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(script);
      script.src = this.$config.payment.dalenys.sdkUrl;
      script.id = "dalenys-script";
    }
    else {
      this.initDalenys()
    }
  },

  beforeDestroy() {
    this.hfields.dispose();
  },

  methods: {

    initDalenys () {
      this.$nextTick(() => {
        try {
          this.hfields = window["dalenys"].hostedFields(this.hfieldsConfig);
          this.hfields.load();
        }
        catch(err) {
          console.error("dalenys fail to init", err)
        }
      })

    },

    async tokenizeDalenys () {
      return new Promise((resolve, reject) => {
        this.hfields.createToken(result => {
          if (result.execCode === "0000") {
            const tokens = {
              cardHolderName: this.cardHolderName,
              dalenysPayCardToken: result
            }
            resolve(tokens)
          } else {
            resolve(false)
          }
        });
      });
    },

  }
};
</script>

<style lang='scss'>
.c--checkout--payment--dalenys {
  .input-container {
    display: block;
    height: 55px;
    width: 500px;
    outline: 1px solid gray;
    margin: 4px;
    padding: 4px;
    &.hosted-fields-invalid-state {
      outline: 1px solid red;
    }
  }
  .brand-container {
      width: 76px;
      // float: right;
  }
  .name-container {

    input {
      font-size: 18px;
      line-height: 47px;
      color: #737373;
      font-family: "Times New Roman";
      border: 0px solid transparent;
      display: inline-block;
      width: 100%;
    }
    input::placeholder {
      font-size: 1em;
      color: #737373;
    }
    .iframe {
      position: relative;
    }
  }
}
</style>
