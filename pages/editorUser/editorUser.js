// pages/editorUser/editorUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,  
    name: "宝贝",           //默认称呼
    choiceName: null,      //添加用户选择称呼
    welcomeTxt: "请输入欢迎语",   //默认欢迎语
    imgUrl: 'http://192.168.1.178/v1/image/51.jpg',      //默认壁纸url
    nameTemp: '',
    welcomeTxtTemp: '',
    showPopUp: false,
    showCallPopUp: false,
    showDeletePopUp: false,
    // oneAdd: true,
    // twoAdd: false,
    // threeAdd: false,
    deviceId: null,
    lockUserId: null,      //锁用户id
    // userList: null,         //锁用户信息
    callfinger: null,       //报警指纹
    finger1: null,
    finger2: null,
    finger3: null,
    finger: null              //正在操作的指纹
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.lockUserId);
    // console.log(options.userList);
    // if (!options.lockUserId){
      if (options.lockUserId) {
      // 若无锁用户id/下标index(还未添加，或者添加中)
      var name = options.name;
      this.setData({ 
        name: options.name ,
        choiceName: options.name
      });
    }else{
      this.setData({ lockUserId: options.lockUserId });
      wx.request({
        // url: 'http://6844ea95.ngrok.io/v1/devices/',
        // url: 'http://df5a1228.ngrok.io//v1/lockusers/' + options.lockUserId,
        url: 'http://c98008c9.ngrok.io//v1/lockusers/' + 5,
        method: 'GET',
        header: {
          // 'token': app.globalData.userData.token,
          "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
          // "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
          'apptype': 1001
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          console.log('锁用户详情请求成功');
          console.log(res);
          var res = res.data.data.lockuser
          this.setData({
            name:  res.name,
            welcomeTXT: res.welcome,
            imgUrl: res.wallwapperpath,
            callfinger: res.callfinger,       
            finger1: res.finger1,
            finger2: res.finger2,
            finger3: res.finger3
          })
        }
      })
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
   * 指纹删除事件
   */
  delete: function(e){
    console.log(e.currentTarget.dataset.finger);
    var finger = e.currentTarget.dataset.finger;
    console.log('delete');
    this.setData({ 
      showDeletePopUp: true,
      finger: e.currentTarget.dataset.finger
    });
    
  },
  /**
   * 指纹添加事件
   */
  add: function (e) {
    console.log('add');
    console.log(e);
    var finger = e.currentTarget.dataset.finger;
    this.setData({ finger: e.currentTarget.dataset.finger });
    // 1.进入添加指纹提示页
    wx.navigateTo({
      // url: '../addFinger/addFinger',
      url: '../addFinger/addFinger?lockUserId=' + this.data.lockUserId + '&&finger=' + this.data.finger,
    })
    // 2.向后台发送消息，开始设置指纹
    // console.log('添加指纹');
    // wx.request({
    //   url: 'http://1c8638d4.ngrok.io/v1/lockusers/' + this.data.lockUserId,
    //   method: "POST",
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     // 'token': app.globalData.userData.token,
    //     "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
    //     "apptype": 1001
    //   },
    //   data: {
    //     finger: true
    //   },
    //   success: res => {
    //     console.log(res);
    //     if(finger == 'finger1'){ this.setData({ finger1: true }) }
    //     if(finger == 'finger2'){ this.setData({ finger2: true }) }
    //     if(finger == 'finger3'){ this.setData({ finger3: true }) }
    //     wx.navigateTo({
    //       url: '../addSucc/addSucc',
    //     })
    //   },
    //   fail: res => {
    //     console.log(res);
    //   }
    // })
  },
  /**
   * 删除指纹弹框确认事件
   */
  deleteFinger: function(){
    console.log('确认删除指纹'+ this.data.finger);
    var finger = this.data.finger;
    wx.request({
      url: 'http://1c8638d4.ngrok.io/v1/lockusers/' + this.data.lockUserId,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        // 'token': app.globalData.userData.token,
        "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
        "apptype": 1001
      },
      data: {
        finger: false
      },
      success: res => {
        console.log(res);
        if(finger == 'finger1'){ this.setData({ finger1: false }) }
        if(finger == 'finger2'){ this.setData({ finger2: false }) }
        if(finger == 'finger3'){ this.setData({ finger3: false }) }
        this.setData({
          showDeletePopUp: false
        });
      },
      fail: res => {
        console.log(res);
      }
    })
  },
  /**
   * 报警指纹
   */
  call:function(e){
    this.setData({ 
      showCallPopUp: true,
      finger: e.currentTarget.dataset.finger
    })
  },
  /**
   * 设置报警指纹弹框确认
   */
  addCallFinger: function () {
    // 1.进入添加指纹提示页
    wx.navigateTo({
      // url: '../addFinger/addFinger?call = true && lockUserId = ' + this.data.lockUserId + ' && finger=' + this.data.finger,
      url: '../addFinger/addFinger?lockUserId=' + this.data.lockUserId + '&&finger=' + this.data.finger + '&&call=' + 1,
    })
    // 2.向后台发送消息，开始设置报警指纹
    console.log('设置报警指纹');

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
    }else if(this.data.choiceName){
      nameTemp = this.data.choiceName
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
    // 已添加的锁用户携带锁用户id
    wx.navigateTo({
      url: '../wallpaper/wallpaper?lockUserId=' + this.data.lockUserId,
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