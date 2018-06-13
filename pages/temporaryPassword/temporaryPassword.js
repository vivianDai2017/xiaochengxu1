// pages/temporaryPassword/temporaryPassword.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devicceId: null,      //设备id
    // time: '',
    shortPassword: '',
    onlyOne: true,
    show: false,
    date: '2016-09-01',
    time: '12',
    timeArray: [
      ['2018','2019','2020','2021','2022'],
      ['年'],
      [1,2,3,4,5,6,7,8,9,10,11,12],
      ['月'],
      [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
      ['日'],
      [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      ['时']
    ],
    startTimeIndex: [0, 0, 0, 0, 0, 0, 0, 0],
    endTimeIndex: [0, 0, 0, 0, 0, 0, 0, 0],
    startTime: null,
    endTime: null,
    again: false,
    nickName: null    //微信昵称
  },

  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.createShortPassword();
    // 获取到锁id
    this.setData({ 
      deviceId: options.deviceId,
      nickName: app.globalData.userInfo.nickName
    });
    var nickName = app.globalData.userInfo.nickName;
    console.log(nickName);
    
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
  createShortPassword: function () {
    var pass = parseInt(Math.random() * 899999 + 100000);
    this.setData({ shortPassword: pass })
  },
  /**
   * 密码有效性 switch按钮
   */
  isOnlyOne: function () {
    this.setData({ onlyOne: !this.data.onlyOne });
    // 默认时间为当前系统时间，精确到小时,先获取当前时间
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var date = today.getDate();
    var hour = today.getHours();
    console.log(year + '年' + month + '月' + date + '日' + hour + '时');
    var yearIndex = year-2018;
    var dateIndex = date-1;
    var timeIndex = [yearIndex,0,month,0,dateIndex,0,hour,0];
    var startTime = this.data.timeArray[0][yearIndex] + '/' + this.data.timeArray[2][month] + '/' + this.data.timeArray[4][dateIndex] + ' ' + this.data.timeArray[6][hour] + ':00:00';
    console.log(timeIndex);
    this.setData({
      startTimeIndex: timeIndex,
      endTimeIndex: timeIndex,
      startTime: startTime
    })
  },
  // share: function (event) {
  //   console.log(event);
  //   console.log(event.currentTarget.dataset.pass);
  // },
  /**
   * 时间选择
   */
  // choiceTime: function () {
  //   this.setData({show: true})
  // },
  /**
   * 监听时间选择value改变事件
   */
  bindStartTimeChange: function(e){
    console.log('value事件改变');
    this.setData({ startTimeIndex: e.detail.value});
    console.log(this.data.startTimeIndex);
    var startTime = this.data.timeArray[0][this.data.startTimeIndex[0]] + '/' + this.data.timeArray[2][this.data.startTimeIndex[2]] + '/' + this.data.timeArray[4][this.data.startTimeIndex[4]] + ' ' + this.data.timeArray[6][this.data.startTimeIndex[6]] + '：00:00';
    console.log(startTime);
    console.log(typeof startTime);
    this.setData({ startTime: startTime })
  },
  bindEndTimeChange: function (e) {
    console.log('value事件改变');
    this.setData({ endTimeIndex: e.detail.value });
    console.log(this.data.endTimeIndex);
    var endTime = this.data.timeArray[0][this.data.endTimeIndex[0]] + '/' + this.data.timeArray[2][this.data.endTimeIndex[2]] + '/' + this.data.timeArray[4][this.data.endTimeIndex[4]] + ' ' + this.data.timeArray[6][this.data.endTimeIndex[6]] + ':00:00';
    console.log(endTime);
    console.log(typeof endTime);
    this.setData({ endTime: endTime })
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
      console.log('页面内');
    } else {
      console.log('no button');
    }
    // 点击启动并分享密码即启用临时密码
    wx.request({
      url: 'https://c98008c9.ngrok.io/v1/devices/' + this.data.deviceId,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'token': app.globalData.userData.token,
        "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
        "apptype": 1001
      },
      data: { 
        shortPassword: this.data.shortPassword,
        startTime: this.data.startTime,
        endTime: this.data.endTime
      },
      success: res => {
        console.log(res)
        console.log('开发者服务器返回数据');
        
      },
      fail: function () {
        console.log('接口调用失败');
      },
    });
    // 判断密码是单次有效还是时间段有效
    if (this.data.onlyOne) {
      // 单次有效
      var pathUrl = '/pages/share/share?temp=' + this.data.shortPassword + '&&nickName=' + this.data.nickName
    } else {
      // var startTime = this.data.timeArray[0][this.data.startTimeIndex[0]] + '/' + this.data.timeArray[2][this.data.startTimeIndex[2]]+  '/' + this.data.timeArray[4][this.data.startTimeIndex[4]] + ' ' + this.data.timeArray[6][this.data.startTimeIndex[6]] + '/00/00';
      console.log('112');
      // console.log(this.data.timeArray[0][this.data.startTimeIndex[0]]);
      // console.log(startTime);
      var pathUrl = '/pages/share/share?temp=' + this.data.shortPassword + '&&startTime=' + this.data.startTime + '&&endTim=' + this.data.endTime + '&&nickName=' + this.data.nickName
    }
    // 通过object.getTime()获取时间差值
    return {
      title: '临时密码分享',
      path: pathUrl,
      imageUrl: '../../images/logo-temp.png',
      success: (res) => {
        console.log("转发成功", res);
        this.setData({again: true});
        // 开发测试用
        // wx.navigateTo({
        //   url: '../share/share?temp=' + this.data.tempPassword,
        // })
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
    
  },
  /**
   * 
   * 停用
   */
  stop: function(){
    // 通知后台此设备的临时密码停用
    wx.request({
      url: 'https://c98008c9.ngrok.io/v1/devices/' + this.data.deviceId,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'token': app.globalData.userData.token,
        "token": 'oC2hc5TUP6U_2stTgxMqZGLQUdqEtoken',
        "apptype": 1001
      },
      data: { shortPasswrod: "" },
      success: res => {
        console.log(res)
        console.log('开发者服务器返回数据');
        this.setData({ again: false });
      },
      fail: function () {
        console.log('接口调用失败');
      }
    })
  }
})