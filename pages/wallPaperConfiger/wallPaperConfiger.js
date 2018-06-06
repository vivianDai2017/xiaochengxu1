// pages/wallPaperConfiger/wallPaperConfiger.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: ''
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.imgUrl);
    this.setData({imgUrl: options.imgUrl})
  },
  /**
   * 取消返回壁纸列表页事件
   */
  cancel: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 确认跳转至用户编辑页面（传递壁纸地址）
   */
  confirm: function () {
    wx.navigateTo({
      url: '../editorUser/editorUser?url=' + this.data.imgUrl
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