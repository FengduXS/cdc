<template>
	<view class="exhibition">
		<img src="/static/exhabitionBack.png" alt="" class="backimg" />
		<span class="title">欢迎进入</span>
		<span class="title">普陀区公共卫生科普中心线上展厅</span>
		<img src="/static/exhibitionLogo.png" alt="" class="logo" />
		<view class="cancel" @click="cancel">取消</view>
		<view class="login" @click="login">登录</view>
	</view>
</template>

<script>
import { post } from '../../utils/request.js'
export default {
	data() {
		return {
			openId: null,
			isLogin: false
		}
	},
	methods: {
		login() {
			if (!this.isLogin) {
				this.isLogin = true
				wx.login({
					success: (res) => {
						this.isLogin = false
						if (res.code) {
							this.fetchAccessTokenAndOpenid(res.code);
						} else {
							console.log('登录失败！' + res.errMsg);
						}
					},
					fail: (err) => {
						this.isLogin = false;
						console.error('wx.login 失败：', err);
					}
				})
			}
		},
		fetchAccessTokenAndOpenid(code) {
			post('/getOpenid', { code: code })
				.then(response => {
					this.openId = response.data.openId;
					wx.setStorageSync('openId', this.openId);
					uni.navigateTo({ url: '/pages/home/home' })
				})
				.catch(error => {
					console.error('获取openId失败', error);
				});
		},
		cancel(){
			uni.navigateTo({ url: '/pages/home/home' })
		}
	}
};

</script>

<style lang="scss" scoped>
.exhibition {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;

	.backimg {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.title {
		position: absolute;
		font-family: PingFangSC, PingFang SC;
		font-weight: 600;
		font-size: 20px;
		color: #3898FF;
		line-height: 28px;
		text-align: right;
		font-style: normal;
	}

	.title:nth-child(even) {
		margin-top: 169px;
	}

	.title:nth-child(odd) {
		margin-top: 214px;
	}

	.logo {
		position: absolute;
		width: 272px;
		height: 227px;
		margin-top: 307px;
	}
	.cancel{
		position: absolute;
		margin-top: 351px;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 14px;
		color: #FFFFFF;
		line-height: 20px;
		text-align: right;
		font-style: normal;
		text-transform: none;
		line-height: 42px;
		
		background: linear-gradient(317deg, #1BD4FF 0%, #3898FF 100%);
		border: 1px solid #21C4FF;
		width: calc(100% - 82px);
		text-align: center;
		border-radius: 20px;
		
		bottom: 60px;
	}
	.login {
		position: absolute;
		margin-top: 551px;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 14px;
		color: #FFFFFF;
		line-height: 20px;
		text-align: right;
		font-style: normal;
		text-transform: none;
		line-height: 42px;

		background: linear-gradient(317deg, #1BD4FF 0%, #3898FF 100%);
		border: 1px solid #21C4FF;
		width: calc(100% - 82px);
		text-align: center;
		border-radius: 20px;
		
	}
}
</style>