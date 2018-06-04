// pages/lockSet/lockSet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lockNum: 0,
    lockName: 'Alex的锁3',
    lockNameTemp: '',
    lockType: 'CNYT-1',
    lockVer: 'Ver1.2',
    lockOnOff: '已锁定',
    lockEnergy: '80%',
    lockDate: '236天',
    tempPassStatus: '未开启',
    openPassStatus: '未开启',
    showPopUp: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // console.log(options.lockNum);
      /**
       * 开发调试，暂注释
       */
      // this.setData({lockNum: options.lockNum});
      /**
       * 获取锁编号，向服务器请求锁数据
       */
      wx.request({
        url: '',
        // data: {lockNum},
        success: function(data){},
        fail: function(){
          console.log('接口调用失败');
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
   * 修改用户名{点击修改图标，弹出修改用户名弹框}
   */
  modifyName: function(){
    console.log('修改用户名');
    this.setData({ showPopUp: true });
  },
  /**
   * 监听用户名输入
   */
  wifiPassInput: function (e) {
    console.log(e.detail.value);
    this.setData({ lockNameTemp: e.detail.value });
    console.log(this.data.lockName);
  },
  /**
   * 修改名称弹框取消事件
   */
  cancel: function () {
    console.log('取消按钮');
    this.setData({ showPopUp: false });
  },
  /**
   * 修改名称弹框确认事件---将设备名称（lockName）和设备编号（lockNum）？传给后台
   */
  confirm: function () {
    // 弹出框(showPopUp)隐藏，页面更新为修改后的设备名称
    this.setData({
      showPopUp: false,
      lockName: this.data.lockNameTemp
    });
    var lockName = this.data.lockName;
    wx.request({
      url: '',
      data: { lockName },
      method: 'POST',
      success: function (data) {
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
      url: '../password/password?num=' + this.data.lockNum,
    })
  },
  /**
   * 临时密码点击事件,进入临时密码设置页面
   */
  passwordTemp: function(){
    console.log('去临时密码设置页面');
    // 跳转(带参数锁编号lockNum)至临时密码页面
    wx.navigateTo({
      url: '../temporaryPassword/temporaryPassword',
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