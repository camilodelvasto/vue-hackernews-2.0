<template>
  <div class="comment-item__comment-wrapper" :class="{'is-reply': isReply}">
    <div class="comment-item__avatar">
      <avatar 
        username="comment.commenter.fullname" 
        :rounded="false" :src="comment.avatar"></avatar>
    </div>
    <div class="comment-item__content">
      <div class="comment-item__comment-header">
        {{comment.fullname}} commented {{comment.timestamp | timeAgo}}.
      </div>
      <div class="comment-item__comment-content" v-html="comment.comment"></div>
    </div>
    <ShareDonateToolbar />
  </div>
</template>

<style scoped lang="scss">
.comment-item {
  &__comment-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 30px;

    &.is-reply {
      margin-left: 30px;
    }
  }
  &__comment-header {
    color: $color-silver;
    font-style: italic;
  }
  &__avatar {
    margin-right: 10px;
  }
  &__content {
    width: calc(90% - 60px);
  }
}

.share-toolbar {
  &__share-wrapper {
    @include breakpoint($tablet) {
      margin-left: 80px !important;
    }
  }
}
</style>

<script>
import ShareDonateToolbar from "Components/general/ShareDonateToolbar.vue"
import Avatar from "vue-avatar"
import Icons from "Components/general/Icons.vue"

export default {
	props: [ "comment", "title", "is-reply" ],
	components: {
		Avatar,
		Icons,
		ShareDonateToolbar
	}
}
</script>
