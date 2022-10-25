<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in pics" :key="index">
				<image class="img" :src="item.image_src" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="ul">
			<view class="li" v-for="(item,index) in catitemsList" :key="index">
				<image @click="goCate(item.name)" :src="item.image_src" mode=""></image>
			</view>
		</view>
		<view class="">
			<view class="ce" v-for="(item,index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" mode=""></image>

				<view class="aa">
					<view class="left">
						<image :src="item.product_list[0].image_src" mode=""></image>
					</view>
					<view class="right">
						<view class="" v-show="index2!=0" v-for="(item2,index2) in item.product_list" :key="index2">
							<image @click="gotoFloor(item2)" :src="item2.image_src" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pics: [],
				catitemsList: [],
				floorList: []
			};
		},
		methods: {
			gotoFloor(item) {
				console.log(1);
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list' + item.navigator_url.substring(17)
				})
			},
			goCate(name) {
				if (name == '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			}
		},
		mounted() {
			uni.$http.get('home/floordata').then(res => {
				this.floorList = res.data.message
				console.log(this.floorList);
			})
			uni.$http.get('home/swiperdata').then(res => {
				this.pics = res.data.message
			})
			uni.$http.get('home/catitems').then(res => {
				this.catitemsList = res.data.message
			})
		}
	}
</script>

<style lang="scss">
	.img {
		width: 100%;
		height: 330px;
	}

	.aa {
		display: flex;

		.left {
			width: 300rpx;

			image {
				width: 300rpx;
				height: 410rpx;
			}
		}

		.right {
			flex: 1;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;

			image {
				width: 200rpx;
				height: 200rpx;
			}
		}
	}

	.ul {
		margin: 10px 0;
		display: flex;
		justify-content: space-around;

		.li {
			width: 120rpx;

			image {
				width: 120rpx;
				height: 135rpx;
			}
		}
	}

	.ce {
		image {
			height: 50px;
		}
	}
</style>
