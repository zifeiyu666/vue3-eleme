 <template>
	<div id="rating_container">
        <section class="star_container">
            <svg class="grey_fill" v-for="num in 5" :key="num">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
            </svg>
        </section>
        <div :style="'width:' + rating*2/5 + 'rem'" class="star_overflow">
            <section class="star_container" >
                <svg  class="orange_fill" v-for="num in 5" :key="num">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
                </svg>
            </section>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    rating: Number
  }
}
</script>

<style lang='less'>
@import '~@/assets/styles/utils';

#rating_container{
  .rel();
  svg{
    .wh(.4rem);
  }
  .grey_fill{
    fill: @grey;
  }
  .orange_fill{
    fill: @orange;
  }
  .star_container{
    height: 1.2rem;
  }
  .star_overflow{
    overflow: hidden;
    height: 1.2rem;
    .abs();
    left: 0;
    top: 0;
  }
}

</style>