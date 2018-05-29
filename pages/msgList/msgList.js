// pages/msgList/msgList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [
      { lockIcon: '设备icon', general: '电量过低', details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。'},
      { lockIcon: '设备icon', general: '电量过低', details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。' },
      { lockIcon: '设备icon', general: '电量过低', details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。' },
      { lockIcon: '设备icon', general: '电量过低', details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。' },
      { lockIcon: '设备icon', general: '电量过低', details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。' },
      { lockIcon: '设备icon', general: '电量过低', details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。' },
      { lockIcon: '设备icon', general: '电量过低', details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。' },
      { lockIcon: '设备icon', general: '电量过低', details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。' },
      { lockIcon: '设备icon', general: '电量过低', details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。' },
      { lockIcon: '设备icon', general: '电量过低', details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。' },
      { lockIcon: '设备icon', general: '电量过低', details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。' },
      { lockIcon: '设备icon', general: '电量过低', details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。' },
      { lockIcon: '设备icon', general: '电量过低', details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。' },
      { lockIcon: '设备icon', general: '电量过低', details: 'xxx花园30栋203智能锁电量不足20%，请注意更换电池。。。。。。' },

    ],
    pullDown: true,
    indexNum: -1
  },

  pullDown: function(event){
    console.log(event);
    this.setData({
      indexNum: event.currentTarget.id
    });
    console.log(this.data.indexNum);
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.indexNum);
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