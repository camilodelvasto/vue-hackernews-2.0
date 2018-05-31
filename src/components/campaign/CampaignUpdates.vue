<template>
  <div class="updates__wrapper">
    <div class="update__wrapper" v-for="(update, index) in updates">
      <div class="update__fullname"><span class="update__fullname-name">Update # {{count - index}}</span></div>
      <div class="update__timestamp">{{update.timestamp | formattedDate}}</div>
      <div class="update__content" v-if="update.content.length > maxchar">
        <transition name="fade">
          <div v-if="!showFullUpdate[index]">
            <span v-html="excerpt(update.content)"></span>
            <span>... <a @click="toggleIndex(index)">Show more</a></span>
          </div>
          <div class="update__content" v-else>
            <div v-html="update.content"></div>
            <span><a @click="toggleIndex(index)">Show less</a></span>
          </div>
        </transition>
      </div>
      <div class="update__content" v-else v-html="update.content"></div>
      <ShareDonateToolbar :allowComment="false" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.updates__wrapper {
  font-size: 20px;
}

.update {
  &__wrapper {
    margin-bottom: 20px;
  }
  &__title {
    font-weight: bold;
    font-size: 18px;
  }
  &__timestamp {
    font-style: italic;
    color: $color-medium-gray;
    margin-bottom: 6px;
    font-size: 16px;
  }
  &__fullname {
    font-style: normal;
    color: $color-text;
    font-size: 22px;
  }
  &__content {
    font-size: 20px;
    line-height: 1.4;
    font-family: $font-primary;
  }
}
</style>

<script>
import Vue from "vue"
import ShareDonateToolbar from "Components/general/ShareDonateToolbar.vue"

export default {
	data () {
		return {
			showFullUpdate: {}
		}
	},
	components: {
		ShareDonateToolbar
	},
	props: [ "updates", "maxchar", "count" ],
	methods: {
		excerpt (content) {
			var stripHtml = content.replace(/<\/?[^>]+(>|$)/g, "")
			return stripHtml.substring(0, this.maxchar)
		},
		toggleIndex (index) {
			if (!this.showFullUpdate[index]) {
				Vue.set(this.showFullUpdate, index, true)
			} else {
				Vue.set(this.showFullUpdate, index, false)
			}
		}
	}
}
</script>
