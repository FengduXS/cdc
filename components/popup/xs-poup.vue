<template>
	<view class="">
	  <view class="popup-mask" @click="close" v-if="visible">
		<view v-if="visible" class="popup-content" @click.stop>
		  <slot></slot>
		</view>
	  </view>
  </view>
</template>

<script>
export default {
  props:{
	  visible: {
	    type: Boolean,
	    default: false
	  },
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.popup-content {
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
</style>
