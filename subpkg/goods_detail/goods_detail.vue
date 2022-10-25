<template>
	<view style="padding-bottom: 40px;">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in obj.pics" :key="index">
				<image @click="preview(index)" :src="item.pics_big" mode=""></image>
			</swiper-item>
		</swiper>
		<view>
			<text class="price">¥{{obj.goods_price}}</text>
			<view>{{obj.goods_name}}</view>
		</view>
		<view v-html="obj.goods_introduce"></view>
		<uni-goods-nav class="goods-carts" :fill="true" :options="options" :buttonGroup="buttonGroup"
			@buttonClick="buttonClick" @click="onClick" />
	</view>
</template>

<script>
import { mapMutations } from 'vuex';
	export default {
		data() {
			return {
				obj: {},
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		methods: {
			...mapMutations(['addobj']),
			preview(index) {
				uni.previewImage({
					urls: this.obj.pics.map(item => item.pics_big_url),
					current: index
				})
			},
			onClick(e) {
				if (e.index == 1) {
					console.log('购物车');
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				if (e.index == 0) {
					
					let obj = {
						id: this.obj.goods_id,
						name: this.obj.goods_name,
						price: this.obj.goods_price,
						img: this.obj.goods_small_logo,
						num: 1,
						flag: false
					}
					this.addobj(obj)
					
				}
			}
		},
		onLoad(e) {
			uni.$http.get('goods/detail?goods_id=' + e.goods_id).then(res => {
				this.obj = res.data.message
				console.log(this.obj);
			})
		}
	}
</script>

<style lang="scss">
	.swiper {
		width: 100%;
		height: 500px;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.price {
		color: red;
	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>
