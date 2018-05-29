// pages/wifi/wifi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: '',
    startEnd: '',
    getWf: '',
    getWfEnd: '',
    list: '',
    test: 2
  },

  getWifiList: function(){
    // 初始化wifi模块
    wx.startWifi({
      success: (res)=>{
        console.log(res.errMsg);
        this.setData({start: res.errMsg});
      },
      fail: (res)=>{
        console.log(res.errMsg);
        this.setData({start: res.errMsg});
      },
      complete: res => {
        console.log(res.errMsg);
        this.setData({startEnd: res.errMsg});
      }
    });
    
    // 监听获取wifi列表事件
    wx.onGetWifiList((res)=>{
      this.setData({test: 1});
      this.setData({list: res.wifiList});
      if (res.wifiList.length) {
        wx.setWifiList({
          wifiList: [{
            SSID: res.wifiList[0].SSID,
            BSSID: res.wifiList[0].BSSID,
            password: '123456'
          }]
        })
      } else {
        wx.setWifiList({
          wifiList: []
        })
      }
    })
    // 请求获取wifi列表
    wx.getWifiList({
      success: res => {
        console.log(res.errMsg);
        this.setData({ getWf: res.errMsg });
      },
      fail: res => {
        console.log(res.errMsg);
        this.setData({ getWf: res.errMsg });
      },
      complete: res => {
        console.log(res.errMsg);
        this.setData({ getWfEnd: res.errMsg });
      }
    });
  },














  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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