<template>
  <div class="hello">
    <AppHeader></AppHeader>
    <h1>404 - not found.</h1>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue"

export default {
	name: "*",
	components: { AppHeader }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
a
  color: orange
</style>
