// pages/lockSet/lockSet.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lockList: {},
    deviceNameTemp: '',
    enable: 0,     //临时密码是否启用（1为启用0为未启用）
    isStart: 0,    //普通密码是否启用（1为启用0为未启用）
    showPopUp: false,
    deviceId: null     //设备id      //
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.deviceId);
      this.setData({deviceId: options.deviceId});
      /**
       * 获取锁编号，向服务器请求锁数据
       */
      var url = 'https://c98008c9.ngrok.io/v1/devices/' + this.data.deviceId ;
      // console.log(url);
      // console.log(typeof url);
      wx.request({
        url: url,
        method: 'GET',
        header: {
          // 'token': app.globalData.userData.token,
          "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
          'apptype': 1001
        },
        success: res => {
          console.log(res);
          this.setData({ lockList: res.data.data.device})
          console.log(this.data.lockList)
        },
        fail: res => {
          console.log('接口调用失败');
          console.log(res.errMsg)
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
   * 修改设备名称{点击修改图标，弹出修改用户名弹框}
   */
  modifyName: function(){
    console.log('修改用户名');
    this.setData({ showPopUp: true });
  },
  /**
   * 监听用户名输入
   */
  deviceNameInput: function (e) {
    console.log(e.detail.value);
    this.setData({ deviceNameTemp: e.detail.value });
    // console.log(this.data.deviceName);
  },
  /**
   * 修改名称弹框取消事件
   */
  cancel: function () {
    console.log('取消按钮');
    this.setData({ showPopUp: false });
  },
  /**
   * 修改名称弹框确认事件---将设备名称（lockName）和设备编号（devicesid）？传给后台
   */
  confirm: function () {
    // 弹出框(showPopUp)隐藏，页面更新为修改后的设备名称
    this.setData({
      showPopUp: false,
      ["lockList.devicename"]: this.data.deviceNameTemp
    });
    console.log(this.data.lockList.devicename);
    wx.request({
      url: 'https://c98008c9.ngrok.io/v1/devices/' + this.data.deviceId,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'token': app.globalData.userData.token,
        "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
        "apptype": 1001
      },
      data: { deviceName: this.data.lockList.devicename },
      success: res => {
        console.log()
        console.log('开发者服务器返回数据');
      },
      fail: function () {
        console.log('接口调用失败');
      },
    })
  },
  /**
   * 开锁密码点击事件  进入开锁密码设置页面
   */
  password: function(){
    console.log('去开锁密码页');
    wx.navigateTo({
      url: '../password/password?deviceId=' + this.data.deviceId + '&&password=' + this.data.lockList.commonpasswrod,
    })
  },
  /**
   * 临时密码点击事件,进入临时密码设置页面
   */
  passwordTemp: function(){
    console.log('去临时密码设置页面');
    // 跳转(带参数锁编号devicesid)至临时密码页面
    wx.navigateTo({
      url: '../temporaryPassword/temporaryPassword?deviceId=' + this.data.deviceId,
    })
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