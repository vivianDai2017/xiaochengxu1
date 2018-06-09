// pages/step1/step1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 4,
    result: '',
    scanType: '',
    charSet: '',
    waitLock: false,
    list: '',
    wifiBefore: false,  //改true
    wifiList: false,
    showPopUp: false,
    passWord: '',
    wifiName: '',
    waitNet: false,
    connectSucc: true,
    connectFail: false
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
        this.setData({ waitLock: true });
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
              this.setData({ step: 3 });
              this.setData({ waitLock: false });
              this.setData({ wifiBefore: true });
            },
            fail: (res) => {
              console.log('接口调用失败');
              this.setData({ waitWifi: false });
              
              this.setData({ step: 3 });
              this.setData({ waitLock: false });
              this.setData({ wifiBefore: true });
              console.log('接口调用失败结束');
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
    /**
     * 开发调试暂注释
     */
    wx.startWifi({
      // success: (res) => {
      //   // console.log(res.errMsg);
      //   this.setData({ start: res.errMsg });
      // },
      // fail: (res) => {
      //   console.log(res.errMsg);
      //   // this.setData({ start: res.errMsg });
      // },
      complete: res => {
        console.log(res.errMsg);
        // this.setData({ startEnd: res.errMsg });
      }
    });
    // 请求获取wifi列表
     /**
     * 开发调试暂注释
     */
    wx.getWifiList({
      // success: res => {
      //   console.log(res.errMsg);
      //   // this.setData({ getWf: res.errMsg });
      // },
      // fail: res => {
      //   console.log(res.errMsg);
      //   // this.setData({ getWf: res.errMsg });
      // },
      complete: res => {
        console.log(res.errMsg);
        // this.setData({ getWfEnd: res.errMsg });
      }
    });
    // 监听获取wifi列表事件
    /**
     * 开发调试暂注释
     */
    wx.onGetWifiList((res) => {
      // this.setData({ test: 1 });
      this.setData({ 
        list: res.wifiList,
        wifiList: true, 
        wifiBefore: false
      });
      console.log('开始测试');
      console.log(res.wifiList);
      console.log(res.wifiList[0].signalStrength);
      console.log( typeof res.wifiList[0].signalStrength);
      // setWifiList是ios特有接口
      // if (res.wifiList.length) {
      //   wx.setWifiList({
      //     wifiList: [{
      //       SSID: res.wifiList[0].SSID,
      //       BSSID: res.wifiList[0].BSSID,
      //       password: '123456'
      //     }]
      //   })
      // } else {
      //   wx.setWifiList({
      //     wifiList: []
      //   })
      // }
    });
    /**
     * 开发调试用(设备联网成功)
     */
    // this.setData({
    //   step: 4,
    //   wifiBefore: false,
    //   connectSucc: true
    // });
    /**
     * 开发调试用(设备联网失败)
     */
    // this.setData({
    //   wifiBefore: false,
    //   connectFail: true
    // });
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
   * 监听密码框输入
   */
  wifiPassInput: function(e){
    console.log(e.detail.value);
    // var pass = e.detail.value;
    // console.log(pass);
    this.setData({passWord: e.detail.value})
  },
  /**
   * 输入wifi密码弹框取消事件
   */
  cancel: function () {
    console.log('取消按钮');
    this.setData({ showPopUp: false });
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
          waitNet: false,
          connectSucc: true
        });

      },
      fail: function(){
        console.log('接口调用失败');
        /**
         * 跳至第四步，联网失败（connectFail）页面显示，仍停留在第三步
         * 开发调试用
         */
        this.setData({
          /**
           * 开发调试用
           */
          step: 4,
          waitNet: false,
          connectSucc: true
        });
        /**
         * 实际应用
         */
        // this.setData({
        //   waitNet: false,
        //   connectFail: true
        // });
      },
    })
  },
  /**
   * 设备联网失败返回wifi列表（toWifiList）
   */
  toWifiList: function(){
    this.setData({
      step: 3,
      wifiList: true
    })
  },
  /**
   * 设备联网成功，跳转至已绑定锁具列表页
   */
  toLockList: function(){
    wx.navigateTo({
      url: '../index/index',
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