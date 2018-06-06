<template>
  <div class="share-toolbar__share-wrapper">
    <transition name="slide-fade">
      <ShareBox
        v-if="openShareBox"
        class="share-box__wrapper"
        :url="url"
        :text="text"
        :via="via"
        :title="title" />
    </transition>
    <div class="share-toolbar__share-item share-toolbar__share-share"
        @click="share()">
      <Icons iconwidth="19px" iconheight="19px" icon="share" color="#666" class="icon" />
      <a>Share</a>
    </div>
    <div class="share-toolbar__share-item share-toolbar__share-comment"
        v-if="allowComment !== false"
        @click="replyTo(comment.id)">
      <Icons iconwidth="21px" iconheight="21px" icon="bubble" color="#666" class="icon" />
      <a>Comment</a>
    </div>
    <div class="share-toolbar__share-item share-toolbar__share-donate">
      <Icons iconwidth="22px" iconheight="22px" icon="money" color="#666" class="icon" />
      <a>Donate</a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.share-toolbar {
  &__share-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin: 10px 0;
    position: relative;
    user-select: none;
  }
  &__share-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 20px;
  }
  &__share-share,
  &__share-comment {
    .icon {
      margin-right: 4px;
    }
  }
}

.share-box__wrapper {
  position: absolute;
}
</style>

<script>
import Icons from "Components/general/Icons.vue"
import ShareBox from "Components/general/ShareBox.vue"

export default {
	props: [ "allowComment", "comment", "url", "text", "via", "title" ],
	components: {
		Icons,
		ShareBox
	},
	data () {
		return {
			openShareBox: false
		}
	},
	methods: {
		replyTo (commentId) {
			this.$emit("replyTo", { comment_id: commentId })
		},
		share (commentId) {
			this.openShareBox = !this.openShareBox
		},
		donate () {
			this.$emit("donate")
		}
	}
}
</script>
