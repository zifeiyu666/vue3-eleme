<template>
  <div id='top_header'>
    <section id='logo' v-if='logo'>
      <span>ele.me</span>
    </section>
    <section id="search" v-if='search'>
      <router-link :to="'/search/geohash'" class="link_search" slot="search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
          <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </router-link>
    </section>
    <section id='goback' v-if='goback' @click='goBack()'>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
      </svg>
    </section>
    
    <section id="title" v-if='title'>
      <span>{{title}}</span>
    </section>
    <section id='login' v-if='login'>
      <span >登陆|注册</span>
      <span v-if='false'>头像</span>
    </section>
    <section id='change_city' v-if='changeCity'>
      <span>切换城市</span>
    </section>
  </div>
</template>
<script>
  export default {
    props: {
      login: Boolean,
      title: String,
      logo: Boolean,
      search: Boolean,
      goback: Boolean,
      changeCity: Boolean
    },
    methods: {
      goBack() {
        this.$router.go('-1')
      }
    }
  }
</script>
<style lang='less'>
  @import '~@/assets/styles/base.less';
  #top_header{
    .wh(100vw, 2rem);
    background: @blue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    #logo {
      // .fl();
      flex:  1;
      text-align: left;
      span{
        .lh-h(2rem);
        .f-sc(.7rem, #fff);
        .p-l(.7rem);
      }
    }
    
    #goback{
     flex:  1;
     height: 1rem;
     padding-left: .4rem;
     svg{
       width: 1rem;
       height: 1rem;
     }
    }
    #search:extend(#top_header #goback) {
      
    }
    #login{
      flex: 1;
      text-align: right; 
      .p-r(.4rem);
      span:extend(#top_header #logo span){
        .p-l(0);
        .fz(.6rem);
      };
      .fr();
    }
    #title{
      text-align: center;
      flex: 3;
      .lh-h(2rem);
      .col(#fff);
      .fz(.8rem);
      font-weight: 600;
      .text-autocut();
    }
    #change_city:extend(#top_header #title){
      text-align: right;
      flex: 1;
      .p-r(.4rem);
      .fz(.6rem);
      font-weight: normal;
    }
  }
</style>