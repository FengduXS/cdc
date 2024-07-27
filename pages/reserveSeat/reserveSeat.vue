<template>
	<view class="reserveSeat">
		<img src="/static/seatBack.png" alt="" class="backimg"/>
		<img src="/static/seat.png" alt="" class="seat"/>
		<div class="content">
			<div class="item" @click="jump(1)">
				<img src="/static/rili.png" alt="" class="icon"/>
				<span>预约座椅</span>
				<img src="/static/arrow.png" alt="" class="arrow"/>
			</div>
			<div class="item" @click="jump(2)">
				<img src="/static/person.png" alt="" class="icon"/>
				<span>我的预约</span>
				<img src="/static/arrow.png" alt="" class="arrow"/>
			</div>
			<div class="item" @click="jump(3)">
				<img src="/static/chair.png" alt="" class="icon"/>
				<span>切换为科普中心</span>
				<img src="/static/arrow.png" alt="" class="arrow"/>
			</div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	methods: {
		jump(data){
			let pageMap = {
				1: '/pages/seat/seat',
				2: '/pages/myOrder/myOrder?type=2',
				3: '/pages/reserveShowroom/reserveShowroom',
			}
			uni.navigateTo({url: pageMap[data]})
		}
	}
}
</script>

<style lang="scss" scoped>
.reserveSeat{
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	.backimg{
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.seat{
		width: 235px;
		height: 285px;
		margin-top: 60px;
		position: absolute;
	}
	.content{
		position: absolute;
		margin-top: 345px;
		width: calc(100% - 82px);
		.item{
			background: #FFFFFF;
			border-radius: 20px;
			display: flex;
			align-items: center;
			margin-bottom: 20px;
			padding: 0 20px;
			.icon{
				width: 20px;
				height: 20px;
				margin-right: 6px;
			}
			span{
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 14px;
				color: #1C8CEC;
				line-height: 42px;
				text-align: right;
				font-style: normal;
				text-transform: none;
			}
			.arrow{
				width: 15px;
				height: 15px;
				margin-left: auto;
			}
		}
	}
}
</style>
