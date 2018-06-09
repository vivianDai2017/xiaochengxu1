//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    lockInfoList: [
      { 
        deviceName: '1家Alex的锁2', 
        onOff: '已锁定', 
        electric: '10%', 
        protectTime: 32, 
        messages: [
          { openmessage: '云巢智能锁1号用普通密码开锁', opentime: '3小时前', messagetype: '' },
          { openmessage: '云巢智能锁1号用普通密码开锁', opentime: '3小时前', messagetype: '' }
        ] 
      },
      { 
        deviceName: '2Alex的锁2', 
        onOff: '已开启', 
        electric: '20%', 
        protectTime: 64,
        messages: [
          { openmessage: '云巢智能锁2号用普通密码开锁', opentime: '3小时前', messagetype: '' },
          { openmessage: '云巢智能锁2号用普通密码开锁', opentime: '3小时前', messagetype: '' }
        ] 
      },
      { 
        deviceName: '3Alex的锁3', 
        onOff: '休眠中', 
        electric: '59%', 
        protectTime: 168,
        messages: [
          { openmessage: '云巢智能锁3号用普通密码开锁', opentime: '3小时前', messagetype: '' },
          { openmessage: '云巢智能锁3号用普通密码开锁', opentime: '3小时前', messagetype: '' }
        ] 
      },
      {
        deviceName: '4家Alex的锁2',
        onOff: '已锁定',
        electric: '10%',
        protectTime: 32,
        messages: [
          { openmessage: '云巢智能锁4号用普通密码开锁', opentime: '4小时前', messagetype: '' },
          { openmessage: '云巢智能锁4号用普通密码开锁', opentime: '4小时前', messagetype: '' }
        ]
      },
      {
        deviceName: '5家',
        onOff: '已锁定',
        electric: '10%',
        protectTime: 32,
        messages: [
          { openmessage: '云巢智能锁5号用普通密码开锁', opentime: '5小时前', messagetype: '' },
          { openmessage: '云巢智能锁5号用普通密码开锁', opentime: '5小时前', messagetype: '' }
        ]
      }
    ],
    nickName: '',
    isOpen: false,
    deviceIndex: 0,
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
      console.log(app.globalData);
      this.setData({ nickName: app.globalData.userInfo.nickName})
    }else{
      app.userInfoReadyCallback = nickName => {
        if(nickName != ''){
          this.setData({ nickName: app.globalData.userInfo.nickName })
        }
      }
    }
    
    // 请求用户设备信息  列表
    // wx.request({
    //   url: 'https://yapi.nesticloud.com:3888/mock/29/v1/devices',
    //   header: {
    //     'token': '',
    //     'apptype': 1001
    //   },
    //   data: {
    //     offset: 0,
    //     limit: 100,
    //     userid: app.globalData.userid
    //   },
    //   success: res => {
    //     console.log(res.data.data.devices);
    //     // lockInfoList换成从服务器请求回来的数据
    //     this.setData({ lockInfoList: res.data.data.devices })
    //   }
    // });

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
        if( num < len-2){
          this.setData({
            deviceIndex: num,
            changeNum: num
          })
        }else{
          this.setData({ deviceIndex: num });
        }
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
        if (num > len - 3) {
          this.setData({
            deviceIndex: num  
          })
        } else {
          this.setData({ 
            deviceIndex: num,
            changeNum: num            
          });
        }
      }
    }
    // clearInterval(interval); // 清除setInterval
    // time = 0;
  },
  /**
   * 跳转至设备管理界面
   */
  toLockSet: function(e){
    // console.log('去设备管理界面');
    // console.log(e.currentTarget.dataset.lockName);
    wx.navigateTo({
      url: '../lockSet/lockSet?deviceId=' + e.currentTarget.dataset.deviceId
    })
  },
  /**
   * 跳转至用户管理界面
   */
  toLockUsers: function(e){
    console.log('去用户管理界面');
    console.log(e.currentTarget.dataset);
    // 将锁id传给下一页
    wx.navigateTo({
      url: '../lockUsers/lockUsers?deviceId=' + e.currentTarget.dataset.deviceId
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



