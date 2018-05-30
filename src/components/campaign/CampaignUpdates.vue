<template>
  <div class="updates__wrapper">
    <div class="update__wrapper" v-for="(update, index) in updates" >
      <div class="update__timestamp">{{formattedDate(update.timestamp)}}</div>
      <div class="update__content-excerpt" v-if="update.content.length > maxchar">
        <transition name="fade">
          <div v-if="!showFullUpdate[index]">
            <span class="update__content" v-html="excerpt(update.content)"></span>
            <span>... <a @click="toggleIndex(index)">Show more</a></span>
          </div>
          <div class="update__content" v-else>
            <div v-html="update.content"></div>
            <span><a @click="toggleIndex(index)">Show less</a></span>
          </div>
        </transition>
      </div>
      <div class="update__content" v-else v-html="update.content"></div>
      <div ShareDonateToolbar :allowComment="false" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.update {
  &__wrapper {
    margin-bottom: 20px;
  }
  &__title {
    font-weight: bold;
    font-size: 18px;
  }
  &__timestamp {
    color: $color-text;    
    margin-bottom: 6px;
    font-style: bold;
    font-size: 18px;
  }
  &__fullname {
    font-style: normal;
    color: $color-text;
  }
  &__content {
    font-size: 20px;
    line-height: 1.4;
    font-family: $font-primary;
  }
}
</style>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      showFullUpdate: {}
    }
  },
  props: [ 'updates', 'maxchar' ],
  methods: {
    formattedDate(dateX) {
      var date = new Date(dateX)
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleString('en-US', options)
    },
    excerpt(content) {
      var stripHtml = content.replace(/<\/?[^>]+(>|$)/g, "")
      return stripHtml.substring(0, this.maxchar)
    },
    toggleIndex(index) {
      if (!this.showFullUpdate[index]) {
        Vue.set(this.showFullUpdate, index, true)
      } else {
        Vue.set(this.showFullUpdate, index, false)
      }
    }
  }
}
</script>
