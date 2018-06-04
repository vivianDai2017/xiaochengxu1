//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    lockList: ['Alex的锁1','Alex的锁2','Alex的锁3'], //删除
    lockInfoList: [
      { 
        name: 'Alex的锁1', 
        onOff: '已锁定', 
        energy: '10%', 
        date: 32, 
        messList: [
          { mess: '云巢智能锁1号用普通密码开锁', time: '3小时前' },
          { mess: '云巢智能锁1号用普通密码开锁', time: '3小时前' }
        ] 
      },
      { 
        name: 'Alex的锁2', 
        onOff: '已开启', 
        energy: '20%', 
        date: 64,
        messList: [
          { mess: '云巢智能锁2号用普通密码开锁', time: '3小时前' },
          { mess: '云巢智能锁2号用普通密码开锁', time: '3小时前' }
        ] 
      },
      { 
        name: 'Alex的锁3', 
        onOff: '休眠中', 
        energy: '59%', 
        date: 168,
        messList: [
          { mess: '云巢智能锁3号用普通密码开锁', time: '3小时前' },
          { mess: '云巢智能锁3号用普通密码开锁', time: '3小时前' }
        ] 
      }
    ],
    isOpen: false,
    lockNum: 1,
    mess:['智能锁开启1'],
    touchDot: 0, //触摸时的原点
    time: 0,
    interval : ''
    // flagHd: true
    
  },

  //事件处理函数
  onLoad: function () {
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userInfo']) {
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         success() {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           // wx.startRecord();
    //           console.log('同意授权');
    //         }
    //       })
    //     }
    //   }
    // })
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
    // console.log('滑动结束');
    // console.log(touchMove);
    // console.log(this.data.touchDot);
    // console.log(this.data.time);
    // console.log(this.data.flagHd)
    // 向左滑动   
    if (touchMove - this.data.touchDot <= -40 && this.data.time < 10 ) {
      // this.data.flagHd = false;
      //执行切换页面的方法
      // console.log("向左滑动");
      // console.log(this.data.lockNum);
      var num = this.data.lockNum;
      if(num < 2){
        num++;
        this.setData({ lockNum: num });
      }
      
    }
    // 向右滑动   
    if (touchMove - this.data.touchDot >= 40 && this.data.time < 10 ) {
      // this.data.flagHd = false;
      //执行切换页面的方法
      // console.log("向右滑动");
      // console.log(this.data.lockNum);
      var num = this.data.lockNum;
      if (num > 0) {
        num--;
        this.setData({ lockNum: num });
      }
    }
    // clearInterval(interval); // 清除setInterval
    // time = 0;
  },
  // 跳转时设备管理界面
  toLockSet: function(e){
    console.log('去设备管理界面');
    console.log(e.currentTarget.dataset.lockName);
    wx.navigateTo({
      url: '../lockSet/lockSet?lockNum=' + e.currentTarget.dataset.lockName
    })
  }
})
