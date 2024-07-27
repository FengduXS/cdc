<template>
	<view class="exhibitionBooking">
		<xs-form v-model="ssss" ref="form">
			<xs-form-item title="称呼" name="weight" required type="input"></xs-form-item>
			<xs-form-item title="单位名称" name="aaa" type="input" placeholder="请输入先生或女士"></xs-form-item>
			<xs-form-item title="手机号码" name="bbb" type="input" required placeholder="请输入您的手机号"></xs-form-item>
			<xs-form-item title="人数" name="bbc" type="input" required placeholder="请输入您的手机号"></xs-form-item>
			<xs-form-item title="预约时间(请提前两天预约)" name="sdd" required></xs-form-item>
		</xs-form>
		<view class="title">选择时间段</view>
		<view class="stage-content">
			<radio-group @change="radioChange">
				<label v-for="(item, index) in value" :key="item.value" class="radio">
					<view>
						<radio :value="item.value" :checked="index === current" />
					</view>
					<view>{{item.name}}</view>
				</label>
			</radio-group>
		</view>
		<view class="tips">我已阅读并同意《隐私政策》</view>
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
			ssss: {
				weight: '',
				aaa: '',
				bbb:'',
				bbc: '',
				sdd: ''
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
			]
		}
	},
	methods: {
		dateChange(value) {
			this.ssss.date = value.detail.value
		},
		radioChange() {
			
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
