<template>
  <view class="container">
    <web-view src="http://117.50.174.221/"></web-view>
  <!-- <cover-view class="share-button">
      <cover-view class="exit" @click="exitExhibition">
        退出
      </cover-view>
     <cover-view class="check" @click="checkCredits">
       查看积分
      </cover-view>
    </cover-view> -->
  </view>
</template>

<script>
export default {
  methods: {
    exitExhibition() {
      wx.navigateBack({
        delta: 1 
      });
    },
    checkCredits() {
      wx.showModal({
        title: '积分信息',
        content: '您的积分为: XXXX',
        showCancel: false
      });
    }
  }
}
</script>

<style>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.share-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
}

.exit, .check {
  display: inline-block;
  margin-left: 10px;
  padding: 5px 10px;
  border: 1px solid #000;
  border-radius: 5px;
}
</style>