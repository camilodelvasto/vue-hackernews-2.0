<template>
  <div class="hello">
    <h1>{{ nonprofitName }}</h1>
    <h2>Basic data</h2>
    <ul>
      <li><strong>EIN</strong>: {{fields.EIN}}</li>
      <li><strong>NAME</strong>: {{fields.NAME}}</li>
      <li><strong>STREET</strong>: {{fields.STREET}}</li>
      <li><strong>CITY</strong>: {{fields.CITY}}</li>
      <li><strong>STATE</strong>: {{fields.STATE}}</li>
      <li><strong>ZIP</strong>: {{fields.ZIP}}</li>
      <li><strong>ACTIVITY</strong>: {{fields.ACTIVITY}}</li>
      <li><strong>NTEE_CD</strong>: {{fields.NTEE_CD}}</li>
      <li><strong>SORT_NAME</strong>: {{fields.SORT_NAME}}</li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

export default {
  name: 'About',
  data () {
    return {
      nonprofitName: 'Generic Nonprofit',
      title: '',
      fields: []
    }
  },
  metaInfo () {
    return {
      title: this.title,
      // override the parent template and just use the above title only
      titleTemplate: null,
      meta: [
        { hid: 'description', name: 'description', content: this.fields.ACTIVITY },
        { hid: 'og:url', property: 'og:url', content: 'https://volunteerathon.com/' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:title', property: 'og:title', content: this.fields.NAME },
        { hid: 'og:image', property: 'og:image', content: 'https://res.cloudinary.com/startics/image/upload/v1523024114/truck_twugdy.png' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'volunteerathon' },
        { hid: 'og:description', property: 'og:description', content: this.fields.ACTIVITY },
        { hid: 'twitter:card', property: 'twitter:card', content: this.fields.ACTIVITY },
        { hid: 'twitter:image', property: 'twitter:image', content: 'https://startcrowd.club/images/startcrowdimage.jpg' },
      ]
    }
  },
  beforeCreate () {
    axios.get(`https://irs-eomf-search-api.herokuapp.com/v1/nonprofits/${this.$route.params.ein}`)
      .then(response => {
        this.title = response.data[0].NAME
        this.fields = response.data[0]
        document.dispatchEvent(new Event('custom-render-trigger'))
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
