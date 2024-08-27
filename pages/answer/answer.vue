<template>
	<view class="question-list">
		<view class="item" v-for="(item,index) of question" :key="item.questionId">
			<view class="title">
				{{index + 1}}.{{item.questionName}}
			</view>
			<radio-group class="answer-list" @change="radioChange($event,item)"  v-if="item.answerList">
				<label class="answer-item" v-for="answer of item.answerList" :key="answer.answerId">
					<radio :value="answer.answerId"/>
					<view class="answer">{{answer.answerContent}}</view>
				</label>
			</radio-group>
		</view>
		<view class="submit" @click="submit" v-if="question && question.length">提交</view>
	</view>
</template>

<script>
    import { post } from '../../utils/request.js'
	export default {
		data() {
			return {
				question:[]
			};
		},
		created() {
		    this.fetchData();
		},
		methods: {
			radioChange(answer,item){
				item.answer = answer.detail.value
			},
			fetchData() {
		      post('/question/list',{})
		        .then(res => {
					if(res.data && res.data.length){
						this.question = res.data.map(item=> {
							return {...item, answer:''}
						})
					}
		        })
		        .catch(error => {
		          console.error('API请求失败:', error);
		        });
		    },
			submit(){
				let valide = true
				this.question.forEach(item => {
					if(item.answer == ''){
						valide = false
					}
				})
				if (valide){
					const openId = wx.getStorageSync('openId') ?? '';
					let param = {
						openId,
						data: this.question.map(item => {
							return {
								...item,
								answerList: [item.answerList.find(answer => {
									return answer.answerId == item.answer
								})]
							}
						})
					}
					let _this =this
					post('/question/checkAnswer',param)
					  .then(res => {
						  if (res.code !== '0') {
						  	wx.showToast({
						  		title: res.msg,
						  		icon: 'none'
						  	});
							
						}else {
							if(res.data.correctQuantity === 5){
								uni.showModal({
									title: '成功提交',
									content: '恭喜你，共答对5道题，是否到现场领取礼品',
									confirmText: '立即预约',
									success: function () {
										uni.navigateTo({ url: '/pages/reserveShowroom/reserveShowroom' })
									},
									cancel:function() {
										uni.navigateTo({ url: '/pages/question/question' })
									}
								})
							} else {
								uni.showModal({
									title: '成功提交',
									content: `很抱歉，共答对${res.data.correctQuantity}道题，需要全部答对才可以领取礼品哦`,
									confirmText: '重新答题',
									success: function () {
										_this.question = []
										_this.fetchData()
									},
									cancel:function() {
										uni.navigateTo({ url: '/pages/question/question' })
									}
								})
							}
						}
					  })
					  .catch(error => {
						console.error('API请求失败:', error);
					  });
				} else {
					uni.showToast({
					    title: '请完成答题',
					    icon: 'error',
					    duration: 2000
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.question-list {
	padding: 10px 20px 20px 20px;
	.item{
		.title{
			margin-bottom: 10px;
		}
		.answer-list{
			display: flex;
			flex-wrap: wrap;
			.answer-item{
				margin-left: 10px;
				margin-bottom: 10px;
				display: flex;
				.answer{
					margin-left: 5px;
					line-height: 25px;
				}
			}
		}
	}
	.submit{
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 14px;
		color: #FFFFFF;
		line-height: 20px;
		text-align: right;
		font-style: normal;
		text-transform: none;
		line-height: 42px;
		
		background: linear-gradient( 317deg, #1BD4FF 0%, #3898FF 100%);
		border: 1px solid #21C4FF;
		text-align: center;
		border-radius: 20px;
		    margin-top: 60px;
	}
}
</style>
