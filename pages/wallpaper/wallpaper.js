// pages/wallpaper/wallpaper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [
      
    ],
    lockUserId: null,
    page: 1,  //当前显示页
    pages: 1,   //总页数
    total: 0,   //壁纸总数
    limit: 10,   //每页显示数
    res: null     //函数调用返回结果
  },

  // 下拉加载后面的壁纸，并插入当前壁纸列表数组中


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.lockUserId);
    if(options.lockUserId){
      this.setData({ lockUserId: options.lockUserId })
    }
    // 获取壁纸列表
    console.log('壁纸列表');
    console.log(this.data.res);
  
    wx.request({
      url: 'http://c98008c9.ngrok.io/v1/wallwappers/',
      method: 'GET',
      header: {
        // 'token': app.globalData.userData.token,
        "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
        // "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
        "apptype": 1001
      },
      data: {
        offset: 0,
        limit: this.data.limit
      },
      success: res => {
        console.log(res);
        // console.log(res.data.data.total);
        console.log(this.data.limit);
        // var pagesT = res.data.data.total/this.data.limit;
        // console.log(pagesT);
        // var test = Math.ceil(pagesT);
        // console.log(test);
        // console.log(res.data.wallwappers)
        var pages = Math.ceil(res.data.data.total/this.data.limit)
        this.setData({ 
          imgList: res.data.data.wallwappers,
          total: res.data.data.total,
          pages: pages
        })
      },
      fail: res => {
        console.log(res);
      }
    })
  },

  /**
   * 获取壁纸function
   */
  // getWallwappers: function(page){
  //   console.log('调用函数');
  //   console.log(page);
  //   wx.request({
  //     url: 'http://1c8638d4.ngrok.io/v1/wallwappers/',
  //     method: 'GET',
  //     header: {
  //       // 'token': app.globalData.userData.token,
  //       "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
  //       "apptype": 1001
  //     },
  //     data: {
  //       offset: this.data.limit * (page - 1) + 1,
  //       limit: this.data.limit
  //     },
  //     success: res => {
  //       console.log(res);
  //       // console.log(res.data.wallwappers)
  //       // this.setData({ imgList: res.data.data.wallwappers })
  //       // return res;
  //       console.log(11);
  //       var res = JSON.stringify(res);
  //       this.setData({ res: res })
  //       console.log(22)
  //       console.log(this.data.res)
  //     },
  //     fail: res => {
  //       console.log(res);
  //     }
  //   })
  // },
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
    if (this.data.total <= this.data.limit) {
      return;
    } else if (this.data.page < this.data.pages) {
      // 显示加载图标
      wx.showLoading({ title: "玩命加载中" });
      this.setData({
        page: this.data.page + 1
      });
      wx.request({
        url: 'http://1c8638d4.ngrok.io/v1/wallwappers/',
        method: 'GET',
        header: {
          // 'token': app.globalData.userData.token,
          "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
          "apptype": 1001
        },
        data: {
          offset: 0,
          limit: this.data.limit
        },
        success: res => {
          console.log(res);
          // console.log(res.data.wallwappers)
          var temp = this.data.msgList;
          for (var i = 0; i < res.data.data.wallwappers.length; i++) {
            temp.push(res.data.data.wallwappers[0])
          }
          this.setData({ imgList: temp });
        },
        fail: res => {
          console.log(res);
        }
      })
      
      wx.hideLoading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})