<template>
	<view class="myOrder">
		<view class="order-content">
			<view class="title-content">
				<view class="title">预约编码：232323</view>
				<view class="value">待审核</view>
			</view>
			
			<view class="field-content" v-if="type == 1">
				<view class="field">称呼</view>
				<view class="value">2024-09-08</view>
			</view>
			<view class="field-content" v-if="type == 1">
				<view class="field">单位</view>
				<view class="value">2024-09-08</view>
			</view>
			<view class="field-content" v-if="type == 1">
				<view class="field">电话</view>
				<view class="value">2024-09-08</view>
			</view>
			<view class="field-content" v-if="type == 1">
				<view class="field">人数</view>
				<view class="value">2024-09-08</view>
			</view>
			
			<view class="field-content" v-if="type == 2">
				<view class="field">孩子出生日期</view>
				<view class="value">2024-09-08</view>
			</view>
			<view class="field-content" v-if="type == 2">
				<view class="field">孩子体重</view>
				<view class="value">2</view>
			</view>
			<view class="field-content" v-if="type == 2">
				<view class="field">联系人</view>
				<view class="value">2</view>
			</view>
			<view class="field-content" v-if="type == 2">
				<view class="field">联系电话</view>
				<view class="value">323232323</view>
			</view>
			<view class="field-content" v-if="type == 2">
				<view class="field">预约日期</view>
				<view class="value"></view>
			</view>
			<view class="field-content" v-if="type == 2">
				<view class="field">预约时段</view>
				<view class="value"></view>
			</view>
			
			
			<view class="end-content-ex" v-if="type == 1">
				<view class="field">时间</view>
				<view class="value">
					<view class="first-line">
						2024-8-16
					</view>
					<view class="second-line">
						（上午）09：00-11：00
					</view>
				</view>
			</view>
			
			<view class="end-content-seat" v-if="type == 2">
				<view class="field">座椅名称</view>
				<view class="value">反向安全座椅</view>
			</view>
			
			
			<view class="btn" @click="cancel">取消预约</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1 // 1 从科普中心  2  从座椅
			}
		},
		onLoad(option) {
			this.type = option.type
		},
		methods: {
			cancel(){
				uni.showModal({
					title: '提示',
					content: '您确定要取消吗',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
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
.myOrder{
	background-color: #f7f7f7;
	width: 100%;
	height: 100vh;
	padding: 30px 20px;
	box-sizing: border-box;
	.order-content{
		box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
		background: #ffffff;
		padding: 20px 30px;
		border-radius: 15px;
		.title-content,.field-content,.end-content,.end-content-seat{
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
			.value{
				text-align: right;
			}
		}
		.end-content-seat{
			border-top: 1px dashed #333333;
			padding-top: 10px;
			margin-top: 10px;
		}
		.btn{
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
