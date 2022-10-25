<template>
	<view>
		<uni-swipe-action>
			<view v-for="(item,index) in list" :key="index">
				<uni-swipe-action-item :right-options="options" @click="bindClick" @change="swipeChange($event, index)">
					<view class="ul">
						<view class="left">
							<radio :checked="item.flag" @click="setFlag(index)" />
							<image :src="item.img"></image>
						</view>
						<view class="right">
							<view class="name">{{item.name}}</view>
							<text>¥{{item.price}}</text>
							<view class="num">
								<button :disabled="item.num==1" size="mini" @click="delnum(index)">-</button>
								<input type="text" v-model="item.num">
								<button size="mini" @click="addnum(index)">+</button>
							</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</view>
		</uni-swipe-action>
		<view class="bottom">
			<div class="left">
				<radio :checked="qx" @click="setqx(!qx)"/><text>全选</text>
			</div>
			<div class="right">
				<text>总价:{{sum}}</text>
				<button size="mini">结算({{num}})</button>
			</div>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import {
		mapMutations
	} from 'vuex';
	import {
		mapState
	} from 'vuex';

	export default {
		data() {
			return {
				options: [{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				index: ''
			}
		},
		computed: {
			...mapState(['list']),
			...mapGetters(['sum', 'num']),
			qx() {
				return this.list.every(item => item.flag)
			}
		},
		methods: {
			...mapMutations(['addnum', 'delnum', 'setFlag', 'delobj','setqx']),
			bindClick(e) {
				if (e.index == 1) {
					this.delobj(this.index)
				}
			},
			swipeChange(e, index) {
				this.index = index
			}
		}
	}
</script>

<style lang="scss">
	.bottom {
		width: 100%;
		border-top: 1px solid #aaa;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		height: 50px;
		line-height: 50px;

		.left {
			width: 100px;
		}

		.right {
			flex: 1;
			display: flex;
			align-items: center;

			text {
				color: red;
				margin-left: 50px;
			}

			button {
				color: white;
				position: fixed;
				right: 5px;
				bottom: 5px;
				width: 80px;
				height: 40px;
				line-height: 40px;
				background-color: #c00000;
			}
		}
	}

	.ul {
		display: flex;

		.left {
			width: 120px;
			display: flex;
			justify-content: space-around;
			align-items: center;

			image {
				width: 90px;
				height: 90px;
			}
		}

		.right {
			flex: 1;
			position: relative;

			.name {
				font-size: 15px
			}

			text {
				color: red;
				position: absolute;
				left: 5px;
				bottom: 3px;
			}

			.num {
				display: flex;
				align-items: center;
				position: absolute;
				right: 5px;
				bottom: 0;

				input {
					width: 30px;
					text-align: center;
				}
			}
		}
	}
</style>
