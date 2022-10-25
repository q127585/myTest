z<template>
	<view>
		<Search></Search>
		<view class="ul">
			<scroll-view class="left" scroll-y="true" :style="{height:scrollHeight + 'px'}">
				<view @click="handler(index)" :class="{active:active==index}" class="li"
					v-for="(item,index) in cateList" :key="index">
					<text>{{item.cat_name}}</text>
				</view>
			</scroll-view>
			<scroll-view class="right" scroll-y="true">
				<view class="li">
					<view class="leveltwo">{{level2[0].cat_name}}</view>
				</view>
				<view class="img">
					<view v-for="(item,index) in  level2[0].children" :key="index">
						<image @click="gotoGoodsList(item)" :src="item.cat_icon" mode=""></image>
						<view>{{item.cat_name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Search from '@/components/search/search'
	export default {
		data() {
			return {
				cateList: [],
				scrollHeight: '',
				active: 0,
				level2: ''
			};
		},
		components:{Search},
		methods: {
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			handler(i) {
				this.active = i
				this.level2 = this.cateList[i].children
			}
		},
		mounted() {
			uni.$http.get('categories').then(res => {
				this.cateList = res.data.message
				this.level2 = res.data.message[0].children
			})
			let res = uni.getSystemInfoSync()
			this.scrollHeight = res.windowHeight
		}
	}
</script>

<style lang="scss">
	.ul {
		display: flex;

		.left {
			width: 240rpx;

			.li {
				width: 240rpx;
				line-height: 120rpx;
				text-align: center;
				position: relative;
			}
		}
	}

	.right {
		width: 100%;

		.img {
			display: flex;
			flex-wrap: wrap;
			text-align: center;
			justify-content: space-around;

			image {
				width: 80px;
				height: 80px;
			}
		}

		.leveltwo {
			text-align: center;
			line-height: 60px;
			background-color: #fff;
		}
	}

	.active {
		background-color: #fff;

		::before {
			content: '';
			background-color: #c00000;
			width: 4px;
			position: absolute;
			left: 1px;
			top: 50%;
			transform: translateY(-50%);
			height: 30px;
		}
	}
</style>
