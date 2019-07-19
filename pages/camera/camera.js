// pages/camera/camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    positionBack: true,
    iconPath: '/assets/icons/takePhoto.png',
    imageHistory:[],
    url:'http://127.0.0.1:8000/upload',
    photoTime:'',
    
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
  //按下拍照键时图标变色
  touchStart: function() {
    this.setData({
      iconPath: "/assets/icons/takePhotoTouched.png"
    })
  },
  //松开拍照键时图标恢复，同时拍摄照片并上传
  touchEnd: function() {
    var that = this;
    this.setData({
      iconPath: "/assets/icons/takePhoto.png"
    })
    //拍照并将照片位置存到缓存中
    this.camera.takePhoto({
      quality: 'normal',
      success: (res) => {
        imageHistory = wx.getStorageSync('imageHistory')
        that.setData({
            src: res.tempImagePath,
          }),
        imageHistory.push(src)
        wx.setStorageSync('imageHistory', imageHistory)
      }
    })
    //获取拍照时间
    var d = new Date()
    this.setData({
      photoTime: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    })
    //上传图片和拍照时间
    wx.uploadFile({
      url: this.data.url,
      filePath: this.data.src,
      name: 'imageFile',
      formData: {
        'photoTime': this.data.photoTime
      },
      success(res) {
        console.log(res.data)
      }
    })
  },
  
})