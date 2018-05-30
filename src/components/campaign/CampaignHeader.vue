<template>
  <div class="container is-fluid white-bg campaign-header__wrapper">
    <div class="campaign-header">
      <h1 class="campaign-header__title" v-html="campaign.name"></h1>
      <div class="campaign-nonprofit">
        <h2 class="campaign-nonprofit__subtitle">A fundraiser supporting the nonprofit:
          <figure class="campaign-nonprofit__logo">
            <img class="campaign-nonprofit__img" :src="campaign.nonprofit.logoUrl" :alt="campaign.nonprofit.name">
          </figure>
          <router-link to="campaign.nonprofit.slug" v-html="campaign.nonprofit.name"></router-link>
        </h2>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.white-bg.is-fluid {
  padding-bottom: 0 !important;
}

.campaign-header {
  &__title {
    color: $color-text;
    text-align: center;
    margin-bottom: 10px;
    padding-top: 10px;

    @include breakpoint($tablet) {
      margin-bottom: 5px;
    }
  }

  .container {
    padding-top: 40px;

    @include breakpoint($tablet) {
      background: $white;
      border-right: 1px solid $color-light-gray;
      border-left: 1px solid $color-light-gray;
    }
  }
}

.campaign-nonprofit {
  display: flex;
  text-align: center;

  @include breakpoint($tablet) {
    flex-direction: row;
    justify-content: center;
  }

  &__subtitle {
    color: $color-medium-gray;
    font-size: 18px;
    margin-bottom: 10px;

    @include breakpoint($tablet) {
      margin-bottom: 0;
    }

    a {
      color: $color-emphasis;
      text-decoration: underline;
    }
  }
  &__logo {
    padding-left: 10px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: sub;
  }
  &__img {
    max-height: 70px;
    @include breakpoint($mobile) {
      display: none;
    }
    @include breakpoint($tablet) {
      max-height: 20px;
    }
  }
}
</style>

<script>
export default {
	props: [ "campaign" ]
}
</script>
