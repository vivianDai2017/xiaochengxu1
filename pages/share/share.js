// pages/share/share.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    effectTime: '单次有效',
    tempPassword: "123456",
    nickName: '',
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // startTime: null,
    // endTime: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.temp);
    console.log(options.startTime);
    console.log(options.endTime);
    this.setData({
      tempPassword: options.temp,
      // startTime: options.startTime,
      // endTime: options.endTime,
      nickName: options.nickName
    })
    // 判断临时密码是不是单次有效
    if(options.startTime){
      var effect = options.startTime + '-' + options.endTime
      this.setData({ effectTime: effect })
    }else{
      this.setData({ effectTiem: '单次有效' })
    }
    this.setData({ 
      tempPassword: options.temp,
      nickName: app.globalData.userInfo.nickName
    });
    /**
     * 判断被分享者是否绑定微信（小程序）
     */
    // 登录
    wx.login({
      success: res => {
        // console.log(res);  
        if (res.code) {
          this.setData({ jscode: res.code })
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                // console.log('已授权');
                wx.getUserInfo({
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    app.globalData.userInfo = res.userInfo;
                    // app.globalData.testInfo = res;
                    app.globalData.encrypteData = res.encryptedData;
                    app.globalData.iv = res.iv
                    // console.log(res);

                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (this.userInfoReadyCallback) {
                      this.userInfoReadyCallback(res)
                    }
                    console.log('微信号');
                    console.log(app.globalData.userInfo.nickName);
                    console.log(this.data.jscode);
                    // console.log(app.globalData.wechatid);
                    // 发送消息到后台
                    wx.request({
                      url: 'http://1c8638d4.ngrok.io/v1/users/login',
                      // url: "http://99c0f9fb.ngrok.io/v1/users/login",
                      method: "POST",
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "apptype": 1001
                      },
                      data: {
                        wechatname: app.globalData.userInfo.nickName,
                        jscode: this.data.jscode,
                        encryptedData: app.globalData.encrypteData,
                        iv: app.globalData.iv
                      },
                      success: function (res) {
                        console.log('请求成功');
                        console.log(res);
                        console.log(res.data.data);
                        app.globalData.userData = res.data.data;
                        // console.log(app.globalData.userData);
                        wx.redirectTo({
                          url: '../index/index',
                        });
                      },
                      fail: function (res) {
                        console.log('失败');
                        console.log(res.errMsg);
                      }
                    })
                  }
                })
              } else {
                wx.redirectTo({
                  url: '../unbindIndex/unbindIndex',
                })
              }
            }
          })
        }
        
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})