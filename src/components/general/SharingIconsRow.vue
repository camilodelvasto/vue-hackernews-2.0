<template>
  <div class="sharing-icons-row__wrapper">
    <div id="fb-root"></div>
    <div class="columns">
      <div class="column">
        <div class="sharing-icons-row__share-item sharing-icons-row__share-facebook button is-white"
          @click="shareFB()">
          <Icons iconwidth="20px" iconheight="20px" icon="facebook" color="#fff" class="icon" />
          <span>Share</span>
        </div>
      </div>
      <div class="column">
        <div class="sharing-icons-row__share-item sharing-icons-row__share-twitter button is-white"
          @click="shareTweet()">
          <Icons iconwidth="20px" iconheight="20px" icon="twitter" color="#fff" class="icon" />
          <span>Tweet</span>
        </div>
      </div>
      <div class="column">
        <div class="sharing-icons-row__share-item sharing-icons-row__share-linkedin button is-white">
          <Icons iconwidth="20px" iconheight="20px" icon="linkedin" color="#fff" class="icon" />
          <span>Share</span>
        </div>
      </div>
      <div class="column">
        <div class="sharing-icons-row__share-item sharing-icons-row__share-email button is-white">
          <Icons iconwidth="20px" iconheight="20px" icon="email" color="#fff" class="icon" />
          <span>Email</span>
        </div>
      </div>
      <div class="column">
        <div class="sharing-icons-row__share-item sharing-icons-row__share-link button is-light">
          <Icons iconwidth="20px" iconheight="20px" icon="link" color="#444" class="icon" />
          <span>Link</span>
        </div>
      </div>
      <div class="column">
        <div class="sharing-icons-row__share-item sharing-icons-row__share-plus button is-light">
          <Icons iconwidth="20px" iconheight="20px" icon="plus" color="#444" class="icon" />
          <span>More</span>
        </div>
      </div>
    </div>
    <div class="fb-like-follow__wrapper">
      <div class="fb-like-follow__fb-like">
        <div class="fb-like"
          :data-href="campaignUrl"
          data-layout="button_count"
          data-share="false"
          data-action="like"
          data-show-faces="false">
        </div>
      </div>
      <div class="fb-like-follow__follow">
        <div class="sharing-icons-row__share-plus button is-small is-light">
          <Icons iconwidth="16px" iconheight="16px" icon="alarm" color="#444" class="icon" />
          <span>Follow</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sharing-icons-row {
  &__wrapper {
    .column {
      padding: 0.2em 0.75rem;
      @include breakpoint($tablet) {
        padding: 0.2em;
        &:first-child {
          padding-left: 0.75rem;
        }
        &:last-child {
          padding-right: 0.75rem;
        }
      }
    }
  }
  &__share-item {
    transition: background-color 0.2s ease-in-out;
    border-radius: 5px;
    display: flex;
    flex-grow: 100;
  }
  &__share-item:not(.is-light) {
    color: $white;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      color: $white;
    }
  }
  &__share-facebook {
    background-color: $color-share-facebook;
    &:hover {
      background-color: rgba($color-share-facebook, 0.8);
    }
  }
  &__share-twitter {
    background-color: $color-share-twitter;
    &:hover {
      background-color: rgba($color-share-twitter, 0.8);
    }
  }
  &__share-linkedin {
    background-color: $color-share-linkedin;
    &:hover {
      background-color: rgba($color-share-linkedin, 0.8);
    }
  }
  &__share-email {
    background-color: $color-share-email;
    &:hover {
      background-color: rgba($color-share-email, 0.8);
    }
  }
}

.fb-like-follow {
  &__wrapper {
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    height: 21px;
    align-items: flex-end;
  }
  &__fb-like {
    display: inline;
  }
  &__follow {
    display: inline;
    margin-left: 10px;
    align-self: flex-start;
    .button {
      height: 21px;
      border: 1px solid $color-lightest-gray;
      border-radius: 4px;
    }
  }
}
</style>
<script>
import Icons from "Components/general/Icons.vue"

export default {
	components: {
		Icons
	},
  data () {
    return {
      fullURL: ''
    }
  },
	props: [ "campaignName", "campaignUrl" ],
	mounted () {
		if (typeof window !== "undefined" && window.FB) {
			window.FB.XFBML.parse()
		}
    this.fullURL = window.location.origin + this.$route.fullPath
	},
  methods: {
    shareFB() {
      window.FB.ui({
        method: 'share',
        href: this.fullURL,
      }, function(response){
        console.log(response)
      })
    },
    shareTweet() {
      console.log('encodeURI(this.fullURL): ', encodeURIComponent(this.fullURL))
      window.open(`https://twitter.com/intent/tweet/?text=Check%20out%20this%20site!&url=${encodeURIComponent(this.fullURL)}&via=volunteerathon`, '_blank')
    }
  }
}
</script>
