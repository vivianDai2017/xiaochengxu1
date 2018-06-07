//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // console.log(res);  
        if(res.code){
          // 获取openId
          wx.request({
            // 正式环境前端是不可以向 https://api.weixin.qq.com 发起请求的。
            // 通过开发者服务器访问微信接口服务
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: { 
              appid: 'wxb094d15db24f1b92',
              secret: '4e9e27beb565f0a49a50989d2087826b',
              js_code : res.code,
              grant_type: 'authorization_code'
            },
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: function(res){
              console.log(res);
            }
          })
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.navigateTo({
          //   url: '../index/index',
          // })
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              this.globalData.testInfo = res;
              // console.log(res);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
        //   wx.navigateTo({
        //     url: '../unbindIndex/unbindIndex'
        //   })
        // }
      }
    })
  },
  globalData: {
    userInfo: null,
    testInfo:'',
    // 锁的临时密码和开锁密码开启状态
    devicePassList: {
      device1: {
        pass: '',
        shortPass: ''        
      },
      device2: {
        pass: '',
        shortPass: ''
      }
    }
  }
})