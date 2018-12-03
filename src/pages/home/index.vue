<template>
  <div id='home'>
		<top-header :login='true' :logo='true'></top-header>
		<section id="current_city">
			<div class='city_tips'>
				<span>当前定位城市：</span>
				<span>定位不准时，请在城市列表中选择</span>
			</div>
			<router-link :to="{path: '/city', query: {id: guessCity.id, name: guessCity.name}}" class='guess_city'>
				<span>{{guessCity.name}}</span>
				<svg class="arrow_right">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
				</svg>
			</router-link>
		</section>
		<!-- 热门城市 -->
    <section id='hot_city'>
			<h3 class="title">
				热门城市
			</h3>
			<ul>
				<li v-for='item in hotCitys' :key='item.id'>
					<router-link :to="{path: '/city', query: {id: item.id}}">
						{{item.name}}
					</router-link>
				</li>
			</ul>
		</section>
		<!-- 所有城市列表 -->
		<section id='all_city' v-for='(val, key, index) in sortAllCitys' :key='key'>
			<h3 class="title">
				{{key}}
				<span v-if='index === 0'>（按字母顺序排列）</span>
			</h3>
			<ul>
				<li v-for='item in val' :key='item.id'>
					<router-link :to="{path: '/city', query: {id: item.id}}">
						{{item.name}}
					</router-link>
				</li>
			</ul>
		</section>
  </div>
</template>
<script>
import axios from 'axios'
import reqApi from '~/service/getDate'
import TopHeader from '~/components/TopHeader'

export default {
	components: {
		TopHeader
	},
	data() {
		return {
			guessCity: '',
			hotCitys: [],
			allCitys: {}
		}
	},
	computed: {
		sortAllCitys() {
			let sortCitys = {}
			for(let i = 65; i <= 90; i++) {
				if(this.allCitys[String.fromCharCode(i)]) {
					sortCitys[String.fromCharCode(i)] = this.allCitys[String.fromCharCode(i)]
				}
			}
			return sortCitys
		}
	},
	mounted() {
		this.getCitys()
	},
	methods: {
		getCity(type) {
			return reqApi.getCity({
				params: {
					type: type
				}
			}).then(res => {
				return res
			}).catch(err => {
				console.log(err)
			})
		},
		getCitys() {
			Promise.all([this.getCity('guess'), this.getCity('hot'), this.getCity('group')]).then(res => {
				console.log('请求成功')
				console.log(res)
				this.guessCity = res[0].data
				this.hotCitys = res[1].data
				this.allCitys = res[2].data
			}).catch(err => {
				console.log(err)
			})
		}
	}
}
</script>

<style lang='less'>
@import '~@/assets/styles/utils.less';
#home{
	background-color: @bg-col;
	#current_city{
		background-color: #fff;
		.bor-b();
		.m-b(.3rem);
		.city_tips{
			.p-t(.4rem);
			.bor-b();
			span{
				.l-h(1.45rem);
			}
			span:nth-of-type(1){
				.fz(.5rem);
				.p-l(.6rem);
				.col(#666);
			}
			span:last-of-type{
				.f-sc(.5rem; #aaa);
				.fr();
				.p-r(.6rem);
				font-weight: 600;
			}
		}
		.guess_city{
			.wh(100%; .6rem);
			.dib();
			.bor-b();
			padding: .7rem 0;
			span{
				.col();
				.lh-h(.6rem);
				.fz(.8rem);
				.p-l(.6rem);
			}
			svg{
				.p-r(.6rem);
				.wh(.6rem; .6rem);
				.fr();
				.col(#666);
			}
		}
	}
	#hot_city{
		background-color: #fff;
		.title{
			.fz(.6rem);
			padding: .4rem;
		}
		ul{
			.bor-t();
			// .bor-l();
			.clearfix();
			li>a{
				.text-autocut();
				.bor-r();
				.bor-b();
				.wh(25%, 2rem);
				.lh-h(1.8rem);
				.fl();
				box-sizing: border-box;
				text-align: center;
				.fz(.6rem);
				.col(@blue);
				&:nth-of-type(4n){
					.bor-r(none);
				}
			}
		}
	}
	#all_city:extend(#home #hot_city all){
		.m-t(.3rem);
		.bor-t();
		h3.title{
			.bor-l();
		}
		ul{
			li{
				.col(@f-c);
			}
		}
	}
}
</style>
