<template>
  <div class="page-wrapper">
    <h1>Change the world in 3 easy steps:</h1>
    <div class="container">
      <div class="columns combo-wrapper is-multiline">
        <ComboBox iconsrc="/public/images/check.png" duplicate="false" :large="true">
        </ComboBox>
        <ComboBox iconsrc="/public/images/invite.png" duplicate="false" :large="true">
        </ComboBox>
        <ComboBox iconsrc="/public/images/act.png" duplicate="false" :large="true">
        </ComboBox>
      </div>
    </div>
    <div class="container">
      <div class="form-wrapper">
        <form method="post" action="/">
          <div class="columns form-column__wrapper form-column__extra-padded">
            <div class="column is-5 form-column__label-column"><label class="label">Donations will go to this nonprofit:</label></div>
            <div class="column is-7 form-column__input-column">
              <div class="control">
                <input class="input" type="text" name="action" placeholder="Enter name of a nonprofit" value="">
              </div>
            </div>
          </div>
          <div class="columns form-column__wrapper">
            <div class="column form-column__label-column">
              <label class="label">I will volunteer
                <div class="control inline-field">
                  <input class="input" type="number" min="0" max="9999" name="number-of-hours" placeholder="100" value="">
                </div>
                hours for:
              </label>
            </div>
          </div>
          <div class="columns form-column__wrapper">
            <div class="column is-12 form-column__label-column form-column__left-padded">
              <label class="radio">
                <input type="radio" name="non-profit-is" v-model="nonprofitIs" value="same">
                same nonprofit as above
              </label>
            </div>
          </div>
          <div class="columns form-column__wrapper">
            <div class="column is-5 form-column__label-column form-column__left-padded">
              <label class="radio">
                <input type="radio" name="non-profit-is" v-model="nonprofitIs" value="different">
                a different nonprofit:
              </label>
            </div>
            <transition name="fade">
              <div class="column is-7 form-column__input-column">
                <div class="control">
                  <input class="input" type="text" name="project_action" placeholder="Enter name of a nonprofit" value="">
                </div>
              </div>
            </transition>
          </div>
          <div class="columns form-column__wrapper">
            <div class="column is-5 form-column__label-column form-column__left-padded">
              <label class="radio">
                <input type="radio" name="non-profit-is" v-model="nonprofitIs" value="independent">
                independent service:
              </label>
            </div>
            <transition name="fade">
              <div class="column is-7 form-column__input-column">
                <div class="control">
                  <input class="input" type="text" name="project_action" placeholder="Enter what you will be doing" value="">
                </div>
              </div>
            </transition>
          </div>
          <p class="help pad-more">To find volunteer opportunities, <a href="http://aqua.dailysource.org/donation/helpcreatethis" target="_blank">click here</a></p>
          <button class="button is-success is-large" type="submit">{{submitButtonLabel}}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ComboBox from "Components/general/ComboBox.vue"

export default {
	props: ["submitButtonLabel"],
	components: {
		ComboBox
	},
	data () {
		return {
			volunteerFor: "",
			nonprofitIs: ""
		}
	}
}
</script>

<style scoped lang="scss">
.form-column {
  &__wrapper {
    margin-top: 0;
    @include breakpoint($tablet) {
      line-height: 42px;
    }

    .column {
      padding-top: 0;
      padding-bottom: 0;
      margin-bottom: 5px;
      @include breakpoint($tablet) {
        margin-bottom: 0;
      }
    }
  }
  &__label-column {
    text-align: left;
    .label {
    }
  }
  &__input-column {

  }
  &__button-column {
    .button {
      display: block;
      width: 100%;
      border-radius: 20px !important;
    }
  }
  &__extra-padded {
    margin-bottom: 35px;
  }
  &__left-padded {
    padding-left: 80px;
    padding-right: 0;
    margin-right: 0;
    margin-left: 0;
  }
}

.inline-field {
  display: inline-block;
  margin: 0 5px 10px;
  width: 65px;
}

.radio-fields {
  display: block;
}

.page-wrapper {
  background-color: $white;
  color: #363636;
  text-align: center;
}

h1 {
  color: $color-emphasis;
  margin-bottom: 40px;
}

.combo-wrapper {
  justify-content: center;
  max-width: $max-combo-wrapper-width;
  margin: 0 auto;

  @include breakpoint($tablet) {
    display: flex;
    padding: 0 7%;
  }
}

.form-wrapper {
  max-width: 760px;
  margin: 20px auto 0;

  button[type=submit] {
    margin: 30px 0 30px;
  }

  label {
    font-size: 20px;
  }

  input,
  button,
  .button {
    font-size: 18px;
  }
}

.help {
  color: $color-medium-gray;
  font-style: italic;
  font-size: 17px;

  @include breakpoint($tablet) {
    text-align: left;
  }
}

.pad-more {
  margin-top: 20px;
}

</style>
