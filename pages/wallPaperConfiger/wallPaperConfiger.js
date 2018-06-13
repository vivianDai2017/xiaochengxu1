// pages/wallPaperConfiger/wallPaperConfiger.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    lockUserId: null
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.imgUrl);
    console.log(options.lockUserId);
    this.setData({
      imgUrl: options.imgUrl,
      lockUserId: options.lockUserId
    })
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
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 3];  //上上一个页面
    console.log(currPage);
    console.log(prevPage);
    prevPage.setData({ imgUrl: this.data.imgUrl});
    console.log(this.data.imgUrl);
    console.log(prevPage);
    // wx.navigateTo({
    //   url: '../editorUser/editorUser?url=' + this.data.imgUrl
    // })
    // 将壁纸信息传给服务器（修改用户属性）
    wx.request({
      url: 'http://1c8638d4.ngrok.io/v1/lockusers/' + this.data.lockUserId,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        // 'token': app.globalData.userData.token,
        "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
        "apptype": 1001
      },
      data: {
        wallwapperpath: this.data.imgUrl
      },
      success: res => {
        console.log(res);
        // 返回用户编辑页
        wx.navigateBack({
          delta: 2
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