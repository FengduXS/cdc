<template>
	<view class="seat-form">
		<view class="bookInfo" v-if="bookInfo">
			<video id="myVideo" :src="baseUrl + bookInfo.video" :controls="true" class="video"></video>
			<view class="bookInfo-title">
				前向式安全座椅
			</view>
			<view class="divider"></view>
			<view v-html="bookInfo.detail" class="detail"></view>
			<view class="btn-conetnt">
				<button class="submit-button" @click="confirmBook">确定预约</button>
				<button class="cancel-button" @click="cancel">取消</button>
			</view>
		</view>
		<view v-else class="seat-form-conent">
			<xs-form v-model="formData" ref="form">
				<xs-form-item title="宝宝生日" name="birthday" required>
					<picker mode="date" @change="dateChange" fields="month">
						<view class="date-picker-content">
							<view class="input-mode">{{ formData.birthday.split('-')[0] }}</view>
							<span>年</span>
							<view class="input-mode">{{ formData.birthday.split('-').length > 0 && formData.birthday.split('-')[1] }}</view>
							<span>月</span>
						</view>
					</picker>
				</xs-form-item>
				<xs-form-item title="宝宝体重" name="weight" required type="input">
					<view slot="rightIcon" class="rightIcon">kg(公斤)</view>
				</xs-form-item>
				<xs-form-item title="联系人" name="realName" type="input" required placeholder="请输入联系人"></xs-form-item>
				<xs-form-item title="联系电话" name="phone" type="input" required placeholder="请输入手机号"></xs-form-item>
				<xs-form-item title="预约时间 (请提前两天预约)" name="reserveDate" required></xs-form-item>
				<picker mode="date" :value="startDate" @change="changeReserveDate" :start="startDate" :end="endDate">
					<view class="booking-date">
						<view class="date">{{ formData.reserveDate || '请选择日期' }}</view>
						<img src="/static/rili.png" alt="" />
					</view>
				</picker>
			</xs-form>
			<view class="title">选择时间段</view>
			<view class="stage-content">
				<radio-group @change="radioChange">
					<view class="radio-conetnt">
						<label v-for="(item, index) in value" :key="item.value" class="radio">
							<radio :value="item.value" />
							<view>{{ item.name }}</view>
						</label>
					</view>
				</radio-group>
			</view>
			<view class="tips">预约要求：请开车，带上安全座椅，带上孩子。</view>
			<checkbox-group @change="checkboxChange">
				<label class="policy-content">
					<checkbox :value="true" />
					<view class="info">我已阅读并同意<view class="policy" @click.stop="policyClick">《隐私政策》</view>
					</view>
				</label>
			</checkbox-group>
		</view>
		<view class="btn-content" v-if="!bookInfo">
			<button class="submit-button" @click="submit">确定</button>
		</view>
	</view>
</template>

