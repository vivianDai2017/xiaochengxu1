// pages/temporaryPassword/temporaryPassword.js
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    temPassword: '',
    onlyOne: false,
    show: false,
    date: '2016-09-01',
    time: '12',
    multiArray: [['2017','2018','2019'],[1,2,3,4,5,6,7,8,9,10,11,12],[1,2,3,4,5,6,7,8,9,10],[0,1,2,3,4,5]],
    multiIndex: [0, 0, 0, 1],
  },

  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var now = new Date().toLocaleDateString();
    // this.setData({time: now});
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
   * 生成临时秘密
   */
  createTemPassword: function () {
    var pass = parseInt(Math.random() * 899999 + 100000);
    this.setData({ temPassword: pass })
  },
  /**
   * 密码有效性
   */
  isOnlyOne: function () {
    this.setData({ onlyOne: !this.data.onlyOne })
  },
  share: function (event) {
    console.log(event);
    console.log(event.currentTarget.dataset.pass);
  },
  /**
   * 时间选择
   */
  choiceTime: function () {
    this.setData({show: true})
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
   * 用户点击(右上角)分享
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
      imageUrl: '../../images/logo-temp.png',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})