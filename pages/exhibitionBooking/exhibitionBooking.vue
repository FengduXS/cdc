<template>
	<view class="exhibitionBooking">
		<xs-form v-model="formData" ref="form">
			<xs-form-item title="称呼" name="weight" required type="input"></xs-form-item>
			<xs-form-item title="单位名称" name="aaa" type="input" placeholder="请输入先生或女士"></xs-form-item>
			<xs-form-item title="手机号码" name="bbb" type="input" required placeholder="请输入您的手机号"></xs-form-item>
			<xs-form-item title="人数" name="bbc" type="number" required placeholder="请输入人数"></xs-form-item>
			<xs-form-item title="预约时间(请提前两天预约)" name="sdd" required></xs-form-item>
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
		<checkbox-group @change="checkboxChange">
			<label class="tips-content">
				<checkbox :value="true"/>
				<view class="tips">我已阅读并同意<view class="policy" @click.stop="policyClick">《隐私政策》</view></view>
			</label>
		</checkbox-group>
		<button class="submit-button" @click="submitForm">确定</button>
	</view>
</template>

<script>
	import xsForm from '../../components/form/xs-form.vue'
	import xsFormItem from '../../components/form/xs-form-item.vue'
	export default {
		components: {
			xsForm,
			xsFormItem
		},
		data() {
			return {
				formData: {
					weight: '',
					aaa: '',
					bbb:'',
					bbc: '',
					sdd: '',
					date: ''
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
				startDate: '2024-07-09',
				endDate: '2099-07-09',
				checkboxValue: false
			}
		},
		methods: {
			dateChange(value) {
				this.formData.date = value.detail.value
			},
			radioChange() {
				
			},
			submitForm(){
				// 表单校验
				this.$refs.form.validateFields().then(values => {
				   let params = {
					 ...this.formData,
					 ...values
				   }
				   console.log('params',params)
				})
			},
			policyClick(){
				uni.navigateTo({url: '/pages/privacyPolicy/privacyPolicy'})
			},
			checkboxChange(value) {
				if (value.detail.value.length > 0){
					this.checkboxValue = true
				} else {
					this.checkboxValue = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.exhibitionBooking{
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
	.tips-content{
		margin-top: 40px;
		display: flex;
		align-items: center;
		.tips{
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
