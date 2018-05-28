<template>
  <section class="page-wrapper">
    <div :fixed="true" class="is-fixed">
      <div class="container capped">
        <h1>The new way quadruples the benefits</h1>
        <h3 class="tagline" v-html="tagline"></h3>
      </div>
      <div class="container capped">
        <div class="columns">
          <RotatingImage delay="0" interval="6000" :imgarr="boxes[0].images"></RotatingImage>
          <RotatingImage delay="2000" interval="6000" :imgarr="boxes[1].images"></RotatingImage>
          <RotatingImage delay="4000" interval="6000" :imgarr="boxes[2].images"></RotatingImage>
        </div>
      </div>
      <div class="container capped">
        <div class="columns combo-wrapper is-multiline">
          <ComboBox :iconsrc="result.iconsrc" :duplicate="result.duplicate" v-for="result in results">
            <h2 v-html="result.headline"></h2>
            <p v-html="result.tagline"></p>
          </ComboBox>
        </div>
      </div>
      <div class="container capped">
        <h3 v-html="bottomline"></h3>
      </div>
    </div>
  </section>
</template>

<script>
import ComboBox from 'Components/general/ComboBox.vue'
import RotatingImage from 'Components/general/RotatingImage.vue'

export default {
  components: {
    ComboBox,
    RotatingImage
  },
  props: ['headline', 'tagline', 'boxes', 'results', 'bottomline']
}
</script>

<style scoped lang="scss">
h3 {
  padding: 0 0 0 10px;
  text-align: center;
}

h1 {
  color: $color-text;
  margin-bottom: 10px;
}

h3.tagline {
  color: $color-text;
  font-size: 22px;
}
.logo {
  text-align: center;
}
.is-fixed.Masthead {
}

.container {
  @include breakpoint($tablet) {
    margin: 0 auto !important;
  }
}

.columns {
  @include breakpoint($tablet) {
    justify-content: center;
    display: flex;
  }
}

.combo-wrapper {
  margin-top: 10px;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to {
    opacity: 0
}

</style>
