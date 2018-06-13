// pages/lockUsers/lockUsers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choiceList: [
      {
        'name': '老公',
        'src': '../../images/label.png'
      },
      {
        'name': '孩子他爸',
        'src': '../../images/label-long.png'
      },
      {
        'name': '爸爸',
        'src': '../../images/label.png'
      },
      {
        'name': '孩子他妈',
        'src': '../../images/label-long.png'
      },
      {
        'name': '老婆',
        'src': '../../images/label.png'
      },
      {
        'name': '妈妈',
        'src': '../../images/label.png'
      },
      {
        'name': '宝贝',
        'src': '../../images/label-bg.png'
      },
      {
        'name': '儿子',
        'src': '../../images/label.png'
      },
      {
        'name': '女儿',
        'src': '../../images/label.png'
      },
      {
        'name': '先生',
        'src': '../../images/label.png'
      },
      {
        'name': '女士',
        'src': '../../images/label.png'
      },
      {
        'name': '你好',
        'src': '../../images/label.png'
      }
    ],
    index: 6,    // 称呼默认选择 宝贝 ，下标6
    name: '宝贝',   // 称呼选择名称（新添加成员的称呼）
    tempName: '',   // 新添加成员称呼-自定义监听称呼
    usersList:[
        // {
        //   'wallwapperUrl': '../../images/lock2.jpg',
        //   'name': '默认称呼',
        //   'fingerNum': 3
        // },
        // {
        //   'wallwapperUrl': '../../images/lock2.jpg',
        //   'name': '妈妈',
        //   'fingerNum': 2
        // }
    ],
    touchDot: 0, //触摸时的原点
    time: 0,
    interval: '',
    touchName: '',   // 当前滑动操作的用户名称
    moveL: false,
    moveR: false,
    disabled: false,
    showPopUp: false,    // 确认删除弹框
    showNamePopUp: false,  //称呼选择、编辑弹框
    popUpTitle: '为用户选择称呼',
    showChoice: true,
    isLockUsers: true   //当前页面是否为锁用户列表页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 根据设备id获取设备用户信息
    console.log(options.deviceId);
    this.setData({ deviceId: options.deviceId });
    wx.request({
      url: 'http://c98008c9.ngrok.io/v1/lockusers/',
      method: 'GET',
      header: {
        // 'token': app.globalData.userData.token,
        "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
        'apptype': 1001
      },
      data: {
        deviceid: options.deviceId
      },
      success: res => {
        console.log(res);
        console.log(res.data.data.lockusers);
        // 1.将请求回来的数据放到data中的usersList中，通过this.setData({})
        this.setData({ usersList: res.data.data.lockusers})
        // 2.判断用户数，达到24时，添加新成员按钮失效
        if (this.data.usersList.length >= 24) {
          // 按钮失效
          this.setData({ disabled: true })
        }
      },
      fail: (res) => {
        console.log(res);
        // 开发测试用
        // 2.判断用户数，达到24时，添加新成员按钮失效
        // if (this.data.usersList.length >= 24) {
        //   // 按钮失效
        //   this.setData({ disabled: true })
        //   console.log(1);
        // }
      }
      
    })

  },
  // 滑动触摸开始事件
  touchStart: function (e) {
    //若touchName不为空，moveL和moveR为true，先设置touchName为空，moveL和moveR为false,防止后面操作过一次不能再操作的情况
    if(this.data.touchName && this.data.moveL && this.data.moveR){
      this.setData({
        touchName: '',
        moveL: false,
        moveR: false
      })
    }    
    this.setData({ touchName: e.currentTarget.dataset.name });
    //获取触摸时原点
    var dot = e.touches[0].pageX;
    var timer = setInterval(() => {
      this.setData({ time: this.data.time++ })
    }, 100);
    this.setData({
      touchDot: dot,
      interval: timer
    });
  },
  //  滑动触摸事件结束
  touchEnd: function (e) {
    console.log('滑动结束');
    console.log(e);
    var touchMove = e.changedTouches[0].pageX;
    // 向左滑动   
    if (touchMove - this.data.touchDot <= -40 && this.data.time < 10) {
      //执行切换页面的方法
      // 删除按钮显示在屏幕中
      this.setData({ 
        moveL: true
      });
    }
    // 向右滑动   
    if (touchMove - this.data.touchDot >= 40 && this.data.time < 10 && this.data.moveL) {
      //执行切换页面的方法
      this.setData({ 
        moveR: true
      });
    }
    clearInterval(this.data.interval); // 清除setInterval
    this.setData({time: 0});
  },
  /**
   * 添加新成员
   */
  addNewUser: function(){
    this.setData({ showNamePopUp: true });
  },
  /**
   * 删除用户确认事件
   */
  deleteConfirm: function(e){
    // console.log('确认删除吗');
    this.setData({ showPopUp: true });
    var lockUserId = e.currentTarget.dataset.lockuserid;
    wx.request({
      url: 'http://c98008c9.ngrok.io/v1/lockusers/' + lockUserId,
      method: "DELETE",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        // 'token': app.globalData.userData.token,
        "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
        "apptype": 1001
      },
      success: res => {
        console.log(res);
        
      },
      fail: res => {
        console.log(res);
      }
    })
  },
  /**
   * 删除用户弹框取消事件：弹框隐藏
   */
  cancel: function(){
    this.setData({ showPopUp: false });
  },
  /**
   * 删除用户弹框确认事件：
   *  1.携带用户名称（name--touchName）,通知后台删除该用户信息
   *  2.弹框隐藏
   */
  confirm: function(){
    console.log(this.data.touchName);
    wx.request({
      url: '',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    });
    this.setData({ showPopUp: false});
  },
  /**
   * 用户称呼选择事件
   */
  choiceName: function(e){
    console.log(e);
    var tapIndex = e.currentTarget.dataset.index;
    // 如果tap的是默认样式
    if(tapIndex == 6 && this.data.index == 6){
      // return;
      // 5.跳转至用户编辑页面
      wx.navigateTo({
        url: '../editorUser/editorUser?name=' + this.data.name,
      })
    }else{
      // 1.将之前选中的称呼的样式改为正常
      var before = 'choiceList[' + this.data.index + '].src';
      // 1.1先判断之前选中的称呼是否为多字长标签（下标index =1 || 3）
      if (this.data.index == 1 || this.data.index == 3){
        this.setData({ 
          [before]: '../../images/label-long.png',
          // 2.更改this.data.index  = tapIndex
          index: tapIndex
        });
      }else{
        this.setData({
          [before]: '../../images/label.png',
          // 2.更改this.data.index  = tapIndex
          index: tapIndex
        });
      }
      // 3.更改当前选中的称呼为选中样式
      var later = 'choiceList[' + this.data.index + '].src';
      // 3.1先判断选中的称呼是否为多字长标签（下标index = 1 || 3）
      if(this.data.index == 1 || this.data.index == 3){
        // console.log('长标签');
        this.setData({ [later]: '../../images/label-long-bg.png' });
      }else{
        // console.log('短标签');
        this.setData({ [later]: '../../images/label-bg.png' });
      }
      // 4.将更改通过数据this.data.name同步到视图
      this.setData({ name: e.currentTarget.dataset.name });
      // 5.跳转至用户编辑页面
      wx.navigateTo({
        url: '../editorUser/editorUser?name=' + this.data.name,
      })
    }
  },
  
  /**
   * tap键盘图片实现称呼自定义
   */
  toCustom: function(){
    console.log('开始自定义');
    // 1.更改弹框标题，清除输入框内容，称呼标签隐藏
    this.setData({ 
      popUpTitle: '编辑称呼',
      name: '',
      showChoice: false
    });
  },
  toChoice: function(){
    this.setData({
      showChoice: true,
      name: '宝贝',
      popUpTitle: '为用户选择称呼'
    })
  },
  /**
   * 监听input框输入，获取自定义名称
   */
  getCustomName: function(e){
    // console.log(e.detail.value);
    // console.log(e.detail.cursor);
    this.setData({ tempData: e.detail.value });
  },
  /**
   * 自定义（编辑）称呼确认事件
   */
  inputName: function () {
    // 4.将更改通过数据this.data.name同步到视图
    this.setData({ name: this.data.tempData });
    // 5.跳转至用户编辑页面
    wx.navigateTo({
      url: '../editorUser/editorUser?name=' + this.data.name ,
    })
  },
  /**
   * tap用户列表去用户编辑页面
   */
  toUserEditor: function(e){
    // 数组下标
    console.log('编辑用户');
    console.log(e);
    console.log(e.currentTarget.dataset.lockuserid);
    console.log(e.currentTarget.dataset.index);
    var lockUserId = e.currentTarget.dataset.lockuserid;
    var userList = this.data.usersList[e.currentTarget.dataset.index];
    console.log(lockUserId);
    console.log(userList);
    wx.navigateTo({
      // 携带壁纸地址
      // url: '../editorUser/editorUser?url=' + this.data.usersList[index].wallwapperUrl
      // 携带锁用户id（lockusersId）/下标
      url: '../editorUser/editorUser?lockUserId=' + lockUserId + '&&userList=' + JSON.stringify(userList)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
   /* var a = 0.6
    // canvas绘图
    var ctx = wx.createCanvasContext("firstCanvas", this);
    // 画外框
    ctx.beginPath();
    ctx.moveTo(0, 62*a);
    ctx.lineTo(23*a, 34*a);
    ctx.lineTo(134*a, 34*a);
    ctx.lineTo(134*a, 90*a);
    ctx.lineTo(23*a, 90*a);
    ctx.closePath();
    ctx.stroke();
    // 画圆圈
    ctx.beginPath();
    ctx.arc(23*a, 62*a, 6*a, 0, 2*Math.PI);
    ctx.stroke();
    // 画文字
    ctx.setFontSize(32*a);
    ctx.setTextBaseline('top');
    ctx.fillText('爸爸', 48*a, 40*a);
    ctx.draw();*/
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