<template>
  <div class="card column card-loop">
    <div class="transition-wrapper" v-for="(image, index) in imgarr">
      <transition name="fade" mode="out-in">
        <div class="card-content card-taller" 
          :style="`backgroundImage: url(${imgarr[index].imgsrc})`" v-if="index === currentImg % imgarr.length"></div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>

<script>
export default {
  props: [ 'imgarr', 'delay', 'interval' ],
  data () {
    return {
      currentImg: 0,
      timer: null
    }
  },
  mounted () {
    this.startRotation()
  },
  methods: {
    startRotation () {
      var vm = this
      setTimeout(function() {
        vm.timer = setInterval(vm.next, vm.interval)
      }, vm.delay)
    },
    next: function () {
      this.currentImg++
    },
    prev: function () {
      this.currentImg--
    }
  }
}
</script>
