<template>
	<view class="myOrder">
		<view class="order-content">
			<view class="title-content">
				<view class="title">预约编码：232323</view>
				<view class="value">待审核</view>
			</view>
			<view class="field-content">
				<view class="field">孩子出生日期</view>
				<view class="value">2024-09-08</view>
			</view>
			<view class="field-content">
				<view class="field">孩子体重</view>
				<view class="value">2</view>
			</view>
			<view class="field-content">
				<view class="field">联系人</view>
				<view class="value">2</view>
			</view>
			<view class="field-content">
				<view class="field">联系电话</view>
				<view class="value">323232323</view>
			</view>
			<view class="field-content">
				<view class="field">预约日期</view>
				<view class="value"></view>
			</view>
			<view class="field-content">
				<view class="field">预约时段</view>
				<view class="value"></view>
			</view>
			<view class="end-content">
				<view class="field">座椅名称</view>
				<view class="value">反向安全座椅</view>
			</view>
			<view class="btn">取消预约</view>
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
		}
	}
</script>

<style lang="scss" scoped>
.myOrder{
	.order-content{
		margin: 30px 20px;
		.title-content,.field-content,.end-content{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.btn{
			text-align: center;
		}
	}
}
</style>
