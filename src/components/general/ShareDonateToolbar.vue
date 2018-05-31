<template>
  <div class="share-toolbar__share-wrapper">
    <div class="share-toolbar__share-item share-toolbar__share-share">
      <Icons iconwidth="19px" iconheight="19px" icon="share" color="#666" class="icon" />
      <a>Share</a>
    </div>
    <div class="share-toolbar__share-item share-toolbar__share-comment" v-if="allowComment !== false">
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

</style>

<script>
import Icons from 'Components/general/Icons.vue'

export default {
  props: [ 'allowComment' ],
  components: {
    Icons
  }
}
</script>
