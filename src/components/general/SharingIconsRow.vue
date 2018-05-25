<template>
  <div class="sharing-icons-row__wrapper">
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
        <div class="sharing-icons-row__share-item sharing-icons-row__share-linkedin button is-white"
          @click="shareLinkedIn()">
          <Icons iconwidth="20px" iconheight="20px" icon="linkedin" color="#fff" class="icon" />
          <span>Share</span>
        </div>
      </div>
      <div class="column">
        <div class="sharing-icons-row__share-item sharing-icons-row__share-email button is-white"
          @click="shareEmail()">
          <Icons iconwidth="20px" iconheight="20px" icon="email" color="#fff" class="icon" />
          <span>Email</span>
          <div class="addthis_inline_share_toolbox"></div>
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
          :data-href="fullURL"
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
    position: relative;
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
.addthis_inline_share_toolbox {
  opacity: 0;
  position: absolute;
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
			fullURL: "",
			shareText: "Check out this website!",
			siteName: "Volunteerathon",
			shareWindowTitle: "Sharing"
		}
	},
	props: [ "routePath" ],
	mounted () {
		this.fullURL = window.location.origin + this.routePath
		this.loadScripts()
	},
	computed: {
	},
	methods: {
		loadScripts () {
			if (typeof window !== "undefined" && window.FB) {
				window.FB.XFBML.parse()
			}
			if (window.addthis.layers && typeof window.addthis.layers.refresh === "function") {
				window.addthis.layers.refresh()
			}
		},
		shareFB () {
			window.FB.ui({
				method: "share",
				href: this.fullURL
			}, function (response) {
				return response
			})
		},
		shareTweet () {
			popUpWindow(`https://twitter.com/intent/tweet/?url=${encodeURIComponent(this.fullURL)}&text=${encodeURI(this.shareText)}&via=${encodeURI(this.siteName)}`, `${encodeURI(this.shareWindowTitle)}`, 450, 320)
		},
		shareLinkedIn () {
			popUpWindow(`http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(this.fullURL)}&text=${encodeURI(this.shareText)}`, `${encodeURI(this.shareWindowTitle)}`, 650, 420)
		},
		shareEmail () {
			document.querySelector(".at-share-btn").click()
		}
	}
}

function popUpWindow (url, title, w, h) {
	// Credit goes to https://stackoverflow.com/a/16861050/1176464
	// Fixes dual-screen position                         Most browsers      Firefox
	var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
	var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

	var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
	var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

	var left = ((width / 2) - (w / 2)) + dualScreenLeft
	var top = ((height / 2) - (h / 2)) + dualScreenTop
	var newWindow = window.open(url, title, "scrollbars=yes, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left)

	// Puts focus on the newWindow
	if (window.focus) {
		newWindow.focus()
	}
}
</script>
