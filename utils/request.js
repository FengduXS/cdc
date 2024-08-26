// const baseUrl = "http://117.50.174.221:8015/cdcProblems"
const baseUrl = "https://cdc.crowninfo.cn/cdcProblems"
const post = (url,parmas) => {
	return new Promise((resolve, reject) => {
		const openId = wx.getStorageSync('openId')
		if(openId || url.includes('getOpenid')){
			uni.request({
			  url: baseUrl + url,
			  data: parmas,
			  method: 'POST',
			  header: {
				  'content-type': 'application/json'
			  },
			  success: (res)=> {
				resolve(res.data)
			  },
			  fail: (err) => {
				reject(err)
			  },
			})
		} else {
			uni.navigateTo({ url: '/pages/login/login' })
		}
	})
}
const get = (url,parmas) => {
	return new Promise((resolve, reject) => {
		const openId = wx.getStorageSync('openId')
		if (openId){
			uni.request({
			  url: baseUrl + url,
			  data: parmas,
			  method: 'GET',
			  header: {
				  'content-type': 'application/json'
			  },
			  success: (res)=> {
				resolve(res.data)
			  },
			  fail: (err) => {
				reject(err)
			  },
			})
		}else{
			uni.navigateTo({ url: '/pages/login/login' })
		}
	})
}
	  
module.exports = {
  baseUrl,
  post,
  get
}
