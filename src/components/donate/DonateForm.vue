<template>
  <form>
    <div class="columns boxes-wrapper is-multiline">
      <div class="amount-box column is-4 is-6-mobile" v-for="box in boxes">
        <div
          class="amount-box__inner"
          :class="{'selected': box === donation.amount}"
          @click="donation.amount = box">
          {{box | usd}}
        </div>
      </div>
    </div>
    <div class="columns form-column__wrapper form-column__extra-padded input-line">
      <div class="column is-5 form-column__label-column input-label"><label class="label">Other:</label></div>
      <div class="column is-3 form-column__input-column">
        <div class="control input-wrapper">
          <Icons icon="usd" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
          <input class="input" type="number" name="amount" :placeholder="donation.amount" v-model="donation.amount">
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
    <div class="billing-info">
      <div class="columns form-column__wrapper form-column__extra-padded input-line">
        <div class="column is-5 form-column__label-column input-label"><label class="label">Email (for the receipt):</label></div>
        <div class="column is-5 form-column__input-column">
          <div class="control input-wrapper">
            <Icons icon="email" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
            <input class="input" type="text" name="action" placeholder="Enter your email" v-model="donation.email">
          </div>
        </div>
      </div>
      <div class="columns form-column__wrapper form-column__extra-padded input-line">
        <div class="column is-5 form-column__label-column input-label"><label class="label">First name:</label></div>
        <div class="column is-5 form-column__input-column">
          <div class="control input-wrapper">
            <Icons icon="user" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
            <input class="input" type="text" name="action" placeholder="First name" v-model="donation.firstName">
          </div>
        </div>
      </div>
      <div class="columns form-column__wrapper form-column__extra-padded input-line">
        <div class="column is-5 form-column__label-column input-label"><label class="label">Last name:</label></div>
        <div class="column is-5 form-column__input-column">
          <div class="control input-wrapper">
            <Icons icon="user" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
            <input class="input" type="text" name="action" placeholder="Last name" v-model="donation.lastName">
          </div>
        </div>
      </div>
      <div class="columns form-column__wrapper form-column__extra-padded input-line input-card-number">
        <div class="column is-5 form-column__label-column input-label"><label class="label">Card Number:</label></div>
        <div class="column is-5 form-column__input-column">
          <div class="control input-wrapper">
            <Icons icon="credit-card" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
            <input class="input" type="number" name="action" placeholder="0000 0000 0000 0000" v-model="donation.cardNumber">
          </div>
        </div>
      </div>
      <div class="columns form-column__wrapper form-column__extra-padded input-line input-expiry-number">
        <div class="column is-5 form-column__label-column input-label"><label class="label">Expiration date (MM/YY):</label></div>
        <div class="column is-3 form-column__input-column">
          <div class="select">
            <select v-model="donation.expirationMonth">
              <option v-for="month in [1,2,3,4,5,6,7,8,9,10,11,12]">{{month}}</option>
            </select>
          </div>
          <div class="select" v-model="donation.expirationyear">
            <select>
              <option v-for="year in [18,19,20,21,22,23,24,25,26,27]">{{year}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="columns form-column__wrapper form-column__extra-padded input-line input-card-code">
        <div class="column is-5 form-column__label-column input-label"><label class="label">Security Code:</label></div>
        <div class="column is-2 form-column__input-column">
          <div class="control input-wrapper">
            <Icons icon="lock" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
            <input class="input" type="number" name="action" placeholder="0000" min="0" max="9999" v-model="donation.cardCode">
          </div>
        </div>
        <div class="column is-4 form-column__input-column save-method">
          <label class="checkbox">
            <input type="checkbox" v-model="donation.savePaymentMethod">
              Save the payment method
          </label>
        </div>
      </div>
      <div class="form-submit-wrapper" @click.prevent="donate()">
        <button class="button is-large is-danger">{{submitButtonLabel || 'Donate'}}</button>
      </div>
    </div>
  </form>

</template>

<script>
import Icons from "Components/general/Icons.vue"

export default {
	props: ["submitButtonLabel", "trigger"],
  components: {
    Icons
  },
	data () {
		return {
      boxes: [ 25, 50, 100, 250, 500, 1000 ],
			volunteerFor: "",
			nonprofitIs: "",
      donation: {
        amount: 350,
        isGift: false,
        email: "",
        cardNumber: null,
        cardCode: null,
        expirationMonth: 1,
        expirationyear: 2018,
        frequency: 'once',
        savePaymentMethod: true,
        trigger: this.trigger
      }
		}
	},
  methods: {
    donate () {
      console.log(this.donation)
    }
  }
}
</script>

<style scoped lang="scss">
.boxes-wrapper {
  margin: -.25rem;
  margin-bottom: 10px;

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
}
.is-gift-wrapper {
  margin-top: 10px;
  margin-bottom: 10px;
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

    &:first-child {
      margin-top: 25px;
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
.form-submit-wrapper {
  margin: 20px auto;
  text-align: center;
}
.save-method {
  margin-top: 5px;
}
</style>
