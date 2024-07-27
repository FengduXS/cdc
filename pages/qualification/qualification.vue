<template>
	<view class="qualification">
		<view v-if="!hasPrizeQualification" class="prizeQualification">
			<view class="result">暂无领奖资格</view>
			<view class="tips">需要答对全部5道题才可去现场领奖哦</view>
			<view class="button-content">
				<button class="button" @click="handleAction">立即答题</button>
			</view>
		</view>
		<view v-if="hasPrizeQualification" class="prizeQualification">
			<view class="result">恭喜你，你可凭此微信号到现场领取奖品。</view>
			<view class="button-content">
				<button class="button" @click="handleAppointment">立即预约</button>
			</view>
		</view>
	</view>
</template>

<script>
import {post } from '../../utils/request.js'
export default {
	data() {
		return {
			hasPrizeQualification: false
		};
	},
	created() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			const params = {
				"openId": "3333",
			}
			post('/question/queryQuizRecord',params).then(response => {
				this.hasPrizeQualification = response.data.quizCorrectQuantity === 5;
				console.log(this.hasPrizeQualification)
			}).catch(error => {
			  console.error('API请求失败:', error);
			})
		},
		handleAction() {
			uni.navigateTo({url: '/pages/answer/answer'})
		},
		handleAppointment() {
			// 替换成预约的地址
			uni.navigateTo({url: '/pages/exhibitionBooking/exhibitionBooking'})
		},
	}
}
</script>

<style lang="scss" scoped>
.qualification {
	height: 100vh;
	overflow: hidden;
	.prizeQualification{
		width: 100%;
		.result{
			text-align: center;
			font-size: 16px;
			font-weight: bold;
			margin-top: 50%;
		}
		.tips{
			text-align: center;
			margin-top: 60%;
		}
		.button-content{
			width: 100%;
			position: absolute;
			bottom: 30px;
			padding: 0 30px;
			box-sizing: border-box;
			.button{
				text-align: center;
				background-color: blue;
				border-radius: 5px;
				color: #fff;
			}
		}
	}
}
</style>
