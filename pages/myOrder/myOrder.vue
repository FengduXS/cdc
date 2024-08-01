<template>
	<view class="myOrder">
		<view class="order-content" v-for="(item, index) in list" :key="index">
			<view class="title-content">
				<view class="title">预约编码：{{ item.reserveNo }}</view>
				<view class="value" v-if="item.status === '1'">待审核</view>
				<view class="value" v-if="item.status === '4'">自主取消</view>
			</view>
			<view class="field-content" v-if="type == 1">
				<view class="field">称呼</view>
				<view class="value">{{ item.realName }}</view>
			</view>
			<view class="field-content" v-if="type == 1">
				<view class="field">单位</view>
				<view class="value">{{ item.company }}</view>
			</view>
			<view class="field-content" v-if="type == 1">
				<view class="field">电话</view>
				<view class="value">{{ item.phone }}</view>
			</view>
			<view class="field-content" v-if="type == 1">
				<view class="field">人数</view>
				<view class="value">{{ item.reserveNum }}</view>
			</view>

			<view class="field-content" v-if="type == 2">
				<view class="field">孩子出生日期</view>
				<view class="value">{{ item.birthday }}</view>
			</view>
			<view class="field-content" v-if="type == 2">
				<view class="field">孩子体重</view>
				<view class="value">{{ item.weight }}Kg</view>
			</view>
			<view class="field-content" v-if="type == 2">
				<view class="field">联系人</view>
				<view class="value">{{ item.realName }}</view>
			</view>
			<view class="field-content" v-if="type == 2">
				<view class="field">联系电话</view>
				<view class="value">{{ item.phone }}</view>
			</view>
			<view class="field-content" v-if="type == 2">
				<view class="field">预约日期</view>
				<view class="value">{{ item.reserveDate }}</view>
			</view>
			<view class="field-content" v-if="type == 2">
				<view class="field">预约时段</view>
				<view class="value">{{ item.reserveTime }}</view>
			</view>


			<view class="end-content-ex" v-if="type == 1">
				<view class="field">时间</view>
				<view class="value">
					<view class="first-line">
						{{ item.reserveDate }}
					</view>
					<view class="second-line">
						{{ item.reserveTime === "09:00-11:00" ? '(上午)' : '(下午)' }}{{ item.reserveTime }}
					</view>
				</view>
			</view>

			<view class="end-content-seat" v-if="type == 2">
				<view class="field">座椅名称</view>
				<view class="value">{{ item.seatName }}</view>
			</view>


			<view class="btn" @click="cancel(item.reserveNo)" v-if="item.status !== '4'">取消预约</view>
		</view>
	</view>
</template>

<script>
import { post } from '../../utils/request.js'
import ReserveShowroom from '../reserveShowroom/reserveShowroom.vue';
export default {
	data() {
		return {
			type: 1, // 1 从科普中心  2  从座椅
			list: []
		}
	},
	onLoad(option) {
		this.type = option.type
		this.getData();
	},
	methods: {
		getData() {
			const params = {
				openId: wx.getStorageSync('openId') ?? ''
			}
			const url = this.type === 1 ? '/reserve/showroom/list' : '/reserve/seat/list'
			const url2 = this.type === 1 ? '/pages/reserveShowroom/reserveShowroom' : '/pages/reserveSeat/reserveSeat'
			post(url, params)
				.then(res => {
					this.list = res.data;
					if (!this.list.length) {
						wx.showToast({
							title: '您还没有预约，请先预约！',
							icon: 'none'
						});
						uni.navigateTo({ url: url2 })
					}
				})
				.catch(error => {
					console.error('API请求失败:', error);
				});
		},
		cancel(reserveNo) {
			let _this = this
			uni.showModal({
				title: '提示',
				content: '您确定要取消吗?',
				success: function (res) {
					console.log(_this)
					if (res.confirm) {
						const url = this.type === 1 ? '/reserve/showroom/cancelReserve' : '/reserve/seat/cancelReserve'
						const p = {
							openId: wx.getStorageSync('openId') ?? '',
							data: {
								openId: wx.getStorageSync('openId') ?? '',
								reserveNo
							}
						}
						post(url, p)
							.then(res => {
								if (res.code != '0') {
									wx.showToast({
										title: res.msg,
										icon: 'none'
									});
								}else {
									_this.getData()
								}
							})
							.catch(error => {
								console.error('API请求失败:', error);
							});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.myOrder {
	background-color: #f7f7f7;
	width: 100%;
	height: 100vh;
	padding: 30px 20px;
	box-sizing: border-box;

	.order-content {
		box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
		background: #ffffff;
		padding: 20px 30px;
		border-radius: 15px;
		margin-bottom: 16px;

		.title-content,
		.field-content,
		.end-content,
		.end-content-seat {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.title-content {
			font-size: 16px;
			font-weight: bold;
			line-height: 30px;
			border-bottom: 1px solid black;
			padding-bottom: 10px;
			margin-bottom: 10px;

			.title {
				color: #333333;
			}

			.value {
				color: red;
				text-align: right;
			}
		}

		.field-content {
			color: #333333;
			line-height: 30px;
		}

		.end-content-ex {
			display: flex;
			justify-content: space-between;
			border-top: 1px dashed #333333;
			padding-top: 10px;
			margin-top: 10px;

			.value {
				text-align: right;
			}
		}

		.end-content-seat {
			border-top: 1px dashed #333333;
			padding-top: 10px;
			margin-top: 10px;
		}

		.btn {
			text-align: center;
			margin: 10px 30px;
			background: blue;
			color: #ffffff;
			line-height: 40px;
			border-radius: 8px;
		}
	}
}
</style>
