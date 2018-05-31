// pages/editorUser/editorUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,  
    name: "宝贝",
    welcomeTxt: "请输入欢迎语",
    nameTemp: '',
    welcomeTxtTemp: ''
  },


  editorTxt: function(){
    console.log(1);
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  nameInput: function(e){
    this.setData({nameTemp: e.detail.value})
  },
  welcomeInput: function(e){
    this.setData({welcomeTxtTemp: e.detail.value})
  },
  // 取消弹框
  cancel: function(){
    this.setData({hiddenmodalput: true});
  },
  // 确认
  confirm: function(e){
    var nameTemp = this.data.nameTemp;
    var welcomeTxtTemp = this.data.welcomeTxtTemp;
    if(!nameTemp){nameTemp = '宝贝'}
    if(!welcomeTxtTemp){welcomeTxtTemp = '请输入欢迎语'}
    this.setData({
      hiddenmodalput: true,
      name: nameTemp,
      welcomeTxt: welcomeTxtTemp
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