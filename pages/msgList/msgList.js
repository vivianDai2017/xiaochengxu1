// pages/msgList/msgList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 全部已读 allReady
    allReady: 0,
    msgList: [
      { 
        lockIcon: '.icon-youjian', 
        general: '电量过低', 
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isread: 0,
        // 0表示警告（示警），亮红色,其他数字正常
        warn: 0
      },
      {
        lockIcon: 'icon-shezhi',
        general: '异常开锁报警',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isready: 1,
        warn: 1
      },
      {
        lockIcon: 'icon-shezhi',
        general: '密码开锁',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isready: 0,
        warn: 1
      },
      {
        lockIcon: 'icon-shezhi',
        general: '未锁定时间过长',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isready: 1,
        warn: 1
      },
      {
        lockIcon: 'icon-shezhi',
        general: '密码开锁',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isready: 1,
        warn: 1
      },
      {
        lockIcon: '.icon-youjian',
        general: '电量过低',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isread: 0,
        // 0表示警告（示警），亮红色,其他数字正常
        warn: 0
      },
      {
        lockIcon: 'icon-shezhi',
        general: '异常开锁报警',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isready: 1,
        warn: 1
      },
      {
        lockIcon: 'icon-shezhi',
        general: '密码开锁',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isready: 0,
        warn: 1
      },
      {
        lockIcon: 'icon-shezhi',
        general: '未锁定时间过长',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isready: 1,
        warn: 1
      },
      {
        lockIcon: 'icon-shezhi',
        general: '密码开锁',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isready: 1,
        warn: 1
      },
      {
        lockIcon: '.icon-youjian',
        general: '电量过低',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isread: 0,
        // 0表示警告（示警），亮红色,其他数字正常
        warn: 0
      },
      {
        lockIcon: 'icon-shezhi',
        general: '异常开锁报警',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isready: 1,
        warn: 1
      },
      {
        lockIcon: 'icon-shezhi',
        general: '密码开锁',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isready: 0,
        warn: 1
      },
      {
        lockIcon: 'icon-shezhi',
        general: '未锁定时间过长',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isready: 1,
        warn: 1
      },
      {
        lockIcon: 'icon-shezhi',
        general: '密码开锁',
        details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。',
        time: '08:22',
        isready: 1,
        warn: 1
      }
    ],
    totalMsg: 0,     //消息总数
    page: 1,        //显示第几页
    pages: null,     //总页数
    pullDown: true,
    indexNum: -1,
    show: 0,
    account: null,
    // offset: 0,      //请求消息起始页
    limit: 50,      //每页请求消息数
    pullDown: false,
  },
  /**
   * 获取消息详情
   */
  pullDown: function(event){
    console.log(event);
    this.setData({
      pullDown: !this.data.pullDown,
      indexNum: event.currentTarget.id,
      show: !this.data.show
    });
    console.log(this.data.indexNum);
    console.log(this.data.show);
  },
  /**
   * 全部已读设置
   */
  allReady: function(){
    console.log('全部已读');
    // 1.allReady: true
    // 2.红色显示的变为正常?
    this.setData({ 
      allReady: 1
    }); 
  }, 
  /**
   * 请求消息函数
   */
  getMsgs: function (page) {
    wx.request({
      // url: 'http://6844ea95.ngrok.io/v1/messages/',
      url: 'http://192.168.1.178/v1/messages/',
      method: 'GET',
      header: {
        "token": app.globalData.userData.token,
        "apptype": 1001
      },
      data: {
        offset: (page-1)*limit+1,
        limit: this.data.limit,
        account: account
      },
      success: res => {
        console.log('请求成功');
        console.log(res);
        return res;
      },
      fail: res => {
        console.log('请求失败');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(parseFloat('17%'));
    // console.log(this.data.indexNum);
    //用户id
    console.log(app.globalData.userData.user.account);
    var account = app.globalData.userData.user.account;
    // 发送请求消息列表请求
    wx.request({
      // url: 'http://6844ea95.ngrok.io/v1/messages/',
      url: 'http://192.168.1.178/v1/messages/',
      method: 'GET',
      header: {
        "token": app.globalData.userData.token,
        "apptype": 1001
      },
      data: {
        offset: (page - 1) * limit + 1,
        limit: this.data.limit,
        account: account
      },
      success: res => {
        console.log('请求成功');
        console.log(res);
        var pages = Math.ceil(msgs.total / this.data.limit);
        this.setData({
          totalMsg: res.data.data.total,
          msgList: res.data.data.messsages,
          pages: pages
        })
      },
      fail: res => {
        console.log('请求失败');
      }
    })
    
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
      // wx.startPullDownRefresh();
      console.log('下拉刷新');
      // wx.showNavigationBarLoading()
      wx.stopPullDownRefresh();
      this.setData({ page: 1});
      var msgs = getMsgs(this.data.page, this.data.limit);
      this.setData({ msgList: msgs.messsages });
      // wx.request({
      //   url: '',
      //   data: {},
      //   method: 'GET',
      //   success: function (res) { },
      //   fail: function (res) { },
      //   complete: function (res) {
      //     wx.stopPullDownRefresh();
      //   }
      // })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.totalMsg <= this.data.limit){
      return;
    }else if(this.data.page < this.data.pages){
      // 显示加载图标
      wx.showLoading({ title: "玩命加载中"});
      this.setData({
        page: this.data.page + 1
      });
      wx.request({
        // url: 'http://6844ea95.ngrok.io/v1/messages/',
        url: 'http://192.168.1.178/v1/messages/',
        method: 'GET',
        header: {
          "token": app.globalData.userData.token,
          "apptype": 1001
        },
        data: {
          offset: (page - 1) * limit + 1,
          limit: this.data.limit,
          account: account
        },
        success: res => {
          console.log('请求成功');
          console.log(res);
          var temp = this.data.msgList;
          for (var i = 0; i < res.data.data.messages.length; i++) {
            temp.push(res.data.data.messages[0])
          }
          this.setData({ msgList: temp });
        },
        fail: res => {
          console.log('请求失败');
        }
      })     
      
      wx.hideLoading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})