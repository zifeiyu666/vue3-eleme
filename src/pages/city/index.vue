<template>
  <div id='city'>
    <top-header :goback='true' :changeCity='true' :title='cityName'></top-header>
    <section class="search">
      <search-input type='search' tips="输入学校、商务楼、地址 " v-model="searchText"></search-input>
      <button class="btn_block" @click='getLocation'>提交</button>
    </section>
    <section class="result" v-if='this.result.length !== 0'>
      <ul>
        <li v-for='(item, index) in result' :key='index' @click='nextPage(item)'>
          <h3>{{item.name}}</h3>
          <p>{{item.address}}</p>
        </li>
      </ul>
    </section>
    <section class="history" v-if='this.result.length === 0 && this.historyList.length !== 0'>
      <h3 class='title'>搜索历史</h3>
      <ul>
        <li v-for='(item, index) in historyList' :key='index' @click='nextPage(item)'>
          <h3>{{item.name}}</h3>
          <p>{{item.address}}</p>
        </li>
        <li class='clear_all' @click='clearHistory'>
          清空所有
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
import reqApi from '~/service/getDate'
import TopHeader from '~/components/TopHeader'
import SearchInput from '@/components/common/SearchInput'
export default {
  components: {
    TopHeader,
    SearchInput
  },
  data() {
    return {
      cityId: '',
      cityName: '',
      searchText: '',
      result: []
    }
  },
  computed: {
    historyList () {
      return this.$store.state.historyList
    }
  },
  mounted() {
    let query = this.$route.query
    console.log(query)
    if(query) {
      this.cityId = query.id
      this.cityName = query.name
    }
    
  },
  methods: {
    getLocation() {
      reqApi.searchplace({
        params: {
          type: 'search',
          city_id: this.cityId,
          keyword: this.searchText
        }
      }).then(res => {
        this.result = res.data ? res.data : []
      }).catch(err => {
        this.result = []
      })
    },
    nextPage(item) {
      this.$store.commit('saveHistory', item)
      this.$router.push({path:'/msite', query:{geohash: item.geohash, name: item.name}})
    },
    clearHistory() {
      this.$store.commit('clearHistory')
    }
  }
}
</script>
<style lang='less'>
@import '~@/assets/styles/utils';
#city{
  .search{
    .bor-tb();
    .m-t();
    .bg-c();
    padding: @gap @big-gap;
    .btn_block{
      .m-t();
    }
  }
  .result{
    .bg-c();
    li{
      .bor-b();
      padding: @gap @big-gap;
      h3{
        .fz(@fz-middle);
        .lh-h(1.2rem);
      }
      p{
        .fz(@fz-mini);
        .lh-h(.8rem);
        .col(@fc-light);
        .text-autocut();
      }
    }
    
  }
  .history:extend(#city .result all){
    h3.title{
      .fz(@fz-mini);
      .bg-c(@bg-col);
      padding: @gap @big-gap;
    }
    .clear_all{
      .lh-h(1.4rem);
      text-align: center;
      .bor-b(none);
      .col(@fc-grey)
    }
  }
}
</style>
