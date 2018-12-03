<template>
  <div id="search_input">
    <input 
      :type="type" 
      v-bind:value="value"
      :placeholder="tips"
      v-on:input="$emit('input', $event.target.value)"
      class='input_block'>
    <!-- <span class="close">x</span> -->
  </div>
</template>
<script>
  export default {
    props: {
      tips: String,
      value: String,
      type: String
    },
    data() {
      return {
        // value: this.val
      }
    },
    methods: {
    }
  }
</script>
<style lang='less'>
@import '~@/assets/styles/common.less';
#search_input{
  .wh(100%; @input-h);
  .rel();
  .close{
    .abs();
    .lh-h(@input-h);
    top: 0;
    right: .3rem;
  }
}
</style>
