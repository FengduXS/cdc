<template>
  <view class="formItem" :class="className">
    <view class="item">
      <view class="line-item-center titleBox">
        <view class="required">
          <view v-if="required">*</view>
        </view>
        <slot name="leftIcon"></slot>
        <view class="title">
          {{ title }}
        </view>
      </view>
      <view :class="['right', { disabled: disabled }]">
        <slot>
          <view v-if="type === 'text'" class="text">
            {{ val == null ? '' : val }}
          </view>
          <template v-else-if="type === 'select'">
            <picker :range="pickerProps.range" range-key="value" :mode="pickerProps.mode" :value="val"
                    :disabled="disabled" @change="bindValueChange">
              <template v-if="!pickerProps.mode|| pickerProps.mode === 'selector' || pickerProps.mode === 'multiSelector'">
                <template v-if="pickerProps.range && pickerProps.range[val]">
                  {{ pickerProps.range[val].value || '请选择' }}
                </template>
                <template v-else>
                  {{ value || val || '请选择' }}
                </template>
              </template>
              <template v-else>
                {{ val || '请选择' }}
              </template>
            </picker>
          </template>
          <template v-else>
            <input class="input" :value="val" :type="type === 'input' ? 'text' : type"
                   :password="password" :maxlength="maxlength" @input="bindValueChange"
                   :placeholder="placeholder"/>
          </template>
        </slot>
        <slot name="rightIcon"></slot>
      </view>
    </view>
    <view>
      <slot name="row"></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: "xs-form-item",
  components: {},
  options: {
    virtualHost: true
  },
  props: {
    title: String,
    name: String,
    value: String,
    maxlength: {
      type: [Number, String],
      default: 66,
    },
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
      validator: function (value) {
        return ["input", "text", "number", "idcard", "digit", "select"].includes(value);
      },
    },
    password: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
    pickerProps: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: [Boolean, String],
      default: false,
    },
	className:{
      type: String,
      default: "",
    }
  },
  data() {
    return {
      val: null,
    };
  },
  watch: {
    value(newVal) {
      let mode = this.pickerProps?.mode;
      let range = this.pickerProps?.range || [];
      if (this.type === 'select' && (!mode || mode === 'selector' || mode === 'multiSelector')) {
        let val = range.findIndex(item => item.key === newVal);
        this.val = val === -1 ? null : val;
      } else {
        this.val = newVal;
      }
    },
    pickerProps(newVal) {
      let mode = this.pickerProps?.mode;
      if (newVal.range && (!mode || mode === 'selector' || mode === 'multiSelector')) {
        let val =  newVal.range.findIndex(item => item.key === this.value);
        this.val = val === -1 ? null : val;
      }
    },
  },
  methods: {
    bindValueChange(event) {
      if (this.group) {
        this.group.onChange(event, this);
      }
    },
    getParent(name = 'xs-form') {
      let parent = this.$parent
      while (parent) {
        if (parent.$options && parent.$options.name !== name) {
          parent = parent.$parent
        } else {
          return parent
        }
      }
      return false
    }
  },
  created() {
    this.group = this.getParent()
    if (this.group) {
      this.group.childrens.push(this);
    }
  },
  mounted() {
  },
  destroyed() {
  },
};
</script>

<style lang="scss" scoped>
.formItem {
  padding: 15rpx 0;
  font-size: 34rpx;
  .item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
	height: 60rpx;

    .titleBox {
      flex-shrink: 0;
      margin-right: 30rpx;
	  display: flex;
	  align-items: center;
	  width: 200rpx;
	  height: 60rpx;
      .title {
        font-size: 34rpx;
		flex: 1;
		text-align: justify;
		text-align-last: justify;
		line-height: 60rpx;
      }

      .required {
        margin-right: 5rpx;
        color: red;
        width: 15rpx;
      }
    }

    .right {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
      color: #030303;
      overflow: hidden;
	  flex-wrap: nowrap;
    }

    .text {
      color: #999999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .disabled {
      color: #999999;
    }

    .input {
      flex-grow: 1;
      text-align: right;
      font-size: 28rpx;
      color: #030303;
	  background-color: #f7f7f7;
	  border-radius: 3px;
	  height: 60rpx;
	  padding-right: 20px;
    }

    .icon {
      margin-left: 5rpx;
    }
  }
}
.bookingdate{
	.item{
		.titleBox{
			width: auto;
		}
	}
}
</style>
