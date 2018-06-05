// pages/lockUsers/lockUsers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usersList:[
        {
          'wallwapperId': 1,
          'name': '默认称呼',
          'fingerNum': 3
        },
        {
          'wallwapperId': 1,
          'name': '妈妈',
          'fingerNum': 2
        }
      ],
    touchDot: 0, //触摸时的原点
    time: 0,
    interval: '',
    touchName: '',
    moveL: false,
    moveR: false,
    disabled: false,
    showPopUp: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 根据设备id获取设备用户信息
    // console.log(options);
    console.log(this.data.usersList.length);
    var deviceId = options.deviceId;
    // console.log(deviceId);
    wx.request({
      url: '',
      method: 'PATCH',
      header: {},
      data: {
        deviceId
      },
      success: function(res){
        console.log(res.data);
        // 1.将请求回来的数据放到data中的usersList中，通过this.setData({})
        // 2.判断用户数，达到24时，添加新成员按钮失效
        if (this.data.usersList.length >= 24) {
          // 按钮失效
          this.setData({ disabled: true })
          console.log(1);
        }
      },
      fail: (res) => {
        // 开发测试用
        // 2.判断用户数，达到24时，添加新成员按钮失效
        if (this.data.usersList.length >= 24) {
          // 按钮失效
          this.setData({ disabled: true })
          console.log(1);
        }
      },
      complete: function(){}
    });
  

  },
  // 滑动触摸开始事件
  touchStart: function (e) {
    //若touchName不为空，moveL和moveR为true，先设置touchName为空，moveL和moveR为false,防止后面操作过一次不能再操作的情况
    if(this.data.touchName && this.data.moveL && this.data.moveR){
      this.setData({
        touchName: '',
        moveL: false,
        moveR: false
      })
    }    
    this.setData({ touchName: e.currentTarget.dataset.name });
    //获取触摸时原点
    var dot = e.touches[0].pageX;
    var timer = setInterval(() => {
      this.setData({ time: this.data.time++ })
    }, 100);
    this.setData({
      touchDot: dot,
      interval: timer
    });
  },
  //  滑动触摸事件结束
  touchEnd: function (e) {
    console.log('滑动结束');
    console.log(e);
    var touchMove = e.changedTouches[0].pageX;
    // 向左滑动   
    if (touchMove - this.data.touchDot <= -40 && this.data.time < 10) {
      //执行切换页面的方法
      // 删除按钮显示在屏幕中
      this.setData({ 
        moveL: true
      });
    }
    // 向右滑动   
    if (touchMove - this.data.touchDot >= 40 && this.data.time < 10 && this.data.moveL) {
      //执行切换页面的方法
      this.setData({ 
        moveR: true
      });
    }
    clearInterval(this.data.interval); // 清除setInterval
    this.setData({time: 0});
  },
  test: function(){
    console.log('按钮可用');
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