<script>
import xsForm from '../../components/form/xs-form.vue'
import xsFormItem from '../../components/form/xs-form-item.vue'
import { baseUrl,post } from '../../utils/request.js'
import { get } from '../../utils/request.js'
export default {
	components: {
		xsForm,
		xsFormItem
	},
	data() {
		return {
			baseUrl: baseUrl,
			formData: {
				birthday: '', // 宝宝生日
				weight: '', // 宝宝体重
				realName: '', // 联系人
				phone: '', // 联系电话
				reserveDate: '', // 预约日期
				reserveTime: '09:00-11:00', // 预约时间

			},
			value: [
				{
					value: 'BRA',
					name: '09:00 - 11:00'
				},
				{
					value: 'JPN',
					name: '14:00 - 16:00'
				},
			],
			closeDate: [],
			startDate: '2024-07-09',
			endDate: '2099-07-09',
			isAgree: false,
			bookInfo: null
		}
	},
	created() {
		this.setStartDate();
		this.getCloseDate();
	},
	methods: {
		setStartDate() {
			const now = new Date();
			now.setDate(now.getDate() + 2);
			const year = now.getFullYear();
			const month = ('0' + (now.getMonth() + 1)).slice(-2);
			const day = ('0' + now.getDate()).slice(-2);
			this.startDate = `${year}-${month}-${day}`;
			console.log(this.startDate)
		},
		getCloseDate() {
			get('/reserve/closeDate', {})
				.then(res => {
					this.closeDate = res.data || []
				})
				.catch(error => {
					console.error('API请求失败:', error);
				});
		},
		dateChange(value) {
			this.formData.birthday = value.detail.value
		},
		changeReserveDate(value) {
			if (this.closeDate.find(item => item.closeDate == value.detail.value) ) {
				uni.showToast({
				  title: '该日期不可选',
				  icon: 'none'
				});
			} else {
				this.formData.reserveDate = value.detail.value
			}
		},
		radioChange(event) {
			const value = event.detail.value;
			if (value.includes('BRA')) {
				this.formData.reserveTime = '09:00-11:00';
			} else if (value.includes('JPN')) {
				this.formData.reserveTime = '14:00-16:00';
			}
		},
		checkboxChange(event) {
			if (value.detail.value.length > 0) {
				this.isAgree = true
			} else {
				this.isAgree = false
			}
		},
		submit() {
			if (!this.isAgree) {
				wx.showToast({
					title: '请先同意隐私政策',
					icon: 'none'
				});
				return;
			}
			this.$refs.form.validateFields().then(values => {
				const openId = wx.getStorageSync('openId') ?? '';
				this.formData.birthday= `${this.formData.birthday}-01`
				const params = {
					openId,
					data: this.formData
				}
				post('/reserve/seat', params)
					.then(res => {
						wx.showToast({
							title: res.msg,
							icon: 'none'
						});
						// if(res.code === '0'){
						//  uni.navigateTo({ url: '/pages/seatMatching/seatMatching' })
						// }
						if(res.code === '0'){
							this.bookInfo = res.data
						}
					})
					.catch(error => {
						console.error('API请求失败:', error);
					});
			})
		},
		policyClick() {
			uni.navigateTo({ url: '/pages/privacyPolicy/privacyPolicy' })
		},
		checkboxChange(value) {
			if (value.detail.value.length > 0) {
				this.isAgree = true
			} else {
				this.isAgree = false
			}
		},
		confirmBook(){
			let _this = this
			wx.requestSubscribeMessage({
			  tmplIds: ['Z6uCYxdHVzwc296KFWxQKtHCu6GKmCgbNeGbni71VYw'],
			  complete (res) {
				  const openId = wx.getStorageSync('openId') ?? '';
				  const params = {
				  	openId,
				  	data: _this.formData
				  }
				if(res['Z6uCYxdHVzwc296KFWxQKtHCu6GKmCgbNeGbni71VYw'] == 'accept') {
					params.data.isReserve = true
				} else {
					params.data.isReserve = false
				}
				_this.$refs.form.validateFields().then(values => {
					post('/reserve/seat', params)
					.then(res => {
						uni.showModal({
							title: '成功提交',
							content: '请在我的预约查看预约情况',
							success: function () {
								uni.navigateTo({ url: '/pages/reserveSeat/reserveSeat' })
							}
						})
					})
					.catch(error => {
						console.error('API请求失败:', error);
					});
				})
			  }
			})
		},
		cancel(){
			this.bookInfo = null
		}
	}
}
</script>

<style lang="scss" scoped>
.seat-form {
	height: 100vh;
	font-size: 14px;
	.seat-form-conent{
		padding: 20px 20px 0 20px;
		.date-picker-content {
			display: flex;
		
			.input-mode {
				width: 100px;
				height: 20px;
				background-color: #f7f7f7;
			}
		}
		
		.rightIcon {
			margin-left: 10px;
		}
		
		.booking-date {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #f7f7f7;
			padding: 8px 10px;
			border-radius: 5px;
		
			.date {
				color: #333333;
			}
		
			img {
				width: 20px;
				height: 20px;
			}
		}
		
		.title {
			text-align: center;
			margin: 40px 0 30px 0;
		}
		
		.stage-content {
			.radio-conetnt {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 20px;
			}
		
			.radio {
				display: flex;
			}
		}
		
		.tips {
			color: red;
			text-align: center;
			margin: 40px 0 30px 0;
		}
		
		.policy-content {
			margin-top: 40px;
			display: flex;
			align-items: center;
		
			.info {
				display: flex;
				align-items: center;
			}
		
			.policy {
				display: inline;
				color: blue;
			}
		}
		
	}
	.btn-content{
		position: absolute;
		width: 100%;
		padding: 0 20px;
		bottom:60px;
		box-sizing: border-box;
		.submit-button {
			background-color: blue;
			color: #ffffff;
		}
	}
	.bookInfo{
		width: 100%;
		.video{
			width: 100%;
		}
		.bookInfo-title{
			padding: 0 20px;
			line-height: 40px;
		}
		.divider{
			height: 15px;
			width: 100%;
			margin-bottom: 10px;
			background-color: #f7f7f7;
		}
		.detail{
			padding: 0 20px;
			text-align:justify;
			text-indent: 2em;
		}
		.btn-conetnt{
			padding: 0 20px;
			margin-top: 90px;
			.submit-button {
				margin-top: 20px;
				background-color: blue;
				color: #ffffff;
			}
			.cancel-button{
				margin-top: 20px;
			}
		}
	}
	
}
</style>
