<template>
	<view>
		<uni-search-bar placeholder="搜索" @input="input" cancel-text="取消">
			<template v-slot:searchIcon>
				<uni-icons color="#999999" size="18" type="search" />
			</template>
		</uni-search-bar>
		<view class="center">
			<text>搜索历史</text>
			<uni-icons size="20" type="trash" />
		</view>
		<div class="hr"></div>
		<div v-show="queryList.length==0" class="ul">
			<div class="li">
				123
			</div>
		</div>
		<view class="center1" v-for="(item,index) in queryList" :key="">
			<text>{{item.goods_name}}</text>
			<uni-icons size="20" type="right" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryList: [],
				timer: null
			};
		},
		methods: {
			input(query) {
				this.timer && clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					uni.$http.get('goods/qsearch?query=' + query).then(res => {
						this.queryList = res.data.message
					})
				}, 500)

			}
		}
	}
</script>

<style lang="scss">
	.hr {
		width: 100%;
		height: 1px;
		background-color: #aaa;
		margin: 10px 0;
	}

	.center {
		display: flex;
		justify-content: space-between;
		padding: 0 5px;
	}

	.center1 {
		display: flex;
		height: 40px;
		line-height: 40px;
		justify-content: space-between;
		padding: 0 5px;
		border-bottom: 1px solid #aaa;

		text {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}

	.ul {
		display: flex;
		flex-wrap: wrap;
		padding: 0 5px;

		.li {
			margin-right: 5px;
		}
	}
</style>
