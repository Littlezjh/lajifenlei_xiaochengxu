// pages/personInfo/personInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: "",
    address: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    wx.request({
      url: app.globalData.get_phone_address_url,
      data: {
        openid: app.globalData.openid,
      },
      success: res => {
        console.log(typeof(res.data))
        var obj = res.data
        if (obj.phoneNumber == null) {
          that.setData({
            phoneNumber: "请输入您的电话号码"
          })
        } else {
          that.setData({
            phoneNumber: obj.phoneNumber
          })
        }
        if (obj.address == null) {
          that.setData({
            address: "请输入您的联系地址"
          })
        } else {
          that.setData({
            address: obj.address
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  changePhone: function(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  changeAddress: function(e) {
    this.setData({
      address: e.detail.value
    })
  },
  submitInfo: function() {
    wx.request({
      url: app.globalData.submitInfo_url,
      data: {
        openid: app.globalData.openid,
        phoneNumber: phoneNumber,
        address: address,
      },
      success: res => {
        console.log('修改个人信息成功')
      }
    })
  }
})