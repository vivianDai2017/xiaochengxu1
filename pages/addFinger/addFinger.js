// pages/addFinger/addFinger.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    call: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(options.call){
      console.log(options.call);
      this.setData({ call: options.call })
    }
    // 2.向后台发送消息，开始设置指纹
    console.log('添加指纹');
    console.log('锁用户id' + options.lockUserId);
    console.log(options.lockUserId);
    console.log('指纹类' + options.finger)
    var finger = options.finger;
    wx.request({
      url: 'http://1c8638d4.ngrok.io/v1/lockusers/' + options.lockUserId,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        // 'token': app.globalData.userData.token,
        "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
        "apptype": 1001
      },
      data: {
        finger: true
      },
      success: res => {
        console.log(res);
        if (finger == 'finger1') { this.setData({ finger1: true }) }
        if (finger == 'finger2') { this.setData({ finger2: true }) }
        if (finger == 'finger3') { this.setData({ finger3: true }) }
        if (finger == 'callfinger') { this.setData({ callfinger: true }) }
        wx.navigateTo({
          url: '../addSucc/addSucc',
        })
      },
      fail: res => {
        console.log(res);
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