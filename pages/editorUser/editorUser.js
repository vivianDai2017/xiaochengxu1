// pages/editorUser/editorUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,  
    name: "宝贝",           //默认称呼
    welcomeTxt: "请输入欢迎语",   //默认欢迎语
    imgUrl: 'http://192.168.1.178/v1/image/51.jpg',      //默认壁纸url
    nameTemp: '',
    welcomeTxtTemp: '',
    showPopUp: false,
    showCallPopUp: false,
    showDeletePopUp: false,
    oneAdd: true,
    twoAdd: false,
    threeAdd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.imgUrl);
    if(!options.index){
      // 若无所用户id/下标index(还未添加，或者添加中)
      var name = options.name;
      this.setData({ name: options.name });
    }else{
      // 1.获取锁用户id,对应锁的id
      // 2.
      // console.log(options);
      this.setData({ imgUrl: options.url });
      console.log(this.data.imgUrl);
    }
    
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
    console.log(e.detail.value);
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
    this.setData({ 
      showPopUp: false ,
      showCallPopUp: false,
      showDeletePopUp: false
    });
  },
  /**
   * 设置报警指纹
   */
  addCallFinger: function(){
    // 1.进入添加指纹提示页
    wx.navigateTo({
      url: '../addFinger/addFinger',
    })
    // 2.向后台发送消息，开始设置报警指纹
    console.log('设置报警指纹');
    
  },
  /**
   * 指纹删除与添加事件
   */
  delete: function(){
    console.log('delete');
    this.setData({ showDeletePopUp: true });
  },
  add: function () {
    console.log('add');
  },
  /**
   * 删除指纹弹框确认事件
   */
  deleteFinger: function(){
    console.log('确认删除指纹');
  },
  /**
   * 报警指纹
   */
  call:function(){
    this.setData({ showCallPopUp: true })
  },
  /**
   * 称谓及欢迎语弹框确认
   */
  confirm: function(e){
    // console.log('确认事件触发');
    var nameTemp = this.data.nameTemp;
    var welcomeTxtTemp = this.data.welcomeTxtTemp;
    console.log(this.data.name);
    if(!nameTemp && this.data.name == '宝贝'){
      nameTemp = '宝贝'
    }else{ nameTemp = this.data.name}
    if(!welcomeTxtTemp){welcomeTxtTemp = '请输入欢迎语'}
    this.setData({
      hiddenmodalput: true,
      name: nameTemp,
      welcomeTxt: welcomeTxtTemp,
      showPopUp: false
    }); 
  },
  /**
   * 点击切换壁纸
   */
  change: function(){
    console.log('点击切换壁纸');
    wx.navigateTo({
      url: '../wallpaper/wallpaper',
    })


    /*
    //返回壁纸列表页(2种情况：1.从锁用户界面跳转过来，2.从壁纸列表页经确认页跳转过来)
    var pages = getCurrentPages();
    console.log('查看页面栈');
    console.log(pages);
    var prevPage = pages[pages.length-2];
    console.log(prevPage);
    if(prevPage.data.isLockUsers){
      // 从锁用户界面跳转过来
      wx.navigateTo({
        url: '../wallpaper/wallpaper',
      })
      console.log('从锁用户界面过来');
    }else{
      // 从壁纸列表页经确认页跳转过来
      wx.navigateBack({
        delta: 2
      })
      console.log('从壁纸列表页面过来');
    }
    */
    
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