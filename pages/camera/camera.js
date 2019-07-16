// pages/camera/camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    positionBack: true,
    iconPath: '/assets/icons/takePhoto.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.camera = wx.createCameraContext()
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

  error(e) {
    console.log(e.detail)
  },

  changePosition() {
    this.setData({
      positionBack: !this.data.positionBack
    })
  },

  choosePhoto: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        var filePath = res.tempFilePaths[0];
        wx.setStorageSync('imagePath', filePath)
      },
      fail: function(error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
    })
  },
  touchStart: function() {
    this.setData({
      iconPath: "/assets/icons/takePhotoTouched.png"
    })
  },
  touchEnd: function() {
    var that = this;
    this.setData({
      iconPath: "/assets/icons/takePhoto.png"
    })
    this.camera.takePhoto({
      quality: 'high',
      success: (res) => {
        that.setData({
            src: res.tempImagePath
          }),
          wx.setStorageSync('imagePath', res.tempImagePath)
      }
    })

  }
})