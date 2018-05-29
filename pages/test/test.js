// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getVerify:true,
    registerDisabled: true,
    phone:'',
    code: '',
    netType:'',
    test:'',
    wifi:'',
    wifiListS:'',
    wifiListE:'',
    wifiList:'',
    isOk: ''
  },
  test: function(){
   wx.showActionSheet({
     itemList: ['A', 'B', 'C'],
     success: function (res) {
       console.log(res.tapIndex)
     },
     fail: function (res) {
       console.log(res.errMsg)
     }
   })
  },
  /**
   * 监听手机号输入，只有11位时获取验证码激活getVeify:true
   */
  phoneNum: function(e){
    this.setData({ phone:e.detail.value });
    if(this.data.phone.length === 11){
      this.setData({ getVerify: false })
    }else{
      this.setData({ getVerify:true })
    }
      
    // console.log(typeof this.data.phone.length)     //number
  },
  /**
   * 监听验证码输入,4位时inputVerify:true
   */
  codeNum: function(e){
    this.setData({ code:e.detail.value });
    if(this.data.code.length === 4){
      this.setData({ registerDisabled:false })
    }else{
      this.setData({ registerDisabled:true })
    }
  },
  /**
   * 登录
   */
  handleRegister: function(){
    var phone = this.data.phone;
    var code = this.data.code;
    if (/^1[34578]\d{9}$/.test(phone) && /^\d{4}$/.test(code))
      console.log('验证通过');
    else
      console.log('不通过');
      return;
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
    var a = getApp();
    console.log('获取用户信息' + a.globalData.userInfo);
    // 获取联网形式
    wx.getNetworkType({
      success: (res)=> {
        var tem = res.networkType;
        console.log(tem);
        this.setData({netType: tem});
        console.log(tem);
      },
    });
    wx.startWifi({
      success: (res) => {
        console.log(res);
        console.log(1);
        this.setData({
          wifi: res.errMsg
        })
      },
      fail: (res) => {
        console.log(3);
        console.log(res);
        console.log(res.errMsg);
        this.setData({
          test: res.errMsg
        })
      }
    });
    console.log(2);

    wx.getWifiList({
      success: (res) => {
        console.log('获取列表成功');
        console.log(res);
        this.setData({ wifiListS: res.errMsg })
      },
      fail: (res) => {
        console.log('获取列表失败');
        console.log(res);
        this.setData({ wifiListE: res.errMsg });
      }
    });
    wx.onGetWifiList(function (res) {
      console.log(10);
      console.log(JSON.stringify(res));
      this.setData({ wifiList: res.wifiList, isOk:'ok' });
      console.log(11);
    });
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