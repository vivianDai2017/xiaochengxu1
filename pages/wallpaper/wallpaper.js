// pages/wallpaper/wallpaper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [
      '../../images/10.png',
      '../../images/41.png',
      '../../images/48.png',
      '../../images/lock0.jpg',
      '../../images/lock1.jpg',
      '../../images/lock2.jpg',
      '../../images/lock0.jpg',
      '../../images/lock1.jpg',
      '../../images/lock2.jpg',
      '../../images/lock0.jpg',
      '../../images/lock1.jpg',
      '../../images/lock2.jpg',
    ]
  },

  // 下拉加载后面的壁纸，并插入当前壁纸列表数组中


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取壁纸列表
    wx.request({
      url: '',
      method: 'GET',
      header: {
        apptype: 1001,
        token: ''
      },
      data: {
        offset: 0,
        limit: 20
      },
      complete: res => {
        console.log(res);
        // console.log(res.data.wallwappers)
        // this.setData({ imgList: res.data.wallwappers})
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