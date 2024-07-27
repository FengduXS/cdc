<template>
	<view class="seat-form">
		<xs-form v-model="formData" ref="form">
			<xs-form-item title="宝宝生日" name="date" required>
				<picker mode="date" @change="dateChange" fields="month">
					<view class="date-picker-content">
						<view class="input-mode">{{formData.date.split('-')[0]}}</view>
						<span>年</span>
						<view class="input-mode">{{formData.date.split('-').length > 0 && formData.date.split('-')[1]}}</view>
						<span>月</span>
					</view>
				</picker>
			</xs-form-item>
			<xs-form-item title="宝宝体重" name="weight" required type="input" >
				<view slot="rightIcon" class="rightIcon">kg(公斤)</view>
			</xs-form-item>
			<xs-form-item title="联系人" name="aaa" type="input" required placeholder="请输入先生或女士"></xs-form-item>
			<xs-form-item title="联系电话" name="bbb" type="input" required placeholder="请输入您的手机号"></xs-form-item>
			<xs-form-item title="预约时间 (请提前两天预约)" name="ccc" required>
				
			</xs-form-item>
		</xs-form>
		<view class="title">选择时间段</view>
		<view class="stage-content">
			<view class="stage" @click="open">
				{{formData.start1}}-{{formData.end1}}
			</view>
			<view class="stage" @click="open1">
				{{formData.start2}}-{{formData.end2}}
			</view>
		</view>
		<view class="tips">预约要求：请开车，带上安全座椅，带上孩子。</view>
		<time-picker-popup ref="TimePickerPopupRef" :value="value" @confirm="confirm"></time-picker-popup>
		<time-picker-popup ref="TimePickerPopupRef2" :value="value" @confirm="confirm1"></time-picker-popup>
	</view>
</template>

<script>
import xsForm from '../../components/form/xs-form.vue'
import xsFormItem from '../../components/form/xs-form-item.vue'
import TimePickerPopup from '../../components/time-picker-popup/time-picker-popup.vue';
export default {
	components: {
		xsForm,
		xsFormItem,
		TimePickerPopup
	},
	data() {
		return {
			formData: {
				date: '',
				weight: '',
				start1: '',
				end1:'',
				start2:'',
				end2: ''
			},
			value: ['00', '00', '00', '00']
		}
	},
	watch:{
		formData(){
			console.log(this.formData)
		}
	},
	methods: {
		dateChange(value) {
			this.formData.date = value.detail.value
		},
		confirm(data) {
			this.formData.start1 = data[0] + ":" + data[1]
			this.formData.end1 = data[2] + ":" + data[3]
		},
		confirm1(data) {
			this.formData.start2 = data[0] + ":" + data[1]
			this.formData.end2 = data[2] + ":" + data[3]
		},
		open() {
			this.$refs.TimePickerPopupRef.open();
		},
		open1() {
			this.$refs.TimePickerPopupRef2.open();
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
