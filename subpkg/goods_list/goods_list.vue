<template>
	<view>
		<view class="ul">
			<view class="li" v-for="(item,index) in searchList" :key="index">
				<view class="left">
					<image @click="gotodetail(item)" :src="item.goods_big_logo || '../../static/c1.png'" mode="">
					</image>

				</view>
				<view class="right">
					<view class="aaa">
						{{item.goods_name}}
					</view>
					<text>{{item.goods_price | price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				searchList: []
			};
		},
		filters:{
			price(e){
				return e.toFixed(2)
			}
		},
		onReachBottom() {
			this.obj.pagenum += 1
			this.getSearch()
		},
		onPullDownRefresh() {
			this.obj.pagenum = 1
			this.searchList = []
			this.getSearch()
			uni.stopPullDownRefresh()
		},
		methods: {
			gotodetail(item) {
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			},
			getSearch() {
				uni.$http.get('goods/search', this.obj).then(res => {
					if (this.searchList.length == res.data.message.total) {
						return uni.showToast({
							title: '已滑到最底部',
							duration: 1500
						})
					}
					this.searchList = [...this.searchList, ...res.data.message.goods]
				})
			}
		},
		onLoad(e) {
			this.obj.cid = e.cid
			this.getSearch()
		}
	}
</script>

<style lang="scss">
	.li {
		display: flex;
		margin-bottom: 3px;
		border-bottom: 1px solid #aaa;

		.left {
			width: 100px;
			height: 100px;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.right {
			flex: 1;
			padding: 8px;

			.aaa {
				margin: 10px 0;
			}

			text {
				color: red;
			}
		}
	}
</style>
