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
          <div class="columns form-column__wrapper">
            <div class="column is-5 is-5-tablet form-column__label-column"><label class="label">Number of hours I will volunteer:</label></div>
            <div class="column is-5 form-column__input-column">
              <div class="control">
                <input class="input" type="number" min="0" name="action" placeholder="Enter the number of hours" value="">
              </div>
            </div>
          </div>
          <div class="columns form-column__wrapper">
            <div class="column is-5 form-column__label-column"><label class="label">The donations will go to:</label></div>
            <div class="column is-5 form-column__input-column">
              <div class="control">
                <input class="input" type="text" name="action" placeholder="Enter a nonprofit or cause" value="">
              </div>
            </div>
            <div class="column is-2 form-column__button-column"><button class="button is-info is-rounded" type="button">Search</button></div>
          </div>
          <p class="help">The nonprofit you donate to can be different than the nonprofit you volunteer for.</p>

          <div class="columns form-column__wrapper">
            <div class="field work volunteer-for column is-12">
              <label class="label">I will volunteer for:</label>
              <div class="control">
                <label class="radio">
                  <input type="radio" name="volunteer-for" v-model="volunteerFor" value="nonprofit">
                  a nonprofit
                </label>
                <label class="radio">
                  <input type="radio" name="volunteer-for" v-model="volunteerFor" value="independent">
                  an independent service project
                </label>
              </div>
            </div>
          </div>
          <div class="columns form-column__wrapper">
            <transition name="fade">
              <div class="field is-12 column" v-if="volunteerFor === 'independent'">
                <div class="columns">
                  <div class="column is-5 form-column__label-column"><label class="label">In my project I will be:</label></div>
                  <div class="column is-5 form-column__input-column">
                    <div class="control">
                      <input class="input" type="text" name="project_action" placeholder="Enter what you will be doing" value="">
                    </div>
                  </div>
                </div>
              </div>
              <div class="field column is-12 work" v-if="volunteerFor === 'nonprofit'">
                <div class="columns is-multiline">
                  <div class="column is-12 form-column__label-column"><label class="label">The nonprofit will be:</label></div>

                  <div class="column is-12 form-column__label-column">
                    <label class="radio">
                      <input type="radio" name="non-profit-is" v-model="nonprofitIsSame" value="true">
                      the same nonprofit that’s receiving the donations
                    </label>
                  </div>
                  <div class="column is-5 form-column__label-column">
                    <label class="radio">
                      <input type="radio" name="non-profit-is" v-model="nonprofitIsSame" value="false">
                      a different nonprofit:
                    </label>
                  </div>
                  <div class="column is-5 form-column__input-column" v-if="nonprofitIsSame === 'false'" key="1">
                    <div class="control">
                      <input class="input" type="text" name="action" placeholder="Enter a nonprofit" value="">
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <p class="help pad-more" v-if="volunteerFor === 'nonprofit'">To find nonprofits to volunteer for, <a href="http://aqua.dailysource.org/donation/helpcreatethis" target="_blank">click here</a></p>
          <button class="button is-success is-large" type="submit">{{submitButtonLabel}}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ComboBox from 'Components/general/ComboBox.vue'

export default {
  props: ['submitButtonLabel'],
  components: {
    ComboBox
  },
  data () {
    return {
      volunteerFor: '',
      nonprofitIsSame: ''
    }
  }
}
</script>

<style scoped lang="scss">
.form-column {
  &__wrapper {
    margin-top: 40px;
    @include breakpoint($tablet) {
      line-height: 40px;
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
  &__button-column {
    .button {
      display: block;
      margin-top: 10px;
      width: 100%;
      border-radius: 20px !important;

      @include breakpoint($tablet) {
       margin-top: 0;
     }
    }
  }
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

  @include breakpoint($tablet) {
    display: flex;
    padding: 0 7%;
  }
}

.form-wrapper {
  max-width: 700px;
  margin: 0 auto;

  button[type=submit] {
    margin: 50px 0 30px;
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

.work {
  display: flex;
  flex-direction: column;

  @include breakpoint($tablet) {
    flex-direction: column;
    justify-content: space-between;
  }

  label {
    text-align: left;
    margin-bottom: 0;
    @include breakpoint($tablet) {
      line-height: 40px;
    }
  }

  @include breakpoint($tablet) {
    .control {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .control2 {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 40px;
    }
  }
}

.volunteer-for {
  @include breakpoint($tablet) {
    display: flex;
    flex-direction: row;

    .control {
      width: 70%;
    }
  }
}

.radio+.radio {
  margin-left: 0;
  display: block;

  @include breakpoint($tablet) {
    display: inline-block;
  }
}
.pad-more {
  margin-top: 20px;
}

</style>
