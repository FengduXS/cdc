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
			<picker mode="date" :value="date" @change="dateChange1" :start="startDate" :end="endDate">
				<view class="uni-input">{{formData.date}}2222</view>
			</picker>
		</xs-form>
		<view class="title">选择时间段</view>
		<view class="stage-content">
			<radio-group @change="radioChange">
				<label v-for="(item, index) in value" :key="item.value" class="radio">
					<view>
						<radio :value="item.value"/>
					</view>
					<view>{{item.name}}</view>
				</label>
			</radio-group>
		</view>
		<view class="tips">预约要求：请开车，带上安全座椅，带上孩子。</view>
		 <view class="bottom-content">
		      <checkbox-group @change="checkboxChange">
		        <checkbox class="checkbox" value="agree" checked></checkbox>
		        <text>我已阅读并同意《</text>
		        <text @click="goToPrivacyPolicy">隐私政策</text>
		        <text>》</text>
		      </checkbox-group>
		      <button class="submit-button" @click="submit">确定</button>
		    </view>
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
			isAgree: false // 是否同意隐私政策
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
		goToPrivacyPolicy() {
		  wx.navigateTo({
			url: '/pages/privacy-policy/privacy-policy' // 跳转到隐私政策页面
		  });
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
	.form-input {
		background-color: #f7f7f7;
	}
	.title{
		text-align: center;
	}
	.stage-content{
		display: flex;
		.radio {
			display: inline-block;
		}
	}
	.tips{
		color: red;
	}
}
</style>
