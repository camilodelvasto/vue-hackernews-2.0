<template>
  <div class="comment-reply__wrapper">
    <form>
      <!--
        If not logged in, provide the login link
        If user doesn't want to log in, then use name/comment combo (avatar???)
        
      -->
      <p v-if="userFullName">
        Commenting as <span v-html="userFullName"></span>. <a>Not you?</a>
      </p>
      <div class="control columns" v-else>
        <input class="input column is-6" type="text" name="fullname" placeholder="Full name" v-model="fullName" required>
        <div class="column is-6"> or <a>login</a></div>
      </div>

      <div class="control columns">
        <textarea class="column is-6" type="text" name="comment" v-model="commentBody" rows="3" cols="75">
        </textarea>
        <button class="button" @click.prevent="sendForm()">Add comment</button>
      </div>
      <input type="hidden" name="in_reply_to" :value="inReplyTo" />
      <input ref="faxthis" type="checkbox" name="contact_us_by_fax_only" v-model="fax" tabindex="-1" autocomplete="off">
    </form>
  </div>
</template>

<style scoped lang="scss">
.g-recaptcha {
  margin: 20px 0;
}

textarea {
  border: 1px solid $color-silver;
  border-radius: 2px;
  box-shadow: none;
  width: 300px;
  padding: 5px;
  font-size: 16px;
}

.made-as-it-is {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  z-index: -12000;
}

.button {
  @include breakpoint($tablet) {
    margin-left: 20px;
  }
}

.control {
  margin: 10px 0;
}

</style>

<script>
export default {
	props: [ "inReplyTo" ],
	data () {
		return {
			commentBody: "",
			fax: 1,
			fullName: ""
		}
	},
	mounted () {
		this.$refs.faxthis.classList.add("made-as-it-is")
	},
	computed: {
		userFullName () {
			if (this.$store.state.user) {
				return this.$store.state.user.fullName
			} else {
				return null
			}
		}
	},
	methods: {
		sendForm () {
			return new Promise((resolve, reject) => {
				return this.$store.dispatch("WRITE_COMMENT", {
					comment: this.commentBody,
					reply: this.inReplyTo,
					fullName: this.userFullName || this.fullName,
					campaignId: this.$route.params.id,
					contact_us_by_fax_only: this.fax
				})
					.then(data => {
						alert(`"${data.data.comment}", added by ${data.data.fullName}`)
					})
					.catch(err => {
						reject(err)
					})
			})
		}
	}
}
</script>
