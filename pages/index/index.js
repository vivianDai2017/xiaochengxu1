//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    lockInfoList: [
      // { 
      //   deviceName: '1家Alex的锁2', 
      //   nowstatus: '已锁定', 
      //   electric: '10%', 
      //   protectTime: 32, 
      //   messages: [
      //     { openmessage: '云巢智能锁1号用普通密码开锁', opentimeMsg: '3小时前', messagetype: '' },
      //     { openmessage: '云巢智能锁1号用普通密码', opentimeMsg: '123小时前', messagetype: '' }
      //   ] ,
      //   id: 30
      // },
      // { 
      //   deviceName: '2Alex的锁2', 
      //   nowstatus: '已开启', 
      //   electric: '20%', 
      //   protectTime: 64,
      //   messages: [
      //     { openmessage: '云巢智能锁', opentimeMsg: '3小时前', messagetype: '' },
      //     { openmessage: '云巢智能锁2号用普通密码开锁开锁', opentimeMsg: '3小时前', messagetype: '' }
      //   ] ,
      //   id: 32
      // },
      // { 
      //   deviceName: '3Alex的锁3', 
      //   nowstatus: '休眠中', 
      //   electric: '59%', 
      //   protectTime: 168,
      //   messages: [
      //     { openmessage: '云巢智能锁3号用普通密码开锁', opentimeMsg: '3小时前', messagetype: '' },
      //     { openmessage: '云巢智能锁3号用普通密码开锁', opentimeMsg: '3小时前', messagetype: '' }
      //   ] ,
      //   id: 33
      // },
      // {
      //   deviceName: '4家Alex的锁2',
      //   onOff: '已锁定',
      //   electric: '10%',
      //   protectTime: 32,
      //   messages: [
      //     { openmessage: '云巢智能锁4号用普通密码开锁', opentimeMsg: '4小时前', messagetype: '' },
      //     { openmessage: '云巢智能锁4号用普通密码开锁', opentimeMsg: '4小时前', messagetype: '' }
      //   ],
      //   id: 34
      // },
      // {
      //   deviceName: '5家',
      //   onOff: '已锁定',
      //   electric: '10%',
      //   protectTime: 32,
      //   messages: [
      //     { openmessage: '云巢智能锁5号用普通密码开锁', opentimeMsg: '5小时前', messagetype: '' },
      //     { openmessage: '云巢智能锁5号用普通密码开锁', opentimeMsg: '5小时前', messagetype: '' }
      //   ],
      //   id: 36
      // }
    ],
    nickName: '',
    isOpen: false,
    deviceIndex: 0,
    id: null,    //设备id
    changeNum: 0,
    mess:['智能锁开启1'],
    touchDot: 0, //触摸时的原点
    time: 0,
    interval : ''
    // flagHd: true
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 解决 getUserInfo 与 Page.onLoad 异步请求问题
    if(app.globalData.userInfo){
      // console.log(app.globalData);
      this.setData({ nickName: app.globalData.userInfo.nickName})
    }else{
      app.userInfoReadyCallback = nickName => {
        if(nickName != ''){
          this.setData({ nickName: app.globalData.userInfo.nickName })
        }
      }
    }
    console.log('开始');
    // console.log(app.globalData.userData.token);
    // console.log(app.globalData.userData.user.account);
    // 请求用户设备信息  列表
    wx.request({
      // url: 'http://6844ea95.ngrok.io/v1/devices/',
      url: 'http://dc946cf7.ngrok.io/v1/devices/',
      method: 'GET',
      header: {
        // 'token': app.globalData.userData.token,
        "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
        'apptype': 1001
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        offset: 0,
        limit: 100,
        // account: app.globalData.userData.user.account
        account: "yc66084551"
      },
      success: res => {
        console.log('列表信息请求成功');
        console.log(res);
        // lockInfoList换成从服务器请求回来的数据
         this.setData({ 
           lockInfoList: res.data.data.devices ,
           id: res.data.data.devices[0].id
         })

      }
    });

  },
  // 滑动触摸开始事件
  touchStart: function(e){
    //获取触摸时原点
    var dot = e.touches[0].pageX;
    var timer = setInterval(()=>{
      this.setData({time: this.data.time++})
    },100);
    this.setData({
      touchDot: dot,
      interval: timer
    })
  },
  //  滑动触摸事件结束
  touchEnd: function(e){
    var touchMove = e.changedTouches[0].pageX;
    // console.log(touchMove);
    var len = this.data.lockInfoList.length;
    // 向左滑动   
    if (touchMove - this.data.touchDot <= -40 && this.data.time < 10 ) {
      // this.data.flagHd = false;
      //执行切换页面的方法
      // console.log("向左滑动");
      // console.log(this.data.lockNum);
      var num = this.data.deviceIndex;
      if(num < len){
        num++;
        this.setData({ deviceIndex: num });
        if( num < len-2){
          this.setData({ changeNum: num })
        }
        this.setData({
          id: this.data.lockInfoList[this.data.deviceIndex].id
        })
      }  
    }
    // 向右滑动   
    if (touchMove - this.data.touchDot >= 40 && this.data.time < 10 ) {
      // this.data.flagHd = false;
      //执行切换页面的方法
      // console.log("向右滑动");
      // console.log(this.data.lockNum);
      var num = this.data.deviceIndex;
      if (num > 0) {
        num--;
        this.setData({ deviceIndex: num });
        if (num <= len - 3) {
          this.setData({ changeNum: num });
        } 
        this.setData({
          id: this.data.lockInfoList[this.data.deviceIndex].id
        })
      }
    }
    // clearInterval(interval); // 清除setInterval
    // time = 0;
  },
  /**
   * 添加设备事件
   */
  addLock: function(){
    console.log('添加设备');
    wx.navigateTo({
      url: '../steps/steps'
    })
  },
  /**
   * 跳转至设备管理界面
   */
  toLockSet: function(e){
    console.log('去设备管理界面');
    // console.log(e.currentTarget.dataset);
    console.log(this.data.id);
    wx.navigateTo({
      url: '../lockSet/lockSet?deviceId=' + this.data.id
    })
  },
  /**
   * 跳转至用户管理界面
   */
  toLockUsers: function(e){
    console.log('去用户管理界面');
    // console.log(e.currentTarget);
    // 将锁id传给下一页
    wx.navigateTo({
      url: '../lockUsers/lockUsers?deviceId=' + this.data.id
    })
  },

  /**
  * 点击消息列进入消息详情页
  */
  details: function(){
    wx.navigateTo({
      url: '../msgList/msgList'
    })
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作 --下拉刷新
  */
  onPullDownRefresh: function () {
    // wx.startPullDownRefresh({
    //   success: function(){
    //     
    //   }
    // });
    console.log('test');
    setTimeout(function () { console.log('下拉刷新中...') }, 500);
    wx.stopPullDownRefresh();
    console.log('test1');
  }
})



