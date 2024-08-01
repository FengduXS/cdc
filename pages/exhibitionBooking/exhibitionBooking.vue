<template>
	<view class="exhibitionBooking">
		<view class="exhibitionBooking-content">
			<xs-form v-model="formData" ref="form">
				<xs-form-item title="称呼" name="realName" required type="input" placeholder="请输入先生或女士"></xs-form-item>
				<xs-form-item title="单位名称" name="company" type="input" placeholder="请输入您的单位名称"></xs-form-item>
				<xs-form-item title="手机号码" name="phone" type="input" required placeholder="请输入您的手机号"></xs-form-item>
				<xs-form-item title="人数" name="reserveNum" type="number" required placeholder="请输入人数"></xs-form-item>
				<xs-form-item title="预约时间(请提前两天预约)" name="reserveDate" required></xs-form-item>
				<picker mode="date" :value="startDate" @change="dateChange" :start="startDate" :end="endDate">
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
			<checkbox-group @change="checkboxChange">
				<label class="tips-content">
					<checkbox :value="isAgree" />
					<view class="tips">我已阅读并同意<view class="policy" @click.stop="policyClick">《隐私政策》</view>
					</view>
				</label>
			</checkbox-group>
		</view>
		<view class="btn-content">
			<button class="submit-button" @click="submitForm">确定</button>
		</view>
	</view>
</template>

<script>
import xsForm from '../../components/form/xs-form.vue'
import xsFormItem from '../../components/form/xs-form-item.vue'
import { post, get } from '../../utils/request.js'

export default {
	components: {
		xsForm,
		xsFormItem
	},
	data() {
		return {
			formData: {
				openId: '',
				phone: '',
				realName: '',
				company: '',
				reserveNum: '',
				reserveDate: '',
				reserveTime: '',
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
			closeDate:[],
			startDate: '2024-07-09',
			endDate: '2099-07-09',
			isAgree: false
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
		getCloseDate(){
			get('/reserve/closeDate',{})
			  .then(res => {
				  this.closeDate=res.data || []
			  })
			  .catch(error => {
			    console.error('API请求失败:', error);
			  });
		},
		dateChange(value) {
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
		submitForm() {
			if (!this.isAgree) {
				wx.showToast({
					title: '请先同意隐私政策',
					icon: 'none'
				});
				return;
			}
			this.$refs.form.validateFields().then(values => {
				const openId = wx.getStorageSync('openId') ?? '';
				let params = {
					openId,
					data: {
						openId,
						...this.formData,
					}
				}
				post('/reserve/showroom', params)
					.then(res => {
						if (res.code !== '0') {
							wx.showToast({
								title: res.msg,
								icon: 'none'
							});
						}else {
							wx.requestSubscribeMessage({
							  tmplIds: ['Z6uCYxdHVzwc296KFWxQKtHCu6GKmCgbNeGbni71VYw'],
							  complete (res) {
								uni.showModal({
									title: '成功提交',
									content: '请在我的预约查看预约情况',
									success: function () {
										uni.navigateTo({ url: '/pages/reserveShowroom/reserveShowroom' })
									}
								})
							  }
							})
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
		}
	}
}
</script>

<style lang="scss" scoped>
.exhibitionBooking {
	height: 100vh;
	.exhibitionBooking-content{
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
		
		.tips-content {
			margin-top: 40px;
			display: flex;
			align-items: center;
		
			.tips {
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
	
}
</style>
