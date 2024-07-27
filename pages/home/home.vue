<template>
	<view class="content">
		<div class="item" @click="navigateTo3DExhibitionHall()">
			<img src="/static/1.png" alt="" />
			<span>3D线上展厅</span>
		</div>
		<div class="item" @click="bookExhibitionHall()">
			<img src="/static/2.png" alt="" />
			<span>预约展馆</span>
		</div>
		<div class="item" @click="reserveSeat()">
			<img src="/static/3.png" alt="" />
			<span>预约座椅</span>
		</div>
		<div class="item" @click="answerQuizForPrize()">
			<img src="/static/4.png" alt="" />
			<span>答题领奖</span>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	onLoad() {

	},
	methods: {
		navigateTo3DExhibitionHall() {
			uni.navigateTo({url: '/pages/exhibition/exhibition'})
		},
		bookExhibitionHall() {
			uni.navigateTo({url: '/pages/reserveShowroom/reserveShowroom'})
		},
		reserveSeat() {
			uni.navigateTo({url: '/pages/reserveSeat/reserveSeat'})
		},
		answerQuizForPrize() {
			uni.navigateTo({url: '/pages/question/question'})
		},
	}
}
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	.item {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
		img {
			width: 344px;
			height: 110px;
		}
		span {
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			font-size: 24px;
			color: #FFFFFF;
			line-height: 33px;
			text-shadow: 0px 2px 0px #2276C8;
			text-align: left;
			font-style: normal;
		}
	}
	.item:nth-child(odd){
		span {
			position: absolute;
			left: 30px;
		}
	}
	.item:nth-child(even){
		span {
			position: absolute;
			right: 30px;
		}
	}
}
</style>
