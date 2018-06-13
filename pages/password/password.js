// pages/password/password.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPopUp: false,
    deviceId: null,         //设备id
    password: '000000',
    passwordTemp: null,
    open: true,
    stop: false,
    modify: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断有无旧的开锁密码
    if(options.password){
      this.setData({ password: options.password })
    }
    // 获取到锁id，开锁秘密
    this.setData({deviceId: options.deviceId});
    //根据锁编号去后台查询开锁密码，更新数据password
    // wx.request({
    //   url: "http://6844ea95.ngrok.io/v1/devices/:" + options.deviceId,
    //   method: 'PATCH',
    //   header: {
    //       "Content-Type": "application/json",
    //       "token": app.globalData.userData.token,
    //       "apptype": 1001
    //   },
    //   data: {
        
    //   },
    //   success: function(res){
    //     console.log('访问成功');

    //   },
    //   fail: function(res){}
    // })
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
   * 修改开锁密码事件
   */
  modifyPassword: function(){
    console.log('修改开锁密码');
    this.setData({ showPopUp: true});
  },
  /**
   * 监听开锁密码输入
   */
  inputTxt: function (e) {
    console.log(e.detail.value);
    this.setData({ passwordTemp: e.detail.value });
    console.log(this.data.lockNum);
  },
  /**
   * 修改开锁密码弹框取消事件
   */
  cancel: function () {
    console.log('取消按钮');
    this.setData({ showPopUp: false });
  },
  /**
   * 修改开锁密码弹框确认事件---将开锁密码（password)保存到数据
   */
  confirm: function () {
    // 弹出框(showPopUp)隐藏，页面更新为修改后的开锁密码
    this.setData({
      showPopUp: false,
      password: this.data.passwordTemp
    });
    // var password = this.data.password;
    
    
  },
  /**
   * 密码启用事件
   */
  open: function(e){
    var formId = e.detail.formId;
    console.log(e);
    console.log('formId' + formId);
    //1.将开锁密码（password）和锁编号（deviceId）？ 传给后台
    wx.request({
      url: 'https://c98008c9.ngrok.io/v1/devices/' + this.data.deviceId,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'token': app.globalData.userData.token,
        "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
        "apptype": 1001
      },
      data: { commonPasswrod: this.data.password },
      success: res => {
        console.log()
        console.log('开发者服务器返回数据');
        //2.隐藏修改图标和开启按钮，停用按钮出现
        this.setData({
          open: false,
          stop: true,
          modify: false
        })
      },
      fail: function () {
        console.log('接口调用失败');
      },
    })
    
  },
  /**
   * 密码停用事件
   */
  stop: function(){
    //1.告诉后台未设置密码
    wx.request({
      url: 'https://c98008c9.ngrok.io/v1/devices/' + this.data.deviceId,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'token': app.globalData.userData.token,
        "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
        "apptype": 1001
      },
      data: { commonPasswrod: "" },
      success: res => {
        console.log()
        console.log('开发者服务器返回数据');
        //2.隐藏停用按钮，修改图标和开始按钮出现
        this.setData({
          open: true,
          stop: false,
          modify: true
        })
      },
      fail: function () {
        console.log('接口调用失败');
      },
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