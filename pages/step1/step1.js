// pages/step1/step1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 3,
    result: '',
    scanType: '',
    charSet: '',
    waitLock: false,
    // start: '',
    // startEnd: '',
    // getWf: '',
    // getWfEnd: '',
    list: '',
    // test: 2,
    wifiBefore: false,  //改true
    wifiList: false,
    showPopUp: false,
    passWord: '',
    wifiName: '',
    waitNet: true,
    connectSucc: false
  },

  /**
   * 开始扫描
   */
  startScan: function(){
    console.log('开始扫描');
    this.setData({step: 2});
    // 开始扫码
    wx.scanCode({
      // 只允许从相机扫码
      onlyFromCamera: true,
      success: (res) => {
        console.log(res);
        this.setData({ wait: true });
        // this.setData({
        //   result: res.result,
        //   scanType: res.scanType,
        //   charSet: res.charSet,
        //   // step: 3
        // });
        // 将获取到的信息发给后台，在后台没有返回响应前显示‘锁具信息等待获取中’
        setTimeout(() => {
          console.log('启动定时器');
          wx.request({
            url: '',
            data: {},
            method: "POST",
            // dataType: 'json'
            success: (res) => {
              console.log('接口调用成功');
              this.setData({ waitWifi: false });
              this.setData({ step: 3 })
            },
            fail: (res) => {
              console.log('接口调用失败');
              this.setData({ waitWifi: false });
              console.log('接口调用失败结束');;
              this.setData({ step: 3 });
            }
          })
        },3000);
        
      },
      fail: function(res){
        console.log(res);
      }
    })
  },
  /**
   * 开始联网
   * 点击开始联网，获取手机wifi列表信息
   */
  getWifiList: function(){
    // 初始化wifi模块
    wx.startWifi({
      success: (res) => {
        console.log(res.errMsg);
        this.setData({ start: res.errMsg });
      },
      fail: (res) => {
        console.log(res.errMsg);
        // this.setData({ start: res.errMsg });
      },
      complete: res => {
        console.log(res.errMsg);
        // this.setData({ startEnd: res.errMsg });
      }
    });
    // 请求获取wifi列表
    wx.getWifiList({
      success: res => {
        console.log(res.errMsg);
        // this.setData({ getWf: res.errMsg });
      },
      fail: res => {
        console.log(res.errMsg);
        // this.setData({ getWf: res.errMsg });
      },
      complete: res => {
        console.log(res.errMsg);
        // this.setData({ getWfEnd: res.errMsg });
      }
    });
    // 监听获取wifi列表事件
    wx.onGetWifiList((res) => {
      // this.setData({ test: 1 });
      this.setData({ list: res.wifiList });
      this.setData({ wifiList: true, wifiBefore: false });
      // setWifiList是ios特有接口
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
  },
  /**
   * 选择wifi点击输入密码
   */
  getPassPopUp: function(e){
    console.log('点击列表事件');
    this.setData({ showPopUp: true });
    console.log(e);
    this.setData({ wifiName: e.currentTarget.dataset.wifiName });
  },
  /**
   * 输入wifi密码弹框取消事件
   */
  cancel: function(){
    console.log('取消按钮');
    this.setData({ showPopUp: false });
  },
  /**
   * 监听密码框输入
   */
  wifiPassInput: function(e){
    console.log(e.detail.value);
    // var pass = e.detail.value;
    // console.log(pass);
    this.setData({passWord: e.detail.value})
  },
  /**
   * 输入wifi密码弹框确认事件---将wif名（wifiName）和密码（passWord）传给后台
   */
  confirm: function(){
    // 弹出框(showPopUp)隐藏，欢迎使用云巢智能锁，联网中(waitNet)显现
    this.setData({ 
      showPopUp: false ,
      waitNet: true,
    });
    wx.request({
      url: '',
      data: {wifiName, passWord},
      method: 'POST',
      success: function(data){
        console.log('开发者服务器返回数据');
        // 跳至第四步，联网成功（connectSucc）页面显示
        this.setData({
          step: 4,
          connectSucc: true
        });

      },
      fail: function(){
        console.log('接口调用失败');
        /**
         * 跳至第四步，联网成功（connectSucc）页面显示
         * 开发调试用
         */
        this.setData({
          step: 4,
          connectSucc: true
        });
      },
    })
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