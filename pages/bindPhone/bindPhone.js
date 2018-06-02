// pages/bindPhone/bindPhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoImage:'../../images/logo.png',
    getVerify: true,
    registerDisabled: true,
    phone: '',
    code: '',
    errTips: ''
  },
  /**
   * 监听手机号输入，只有11位时获取验证码框激活getVeify:true
   */
  phoneNum: function (e) {
    this.setData({ phone: e.detail.value });
    if (this.data.phone.length === 11) {
      this.setData({ getVerify: false })
    } else {
      this.setData({ getVerify: true })
    }

    // console.log(typeof this.data.phone.length)     //number
  },
  /**
   * 获取验证码
   */
  getCode: function(){
    console.log('获取验证码');
  },
  /**
   * 监听验证码输入,4位时inputVerify:true
   */
  codeNum: function (e) {
    this.setData({ code: e.detail.value });
    if (this.data.code.length === 4) {
      this.setData({ registerDisabled: false })
    } else {
      this.setData({ registerDisabled: true })
    }
  },
  /**
   * 登录
   */
  handleRegister: function () {
    var phone = this.data.phone;
    var code = this.data.code;
    console.log(phone);
    console.log(code);
    if (/^1[34578]\d{9}$/.test(phone) && /^\d{4}$/.test(code)){
      console.log('验证通过');
      this.setData({ errTips: '' });
      wx.navigateTo({ url: '../step1/step1' });
    }else{
      console.log('不通过');
      this.setData({ errTips: '手机号或验证码格式有误,请确认' });
      return;
    }
      
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