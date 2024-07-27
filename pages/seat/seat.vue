<template>
	<view class="seat-form">
		<xs-form v-model="formData" ref="form">
			<xs-form-item title="宝宝生日" name="birthday" required>
				<picker mode="date" @change="dateChange" fields="month">
					<view class="date-picker-content">
						<view class="input-mode">{{formData.birthday.split('-')[0]}}</view>
						<span>年</span>
						<view class="input-mode">{{formData.birthday.split('-').length > 0 && formData.birthday.split('-')[1]}}</view>
						<span>月</span>
					</view>
				</picker>
			</xs-form-item>
			<xs-form-item title="宝宝体重" name="weight" required type="input" >
				<view slot="rightIcon" class="rightIcon">kg(公斤)</view>
			</xs-form-item>
			<xs-form-item title="联系人" name="realName" type="input" required placeholder="请输入联系人"></xs-form-item>
			<xs-form-item title="联系电话" name="phone" type="input" required placeholder="请输入手机号"></xs-form-item>
			<xs-form-item title="预约时间 (请提前两天预约)" name="reserveDate" required></xs-form-item>
			<picker mode="date" :value="date" @change="dateChange" :start="startDate" :end="endDate">
				<view class="booking-date">
					<view class="date">{{formData.date || '请选择日期'}}</view>
					<img src="/static/rili.svg" alt="" />
				</view>
			</picker>
		</xs-form>
		<view class="title">选择时间段</view>
		<view class="stage-content">
			<radio-group @change="radioChange">
				<view class="radio-conetnt">
					<label v-for="(item, index) in value" :key="item.value" class="radio">
						<radio :value="item.value"/>
						<view>{{item.name}}</view>
					</label>
				</view>
			</radio-group>
		</view>
		<view class="tips">预约要求：请开车，带上安全座椅，带上孩子。</view>
		<checkbox-group @change="checkboxChange">
			<label class="policy-content">
				<checkbox :value="true"/>
				<view class="info">我已阅读并同意<view class="policy" @click.stop="policyClick">《隐私政策》</view></view>
			</label>
		</checkbox-group>
		<button class="submit-button" @click="submit">确定</button>
	</view>
</template>

<script>
import xsForm from '../../components/form/xs-form.vue'
import xsFormItem from '../../components/form/xs-form-item.vue'
import { post } from '../../utils/request.js'
import { get } from '../../utils/request.js'
export default {
	components: {
		xsForm,
		xsFormItem
	},
	data() {
		return {
			formData: {
				birthday: '', // 宝宝生日
				weight: '', // 宝宝体重
				realName: '', // 联系人
				phone: '', // 联系电话
				reserveDate:'', // 预约日期
				reserveTime: '09:00-11:00', // 预约时间
				date:''
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
			isAgree: false ,// 是否同意隐私政策
		}
	},
	onLoad() {
		this.getCloseDate();
	},
	methods: {
		getCloseDate(){
			get('/reserve/closeDate',{})
			  .then(res => {
				  this.closeDate(res.data)
			  })
			  .catch(error => {
			    console.error('API请求失败:', error);
			  });
		},
		dateChange(value) {
			this.formData.birthday = value.detail.value
		},
		dateChange1(value) {
			this.formData.date = value.detail.value
		},
		radioChange(event) {
		  const value = event.detail.value;
		  if(value.includes('BRA')) {
			this.formData.reserveTime = '09:00-11:00';
		  } else if(value.includes('JPN')) {
			this.formData.reserveTime = '14:00-16:00';
		  }
		},
		checkboxChange(event) {
		  this.isAgree = event.detail.value.includes('agree');
		},
		submit(){
			if (!this.isAgree) {
				wx.showToast({
				  title: '请先同意隐私政策',
				  icon: 'none'
				});
				return;
		    }
			const openId = wx.getStorageSync('openId') ?? '';
			const params = {
				openId,
				data:this.formData
			}
			post('/reserve/seat',params)
			  .then(res => {
				  console.log(res)
			  })
			  .catch(error => {
			    console.error('API请求失败:', error);
			  });
		},
		policyClick(){
			uni.navigateTo({url: '/pages/privacyPolicy/privacyPolicy'})
		},
		checkboxChange(value) {
			if (value.detail.value.length > 0){
				this.isAgree = true
			} else {
				this.isAgree = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.seat-form{
	padding: 20px 20px 0 20px;
	.date-picker-content{
		display: flex;
		.input-mode {
			width: 100px;
			height: 20px;
			background-color: #f7f7f7;
		}
	}
	.rightIcon{
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
		img{
			width: 20px;
			height: 20px;
		}
	}
	.title{
		text-align: center;
		margin: 40px 0 30px 0;
	}
	.stage-content{
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
	.tips{
		color: red;
		text-align: center;
		margin: 40px 0 30px 0;
	}
	.policy-content{
		margin-top: 40px;
		display: flex;
		align-items: center;
		.info{
			display: flex;
			align-items: center;
		}
		.policy{
			display: inline;
			color: blue;
		}
	}
	.submit-button {
		margin-top: 20px;
		background-color: blue;
		color: #ffffff;
	}
}
</style>
