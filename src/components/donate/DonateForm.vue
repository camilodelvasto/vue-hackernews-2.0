<template>
  <form>
    <div class="columns boxes-wrapper is-multiline">
      <div class="amount-box column is-4 is-6-mobile" v-for="box in boxes" v-if="!givingLevels">
        <div
          class="amount-box__inner"
          :class="{'selected': box === donation.amount && !donation.isCustomAmount}"
          @click="selectAmount(box)">
          {{box | usd}}
        </div>
      </div>
      <div class="amount-box amount-box-giving-levels column is-6 is-6-mobile" v-for="level in givingLevels" v-if="givingLevels">
        <div
          class="amount-box__inner"
          :class="{'selected': level.amount === donation.amount && !donation.isCustomAmount}"
          @click="selectAmount(level.amount); donation.givingLevel = level">
          <p>{{level.amount | usd}}</p>
          <p class="small-text">{{level.tagline}}</p>
        </div>
      </div>
    </div>
    <div class="columns form-column__wrapper form-column__extra-padded input-line custom-amount-wrapper">
      <div class="column is-5 form-column__label-column input-label">
        <label class="label">
          <input class="pad-right" type="checkbox" v-model="donation.isCustomAmount">
          Other amount:
        </label>
      </div>
      <div class="column is-3 form-column__input-column">
        <div class="control input-wrapper">
          <Icons icon="usd" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
          <input class="input custom-amount-input" type="number" name="amount" :placeholder="donation.customAmount" v-model="donation.customAmount" :disabled="!donation.isCustomAmount">
        </div>
      </div>
    </div>
    <div class="columns form-column__wrapper form-column__extra-padded input-line">
      <div class="column is-2 form-column__input-column frequency">
        <div class="control">
          <label class="radio">
            <input type="radio" name="freq" v-model="donation.frequency" value="once">
            Once
          </label>
          <label class="radio">
            <input type="radio" name="freq" v-model="donation.frequency" value="monthly">
            Monthly
          </label>
          <label class="radio">
            <input type="radio" name="freq" v-model="donation.frequency" value="annually">
            Annually
          </label>
        </div>
      </div>
    </div>
    <div class="centered is-gift-wrapper">
      <label class="checkbox">
        <input type="checkbox" v-model="donation.isGift">
          This is a gift or in tribute to somebody ($30 minimum)
      </label>
    </div>
    <div class="centered is-gift-wrapper">
      <label class="checkbox">
        <input type="checkbox" v-model="donation.isAnonymous">
          Make donation anonymously
      </label>
    </div>
    <div class="billing-info" v-if="!loggedIn">
      <h2><span>Billing info</span> <span class="login-link"><a>log in to use stored info</a></span></h2>
      <div class="columns form-column__wrapper form-column__extra-padded input-line email-input-wrapper">
        <div class="column is-5 form-column__label-column input-label"><label class="label">Email (for the receipt):</label></div>
        <div class="column is-5 form-column__input-column">
          <div class="control input-wrapper">
            <Icons icon="email" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
            <input class="input" type="text" name="action" placeholder="Enter your email" v-model="donation.email">
          </div>
        </div>
      </div>
      <DonateBillingMethod
        :payment="donation.paymentMethod"
        v-on:input:method="donation.paymentMethod.method = $event"
        v-on:input:name="donation.paymentMethod.nameOnCard = $event"
        v-on:input:card="donation.paymentMethod.cardNumber = $event"
        v-on:input:month="donation.paymentMethod.expirationMonth = $event"
        v-on:input:year="donation.paymentMethod.expirationYear = $event"
        v-on:input:code="donation.paymentMethod.securityCode = $event"
        v-on:input:save="donation.paymentMethod.savePaymentMethod = $event"
      />
      <div
        v-if="!loggedIn && donation.paymentMethod.savePaymentMethod"
      >
        <p class="centered instructions" >Create a password so you can access this payment method in the future.<br>Your email address will be your account ID.</p>
        <div class="columns form-column__wrapper form-column__extra-padded input-line password-input-wrapper">
          <div class="column is-5 form-column__label-column input-label"><label class="label">Password:</label></div>
          <div class="column is-5 form-column__input-column">
            <div class="control input-wrapper">
              <Icons icon="lock" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
              <input class="input" type="password" name="action" placeholder="password" v-model="donation.password">
            </div>
          </div>
        </div>
        <div class="columns form-column__wrapper form-column__extra-padded input-line password-input-wrapper">
          <div class="column is-5 form-column__label-column input-label"><label class="label">Password confirmation:</label></div>
          <div class="column is-5 form-column__input-column">
            <div class="control input-wrapper">
              <Icons icon="lock" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
              <input class="input" type="password" name="action" placeholder="password" v-model="donation.passwordConfirmation">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="billing-info centered logged-in" v-if="loggedIn">      
      <h2><span>Payment method</span></h2>

      <div v-if="!donation.isNewPaymentMethod">
        <p>Choose an existing payment method:</p>
        <div class="select">
          <select>
            <option v-for="paymentMethod in paymentMethods" :value="paymentMethod.id">{{`Card ending in ${paymentMethod.fourDigits}`}}</option>
          </select>
        </div>
      </div>

      <p class="add-payment-method__cta" @click="toggleNewPaymentMethod()" v-if="!donation.isNewPaymentMethod"><a>Use a new payment method</a></p>
      <p class="add-payment-method__cta" @click="toggleNewPaymentMethod()" v-if="donation.isNewPaymentMethod"><a>Use a stored payment method instead</a></p>
      <DonateBillingMethod
        :payment="donation.paymentMethod"
        v-on:input:method="donation.paymentMethod.method = $event"
        v-on:input:name="donation.paymentMethod.nameOnCard = $event"
        v-on:input:card="donation.paymentMethod.cardNumber = $event"
        v-on:input:month="donation.paymentMethod.expirationMonth = $event"
        v-on:input:year="donation.paymentMethod.expirationYear = $event"
        v-on:input:code="donation.paymentMethod.securityCode = $event"
        v-on:input:save="donation.paymentMethod.savePaymentMethod = $event"
        v-if="donation.isNewPaymentMethod" />
    </div>
    <div>
      <div class="form-submit-wrapper" @click.prevent="donate()">
        <button class="button is-large is-danger">{{submitButtonLabel || 'Donate'}}</button>
        <span class="small-text">By clicking Donate, you agree to the <a>Terms and Conditions</a>.</span>
      </div>
    </div>
  </form>

