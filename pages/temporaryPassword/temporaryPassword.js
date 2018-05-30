// pages/temporaryPassword/temporaryPassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    temPassword: '',
    onlyOne: false
  },

  createTemPassword: function(){
    var pass = parseInt(Math.random() * 899999 + 100000);
    this.setData({temPassword: pass})
  },
  isOnlyOne: function(){
      this.setData({onlyOne: !this.data.onlyOne})
  },
  share: function(event){
    console.log(event);
    console.log(event.currentTarget.dataset.pass);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var now = new Date().toLocaleDateString();
    this.setData({time: now});
    this.createTemPassword();
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
  onShareAppMessage: function (res) {
    console.log(11);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
    } else {
      console.log('no button');
    }
    return {
      title: '转发消息',
      path: '/pages/editorUser/editorUser',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})