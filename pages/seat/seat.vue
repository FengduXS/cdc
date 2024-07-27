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
			<xs-form-item title="预约时间 (请提前两天预约)" name="reserveDate" required>
			</xs-form-item>
		</xs-form>
		<view class="title">选择时间段</view>
		<!-- <view class="stage-content">
			<view class="stage" @click="open">
				{{formData.start1}}-{{formData.end1}}
			</view>
			<view class="stage" @click="open1">
				{{formData.start2}}-{{formData.end2}}
			</view>
		</view> -->
		<view class="tips">预约要求：请开车，带上安全座椅，带上孩子。</view>
		<!-- <time-picker-popup ref="TimePickerPopupRef" :value="value" @confirm="confirm"></time-picker-popup> -->
		<!-- <time-picker-popup ref="TimePickerPopupRef2" :value="value" @confirm="confirm1"></time-picker-popup> -->
	</view>
</template>

<script>
import xsForm from '../../components/form/xs-form.vue'
import xsFormItem from '../../components/form/xs-form-item.vue'
import TimePickerPopup from '../../components/time-picker-popup/time-picker-popup.vue';
import { post } from '../../utils/request.js'
import { get } from '../../utils/request.js'
export default {
	components: {
		xsForm,
		xsFormItem,
		TimePickerPopup
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
			},
			value: ['00', '00', '00', '00'],
			closeDate:[],
		}
	},
	watch:{
		formData(){
			console.log(this.formData)
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
		submit(){
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
	}
	.tips{
		color: red;
	}
}
</style>
