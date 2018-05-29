//index.js
//获取应用实例
// const app = getApp()

Page({
  data: {
    lockList: ['Alex的锁1', 'Alex的锁2', 'Alex的锁3'],
    lockInfoList: [
      { name: 'Alex的锁1', status: '锁1已锁定' },
      { name: 'Alex的锁2', status: '已开启' },
    ],
    isOpen: false,
    lockNum: [0, 1],
    mess: ['智能锁开启1'],
    touchDot: 0,

  },

  //事件处理函数
  onLoad: function () {

  },
  // 滑动触摸开始事件
  touchStart: function (e) {

  }
})
