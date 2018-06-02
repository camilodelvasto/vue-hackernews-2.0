<template>
  <div class="comment-reply__wrapper">
    <form placeholder="Write your message">
      <textarea type="text" v-model="commentBody" rows="3" cols="75">
      </textarea>
      <input ref="faxthis" type="checkbox" name="contact_us_by_fax_only" value="1" tabindex="-1" autocomplete="off">
      <button type="button" class="button">Add comment</button>
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

</style>

<script>
export default {
	props: [ "parent-comment" ],
	data () {
		return {
			commentBody: ""
		}
	},
	mounted () {
		this.$refs.faxthis.classList.add("made-as-it-is")
	}
}
</script>
