<template>
  <div class="container is-fluid white-bg campaign-campaigner__wrapper">
    <div class="campaign-body">
      <div class="campaign-campaigner">
        <figure class="campaign-campaigner__avatar">
          <img class="campaign-campaigner__img" :src="campaign.profilePicUrl" :alt="campaign.campaigner.name">
        </figure>
        <div class="campaign-campaigner__details">
          <div class="campaign-campaigner__detail-item-wrapper">
            <div class="campaign-campaigner__detail-item">
              <Icons iconwidth="24px" iconheight="24px" icon="location" color="#f0f0f0" class="campaign-campaigner__icon"/>
              <span class="campaign-campaigner__location" v-html="campaign.campaigner.location"></span>
            </div>
            <div class="campaign-campaigner__detail-item">
              <Icons iconwidth="24px" iconheight="24px" icon="email" color="#f0f0f0" class="campaign-campaigner__icon"/>
              <span class="campaign-campaigner__contact">Contact</span>
            </div>
            <div class="campaign-campaigner__subscribe">
              <div class="button is-warning">+Subscribe to receive updates</div>
            </div>
          </div>
        </div>
      </div>
      <div class="campaign-campaigner__description">
        <p v-html="campaign.description"></p>
        <SharingIconsRow :key="$route.fullPath" :route-path="$route.fullPath" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.campaign-body {
  border-top: 1px solid $color-light-gray;
}

.campaign-campaigner {
  display: flex;

  &__wrapper {
    padding-top: 20px;    
  }

  &__name {
    font-size: 20px;
    color: $color-medium-gray;
    margin-bottom: 10px;
    display: inline-block;

    @include breakpoint($tablet) {
      margin-top: 10px;
      font-size: 24px;
    }

    span {
      font-weight: bold;
    }
  }

  &__detail-item-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }

  &__details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  &__detail-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 20px;
    font-size: 14px;
  }

  &__icon {
    display: inline;
    margin-top: 6px;
  }

  &__contact {
    margin-left: 10px;
  }

  &__avatar {
    width: 160px;
    margin-right: 20px;
    display: inline-block;

    @include breakpoint($tablet) {
      width: 120px;
    }
  }

  &__description {
    padding-bottom: 20px;
    padding-top: 10px;

    figure {
      img {
        width: 100%;
      }
    }
  }
}

</style>

<script>
import Icons from "Components/general/Icons.vue"
import SharingIconsRow from "Components/general/SharingIconsRow.vue"

export default {
	props: [ "campaign" ],
	components: {
		Icons,
		SharingIconsRow
	}
}
</script>
