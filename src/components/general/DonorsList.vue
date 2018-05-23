<template>
  <section class="donors-list" v-if="donations.length">
    <div class="container">
      <h2 v-html="title"></h2>
      <div class="donors-list__wrapper columns is-mobile is-multiline">
        <div class="donors-list__donor column is-2-desktop is-6-mobile" v-for="donor in donations">
          <p>{{donor.amount | usd}}</p>
          <figure class="donors-list__picture" :style="{backgroundImage: `url(${donor.avatar})`}"></figure>
          <p class="donor-name">
            {{donor.firstname}}<br>
            {{donor.lastname}}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['donations', 'title']
}
</script>

<style scoped lang="scss">
.donors-list {
  margin: 40px 0;

  &__picture  {
    background-size: cover;
    background-position: center center;
    width: 70%;
    padding-bottom: 70%;
    margin: auto;
    height: 0;
    border-radius: 100%;
    overflow: hidden;
  }
  &__donor {
    text-align: center;

    p.donor-name {
      margin-top: 5px;
      font-size: 15px;
    }
  }
}

</style>
