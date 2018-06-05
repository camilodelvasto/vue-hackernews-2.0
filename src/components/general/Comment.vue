<template>
  <div class="comment-item__comment-wrapper"
      :class="{'is-reply': isReply, 'current': comment.id === currentId}"
      :id="`comment_${comment.id}`">
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
    <ShareDonateToolbar :comment="comment" v-on:replyTo="openReplyBox($event)" :allow-comment="!isReply" />
    <transition name="slide-fade">
      <CommentReply :in-reply-to="inReplyTo" class="comment-reply__wrapper" v-if="showReplyBox" />
    </transition>
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

    &.current {
      padding: 10px;
      margin-left: -10px;
      animation: fadeBackground 3s ease-in-out;
      animation-delay: 3s;

      &.is-reply {
        margin-left: 20px;
      }
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

.comment-reply__wrapper {
  margin-left: 60px;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

@keyframes fadeBackground {
  0% {
    background: rgba($color-medium-gray, 0.0);
  }
  25% {
    background: rgba($color-medium-gray, 0.1);
  }
  100% {
    background: rgba($color-medium-gray, 0);
  }
}

</style>

<script>
import ShareDonateToolbar from "Components/general/ShareDonateToolbar.vue"
import CommentReply from "Components/general/CommentReply.vue"
import Avatar from "vue-avatar"
import Icons from "Components/general/Icons.vue"

export default {
	props: [ "comment", "is-reply" ],
	components: {
		Avatar,
    CommentReply,
		Icons,
		ShareDonateToolbar
	},
  data () {
    return  {
      showReplyBox: false,
      inReplyTo: null
    }
  },
	computed: {
		currentId () {
			return parseInt(this.$route.query.comment_id, 10)
		}
	},
  methods: {
    openReplyBox (payload) {
      this.showReplyBox = true
      this.inReplyTo = payload.comment_id
    }
  }
}
</script>
