<template>
  <div id='msite'>
    <top-header :search='true' :login='true'  :title='title'></top-header>
    <section class="nav">
      <swiper :options="swiperOption" ref="mySwiper" v-if='foodTypes.length !== 0'>
        <!-- slides -->
        <swiper-slide class='nav_container'>
          <router-link to='/' v-for='item in foodTypes.slice(0,8)' :key='item.id'>
            <img :src="imgBaseUrl + item.image_url" alt="">
            <span>{{item.title}}</span>
          </router-link>
        </swiper-slide>
        <swiper-slide class='nav_container'>
          <router-link to='/' v-for='item in foodTypes.slice(8,16)' :key='item.id'>
            <img :src="imgBaseUrl + item.image_url" alt="">
            <span>{{item.title}}</span>
          </router-link>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <img src="../../images/fl.svg" class="nav_loading" v-else>
    </section>
    <shop-list :shopList='shopList'></shop-list>
  </div>
</template>
<script>
import axios from 'axios'
import reqApi from '~/service/getDate'
import TopHeader from '@/components/TopHeader'
import ShopList from '@/components/common/ShopList'
export default {
  components: {
    TopHeader,
    ShopList
  },
  data() {
    return {
      swiperOption: {
         pagination: {
            el: '.swiper-pagination'
          }
      },
      foodTypes: [],
      imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
      shopList: []
    }
  },
  computed: {
    title() {
      return this.$route.query.name
    },
    geohash() {
      return this.$route.query.geohash
    }
  },
  mounted() {
    this.getFoodTyps()
    this.getShopList()
  },
  methods: {
    getFoodTyps() {
      reqApi.msiteFoodTypes({
        params: {
          geohash: this.geohash
        }
      }).then(res => {
        this.foodTypes = res.data
      })
    },

    async getShopList() {
      let res = await reqApi.shopList({
        params: {
          latitude: 23.06321,
          longitude: 113.157406,
          offset: 0,
          limit: 20,
          keyword: '',
          restaurant_category_id: '',
          order_by: '',
        }
      })
      this.shopList = res.data

    }
    
  }
}
</script>
<style lang='less'>
@import '~@/assets/styles/utils';
#msite{
  .nav{
    .rel();
    .swiper-container{
      .bg-c();
      .swiper-wrapper{
        .m-b(1.6rem);
      }
      .nav_container{
        a{
          .m-t(.6rem);
          .db();
          width: 25%;
          .fl();
          text-align: center;
          img{
            width: 1.9rem; 
            margin: 0 auto;
            .m-b(@gap);
          }
          span{
            .db();
            .f-sc(@fz-middle; @fc-grey);
          }
        }
      }
    }
    .nav_loading{
      position: absolute;
      left: 0;
      top:0;
      z-index: -1;
    }
    
  }
  .list{

  }
}
</style>




