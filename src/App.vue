<template>
  <div id="app">
    <router-view></router-view>
    <svg-icon/>
  </div>
</template>

<script>
import svgIcon from '@/components/common/svg'

export default {
  name: 'app',
  components: {
    svgIcon
  }
}
</script>

<style lang='less'>
@import '~@/assets/styles/variable';
body{
  background: @bg-col;
}
</style>
