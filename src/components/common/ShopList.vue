<template>
  <div id="title_bar">
    <section class="list">
      <header class="title">
        <svg class="shop_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
        </svg>
        <span>附近商家</span>
      </header>
      <ul class='shop_list' v-if='shopList.length !== 0'>
        <li v-for='item in shopList' :key='item.id'>
          <div class="flex">
            <div class="flex-item shop_thumb">
              <img :src="'/img/' + item.image_path" alt="">
            </div>
            <div class="flex-item center">
              <header>
                <span>{{item.name}}</span>
              </header>
              <h3>
                <rate-star class='rote_star' :rating = 'item.rating'></rate-star>
                <span>月销{{item.recent_order_num}}单</span>
              </h3>
              <h3>
                <span>￥20起送/{{item.piecewise_agent_fee.tips}}</span>
              </h3>
            </div>
            <div class="flex-item right">
              <h3>
                <span v-for='i in item.supports' :key='i.id'>{{i.icon_name}}</span>
              </h3>
              <h3 class='tips'>
                <span>{{item.delivery_mode.text}}</span>
                <span class='light_box'>准时达</span>
              </h3>
              <h3>
                <span>{{item.distance}}/<span class='time'>{{item.order_lead_time}}分钟</span></span>
              </h3>
            </div>
          </div>
        </li>
      </ul>
      <ul v-else class="animation_opactiy">
        <li class="list_back_li" v-for="item in 10" :key="item">
          <img src="../../images/shopback.svg" class="list_back_svg">
        </li>
      </ul>
    </section>
    <transition name="loading">
			<loading v-show="shopList.length === 0"></loading>
		</transition>
  </div>
</template>
<script>
import RateStar from './RateStar'
import loading from './loading'
export default {
  components: {
    RateStar,
    loading
  },
  props: {
    shopList: Array
  },
  data() {
    return {
      imgBaseUrl: 'https://fuss10.elemecdn.com/', //图片域名地址
    }
  }
}
</script>

<style lang='less'>
@import '~@/assets/styles/utils';
#title_bar{
  .bg-c();
  .m-t(@gap);
  .list{
    .title{
      .m-b(@gap);
      .p-t(@gap);
      svg{
        fill: @fc-light;
        .wh(@fz-small);
        .m-l(@gap);
      }
      span{
        .col(@fc-light);
        .fz(@fz-small);
        .m-l(@gap);
      }
    }
    .shop_list{
      padding: @gap;
      &>li{
        .m-t(@big-gap);
      }
      .flex{
        .dfx();
      }
      .flex-item{
        flex: 1
      }
      .shop_thumb{
        flex: 0 0 25%;
        img{
          width: 80%;
        }
      }
      .center{
        header{
          span{
            .col(@fc-black);
            font-weight: bold;
            &:before{
              .bg-c(#ffd930);
              content: '品牌';
              .fz(@fz-mini);
              .col(@fc-black);
              .m-r(@gap);
              padding: 0 .1rem;
            }
            .fz(@fz-small);
          }
        }
        h3{
          .rote_star{
            .dib();
            .m-r(.2rem);
          }
          span{
            .col(@fc-grey);
            .fz(@fz-mini);
          }
        }
      }
      .right{
        h3{
          text-align: right;
          .p-r(@gap);
          span{
            .col(@fc-light);
            .fz(@fz-mini);
            .time{
              .col(@blue);
            }
          }
        }
        .tips{
          span{
            .bg-c(@blue);
            .col(#fff);
            .lh-h(.5rem);
            .fz(@fz-mini);
            .bor(1px solid @blue);
            .bor-rad();
            padding: 0 .2rem;
            .m-r(.1rem);
            
          }
          .light_box{
            box-sizing: border-box;
            .bg-c(#fff);
            .col(@blue);
            .bor(1px solid @blue);

          }
        }
      }
    }
  }
  .loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}
}
</style>
