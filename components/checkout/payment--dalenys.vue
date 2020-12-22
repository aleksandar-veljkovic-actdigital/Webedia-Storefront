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
      <span class="brand-container" :id="`brand-container-${rndId}`" />

      <p>
        <input
          v-model.trim="cardHolderName"
          class="payment--full-name"
          :placeholder="$t('Last name and first name')"/>
      </p>

      <p>
        <!-- Here is the card container -->
        <span class="input-container card-container" :id="`card-container-${rndId}`" />
      </p>

      <p>
        <!-- Here is the expiry container -->
        <span class="input-container expiry-container" :id="`expiry-container-${rndId}`" />
      </p>

      <p>
        <!-- Here is the cryptogram container -->
        <span class="input-container cvv-container" :id="`cvv-container-${rndId}`" />
      </p>

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
      tokens: false,
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
        console.log('xxxxxxxxx', window.document.getElementById(this.hfieldsConfig.fields.brand.id))
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
      const _this = this;

      await new Promise((resolve, reject) => {
        this.hfields.createToken(result => {
          if (result.execCode === "0000") {
            _this.tokens = {
              cardHolderName: this.cardHolderName,
              dalenysPayCardToken: result
            }
            this.clearUiUnauthorised();
          } else {
            _this.tokens = false;
          }
          resolve();
        });
      });
    },

  }
};
</script>

<style lang='scss' scoped>

</style>
