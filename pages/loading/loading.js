// pages/loading/loading.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jscode: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
                      url: 'http://df5a1228.ngrok.io/v1/users/login',
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
                        // wx.redirectTo({
                        //   url: '../index/index',
                        // });
                      },
                      fail: function (res) {
                        console.log('失败');
                        console.log(res.errMsg);
                      }
                    })
                  }
                })
              } else {
                // wx.redirectTo({
                //   url: '../unbindIndex/unbindIndex',
                // })
              }
            }
          })
        }
        /**
         * 测试用
        //  */
        // if (res.code) {
        //   /**
        //    * 测试用
        //    */
        //   // 获取openId
        //   wx.request({
        //     // 正式环境前端是不可以向 https://api.weixin.qq.com 发起请求的。
        //     // 通过开发者服务器访问微信接口服务
        //     url: 'https://api.weixin.qq.com/sns/jscode2session',
        //     data: {
        //       appid: 'wxb094d15db24f1b92',
        //       secret: '4e9e27beb565f0a49a50989d2087826b',
        //       js_code: res.code,
        //       grant_type: 'authorization_code'
        //     },
        //     method: 'GET',
        //     header: { 'content-type': 'application/json' },
        //     success: function (res) {
        //       // console.log(res.data.openid);
        //       app.globalData.wechatid = res.data.openid;
        //       wx.getSetting({
        //         success: res => {
        //           if (res.authSetting['scope.userInfo']) {
        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //             // console.log('已授权');
        //             wx.getUserInfo({
        //               success: res => {
        //                 // 可以将 res 发送给后台解码出 unionId
        //                 app.globalData.userInfo = res.userInfo;
        //                 app.globalData.testInfo = res;
        //                 // console.log(res.userInfo.nickName);
        //                 console.log(app.globalData.userInfo);

        //                 // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //                 // 所以此处加入 callback 以防止这种情况
        //                 if (this.userInfoReadyCallback) {
        //                   this.userInfoReadyCallback(res)
        //                 }
        //                 console.log('微信号');
        //                 console.log(app.globalData.userInfo.nickName);
        //                 console.log(app.globalData.wechatid);
        //                 // 发送消息到后台
        //                 wx.request({
        //                   // url: 'http://6844ea95.ngrok.io/v1/users/login',
        //                   url: "http://6173c638.ngrok.io/v1/users/login",
        //                   method: "POST",
        //                   header: {
        //                     'Content-Type': 'application/x-www-form-urlencoded',
        //                     'apptype': 1001
        //                   },
        //                   data: {
        //                     wechatname: app.globalData.userInfo.nickName,
        //                     wechatid: app.globalData.wechatid
        //                   },
        //                   success: function (res) {
        //                     console.log('请求成功');
        //                     // console.log(res);
        //                     // console.log('token'+res.data.data.token);
        //                     console.log(res);
        //                     console.log(res.data.data);
        //                     // console.log('account' + res.data.data.user.account);
        //                     // console.log('phone' + res.data.data.user.phone);
        //                     app.globalData.token = res.data.data.token;
        //                     app.globalData.userData = res.data.data;
        //                     // console.log(app.globalData.userData);
        //                     wx.navigateTo({
        //                       url: '../index/index',
        //                     });
        //                   },
        //                   fail: function (res) {
        //                     console.log('失败');
        //                     console.log(res.errMsg);
        //                   }
        //                 })

        //               }
        //             })
        //           } else {
        //             wx.navigateTo({
        //               url: '../unbindIndex/unbindIndex',
        //             })
        //           }
        //         }
        //       })
        //     }
        //   })
        // }
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