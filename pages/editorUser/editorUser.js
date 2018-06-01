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
    welcomeTxtTemp: '',
    showPopUp: true
  },

  /**
   * 称谓欢迎语框tap事件
   */
  editorTxt: function(){
    this.setData({showPopUp: true});
  },
  /**
   * 监听称谓输入事件
   */
  nameInput: function(e){
    console.log('输入名称');
    this.setData({nameTemp: e.detail.value})
  },
  /**
   * 监听欢迎语输入事件
   */
  welcomeInput: function(e){
    this.setData({welcomeTxtTemp: e.detail.value})
  },
  /**
   * 取消弹框
   */
  cancel: function(){
    this.setData({ showPopUp: false });
  },
  /**
   * 弹框确认
   */
  confirm: function(e){
    // console.log('确认事件触发');
    var nameTemp = this.data.nameTemp;
    var welcomeTxtTemp = this.data.welcomeTxtTemp;
    if(!nameTemp){nameTemp = '宝贝'}
    if(!welcomeTxtTemp){welcomeTxtTemp = '请输入欢迎语'}
    this.setData({
      hiddenmodalput: true,
      name: nameTemp,
      welcomeTxt: welcomeTxtTemp,
      showPopUp: false
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