<template>
  <div>
    <div class="billing-info">
      <div class="columns form-column__wrapper form-column__extra-padded input-line">
        <div class="column is-2 form-column__input-column method">
          <div class="control">
            <label class="radio">
              <input type="radio" name="method" v-model="payment.method" value="card"
                v-on:input="$emit('input:method', $event.target.value)"
              >
              Credit Cart
            </label>
            <label class="radio">
              <input type="radio" name="method" v-model="payment.method" value="paypal"
                v-on:input="$emit('input:method', $event.target.value)"
              >
              PayPal
            </label>
            <label class="radio">
              <input type="radio" name="method" v-model="payment.method" value="check"
                v-on:input="$emit('input:method', $event.target.value)"
              >
              Check
            </label>
          </div>
        </div>
      </div>
      <div class="columns form-column__wrapper form-column__extra-padded input-line">
        <div class="column is-5 form-column__label-column input-label"><label class="label">Name on card:</label></div>
        <div class="column is-5 form-column__input-column">
          <div class="control input-wrapper">
            <Icons icon="user" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
            <input class="input" type="text" placeholder="Name on card"
              v-bind:value="payment.nameOnCard"
              v-on:input="$emit('input:name', $event.target.value)"
            />
          </div>
        </div>
      </div>
      <div class="columns form-column__wrapper form-column__extra-padded input-line input-card-number">
        <div class="column is-5 form-column__label-column input-label"><label class="label">Card Number:</label></div>
        <div class="column is-5 form-column__input-column">
          <div class="control input-wrapper">
            <Icons icon="credit-card" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
            <input class="input" type="number" placeholder="0000 0000 0000 0000"
              v-bind:value="payment.cardNumber"
              v-on:input="$emit('input:card', $event.target.value)"
            />
          </div>
        </div>
      </div>
      <div class="columns form-column__wrapper form-column__extra-padded input-line input-expiry-number">
        <div class="column is-5 form-column__label-column input-label"><label class="label">Expiration date (MM/YY):</label></div>
        <div class="column is-3 form-column__input-column">
          <div class="select">
            <select
              v-bind:value="payment.expirationMonth"
              v-on:input="$emit('input:month', $event.target.value)"
            >
              <option v-for="month in [1,2,3,4,5,6,7,8,9,10,11,12]" :value="month">{{month}}</option>
            </select>
          </div>
          <div class="select">
            <select
              v-bind:value="payment.expirationYear"
              v-on:input="$emit('input:year', $event.target.value)"
            >
              <option v-for="year in getYearArray()" :value="year">{{year}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="columns form-column__wrapper form-column__extra-padded input-line input-card-code">
        <div class="column is-5 form-column__label-column input-label">
          <label class="label">Security Code:</label>
        </div>
        <div class="column is-2 form-column__input-column">
          <div class="control input-wrapper">
            <Icons icon="lock" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
            <input class="input" type="number" name="security-code" placeholder="0000" min="0" max="9999"
              autocomplete="off"
              v-bind:value="payment.securityCode"
              v-on:input="$emit('input:code', $event.target.value)"
            />
          </div>
        </div>
        <div class="column is-4 form-column__input-column save-method">
          <label class="checkbox">
            <input type="checkbox"
              name="payment-method"
              :value="payment.savePaymentMethod"
              v-model="payment.savePaymentMethod"
              v-on:click="$emit('input:save', $event.target.value)"
            />
              Save the payment method
          </label>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Icons from "Components/general/Icons.vue"

export default {
  props: {
    payment: {
      type: Object,
      required: true
    }
  },
  components: {
    Icons
  },
  methods: {
    getYearArray() {
      const currentYear = (new Date()).getFullYear() - 2000
      var yearArray = []
      for (var i = currentYear; i < currentYear + 12; i++) {
        yearArray.push(i)
      }
      return yearArray
    }
  }
}
</script>

<style scoped lang="scss">
.label {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  line-height: 2.25em;
  padding-bottom: 0;
}

.centered {
  text-align: center;
}

.input-line {
  margin-bottom: 10px;

  &:first-child {
    margin-top: 0px;
  }
  @include breakpoint($tablet) {
    margin-bottom: 20px;
  }
  .input-card-code {
    @include breakpoint($tablet) {
      display: flex;
      flex-direction: row;
      align-items: center;      
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

.form-column__input-column {
  padding-bottom: 0.2rem;
  padding-top: 0;
}

.input-expiry-number {
  .select {
    width: 50%;
  }
}

.method {
  flex: 1;
  margin-top: 30px;
  margin-bottom: 20px;

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
</style>
