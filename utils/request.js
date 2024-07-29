const baseUrl = "http://117.50.174.221:8015/cdcProblems"
const post = (url,parmas) => {
  return new Promise((resolve, reject) => {
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
  })
}
const get = (url,parmas) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      data: parmas,
      method: 'GET',
      header: {
          'content-type': 'application/json'
      },
      success: (res)=> {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
module.exports = {
  baseUrl,
  post,
  get
}
