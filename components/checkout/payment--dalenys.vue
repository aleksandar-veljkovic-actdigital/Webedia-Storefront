<template>
  <div class="p-w-d">
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

  mounted() {
    this.clearUiUnauthorised();
    // this.hfields = window["dalenys"].hostedFields(this.hfieldsConfig);
    // this.hfields.load();
  },

  beforeDestroy() {
    // this.hfields.dispose();
  },

  methods: {
    async tokenizeDalenys() {
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

    clearUiUnauthorised() {
      // window["document"]
      //   .querySelector(".payment-methods-group")
      //   .classList.remove("unauthorised");
    }
  }
};
</script>

<style lang='scss' scoped>

</style>