</template>

<script>
import Icons from "Components/general/Icons.vue"
import DonateBillingMethod from "Components/donate/DonateBillingMethod.vue"

export default {
	props: ["submitButtonLabel", "trigger", "givingLevels"],
  components: {
    DonateBillingMethod,
    Icons
  },
	data () {
		return {
      boxes: [ 25, 50, 100, 250, 500, 1000 ],
			volunteerFor: "",
			nonprofitIs: "",
      donation: {
        isNewPaymentMethod: false,
        paymentMethod: {
          method: 'card',
          nameOnCard: null,
          cardNumber: null,
          expirationMonth: null,
          expirationYear: null,
          securityCode: null,
          savePaymentMethod: true
        },
        amount: 350,
        customAmount: 350,
        isCustomAmount: false,
        isAnonymous: false,
        isGift: false,
        givingLevel: {},
        email: "",
        frequency: 'once',
        trigger: this.trigger
      }
		}
	},
  methods: {
    donate () {
      console.log(this.donation)
    },
    selectAmount(amount) {
      this.donation.isCustomAmount = false
      this.donation.amount = amount
    },
    toggleNewPaymentMethod () {
      this.donation.isNewPaymentMethod = !this.donation.isNewPaymentMethod
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    },
    userName () {
      return this.$store.state.user.fullName
    },
    paymentMethods () {
      return this.$store.state.user.paymentMethods
    }
  },
  mounted () {
    console.log(this.loggedIn)
  }
}
</script>

<style scoped lang="scss">
.boxes-wrapper {
  margin: -.25rem;
  margin-bottom: 10px;
  justify-content: center;

  @include breakpoint ($tablet) {
    max-width: 400px;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
  }  
}
.amount-box {
  color: white;
  display: inline-block;
  padding: 0.25rem;

  &__inner {
    background: $color-emphasis;
    padding: 12px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      cursor: pointer;
      background-color: rgba($color-emphasis, 0.7);
    }
    &.selected {
      background-color: $color-emphasis-alt;
    }
  }
  &-giving-levels {
    .amount-box__inner {
      display: block;
      text-align: center;
    }
  }
}
.is-gift-wrapper {
  margin-top: 10px;
  margin-bottom: 10px;
}

.centered {
  text-align: center;
}

.form-submit-wrapper {
  margin: 20px auto;
  text-align: center;
}
.save-method {
  margin-top: 5px;
}
.pad-right {
  margin-right: 5px;
}
.custom-amount-input {
  &:disabled {
    color: rgba($color-text, 0.2);
  }
}
.small-text {
  display: block;
  font-size: 14px;
  margin: 10px 0;
}
.billing-info {
  h2 {
    display: flex;
    flex-direction: row;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin: 20px 0 30px;
    color: $color-text;
    justify-content: center;
    a {
      color: $color-emphasis-alt;
      text-decoration: underline;
      &:hover {
        color: $color-text;
      }
    }
    .login-link {
      margin-left: 20px;
    }
  }
  &.logged-in {
    h2 {
      margin-bottom: 10px;
    }
  }
}

.add-payment-method__cta {
  margin: 10px 0 20px;
}
.input-line {
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0px;
  }
  @include breakpoint($tablet) {
    margin-bottom: 10px;

    &.custom-amount-wrapper {
      margin-bottom: 20px;
    }
  }
  &.email-input-wrapper {
    margin-bottom: 0;
    @include breakpoint($tablet) {
      margin-bottom: 10px;
    }
  }
  &.password-input-wrapper {
    @include breakpoint($tablet) {
      margin-top: 10px;
    }
  }
}
.form-column__input-column {
  padding-bottom: 0;
  padding-top: 0;
}

.frequency {
  flex: 1;
  margin-top: 30px;

  @include breakpoint($tablet) {
    padding: 0 100px;
    margin-top: 10px;
  }
  .control {
    display: flex;
    justify-content: space-evenly;
  }
  .radio {
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      margin-right: 5px;
    }
  }
}

.input-label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0;
  @include breakpoint($tablet) {
    justify-content: flex-end;
    padding-top: 0;
  }
}

.input-wrapper {
  position: relative;

  .input-icon {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 1;
  }
  .input {
    padding-left: 40px;
  }
}

.label {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  line-height: 2.25em;
  padding-bottom: 0;
}

.instructions {
  font-size: 14px;
  @include breakpoint($tablet) {
    font-size: 16px;
  }
}

</style>