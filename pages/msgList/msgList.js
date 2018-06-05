// pages/msgList/msgList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 全部已读 allReady
    allReady: 0,
    msgList: [
      { 
        lockIcon: '.icon-xie', 
        general: '电量过低', 
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isRead: 0,
        // 0表示警告（示警），亮红色,其他数字正常
        warn: 0
      },
      {
        lockIcon: 'icon-shezhi',
        general: '异常开锁报警',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isReady: 1,
        warn: 1
      },
      {
        lockIcon: 'icon-shezhi',
        general: '密码开锁',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isReady: 0,
        warn: 1
      },
      {
        lockIcon: 'icon-shezhi',
        general: '未锁定时间过长',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isReady: 1,
        warn: 1
      },
      {
        lockIcon: 'icon-shezhi',
        general: '密码开锁',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isReady: 1,
        warn: 1
      },
    ],
    pullDown: true,
    indexNum: -1,
    show: 0
  },

  pullDown: function(event){
    console.log(event);
    this.setData({
      indexNum: event.currentTarget.id,
      show: !this.data.show
    });
    console.log(this.data.indexNum);
    console.log(this.data.show);
  },
  /**
   * 全部已读设置
   */
  allReady: function(){
    console.log('全部已读');
    // 1.allReady: true
    // 2.红色显示的变为正常?
    this.setData({ 
      allReady: 1
    });
    

  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.indexNum);
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
      // wx.startPullDownRefresh();
      console.log('下拉刷新');
      // wx.showNavigationBarLoading()
      wx.stopPullDownRefresh();
      // wx.request({
      //   url: '',
      //   data: {},
      //   method: 'GET',
      //   success: function (res) { },
      //   fail: function (res) { },
      //   complete: function (res) {
      //     wx.stopPullDownRefresh();
      //   }
      // })
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