<template>
  <view class="container">
    <!-- <web-view src="http://117.50.174.221/"></web-view> -->
    <web-view src="https://cdc.crowninfo.cn"></web-view>
  </view>
</template>

<script>
export default {
	data(){
		return {
			url:'https://cdc.crowninfo.cn'
		}
	},
	onLoad() {
		this.url = encodeURI(this.url)
	},
}
</script>

<style>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>