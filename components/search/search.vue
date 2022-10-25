<template>
	<view>
		<view class="search">
			<view @click="goSearch">
				<uni-icons type="search" size="20"></uni-icons>搜索
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		name: "search",
		data() {
			return {

			};
		},
		methods:{
			goSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.search{
		width: 100%;
		background-color: #c00000;
		height: 50px;
		line-height: 50px;
		overflow: hidden;
		view{
			width: 80%;
			background-color: white;
			margin: 5px 10%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			border-radius: 10px;
		}
	}
</style>
