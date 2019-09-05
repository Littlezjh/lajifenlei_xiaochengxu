// pages/camera/camera.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    positionBack: true,
    iconPath: '/assets/icons/takePhoto.png',
    imageHistory: [],
    // url: 'http://127.0.0.1:8000/upload',
    // historyurl: 'http://127.0.0.1:8000/load_history',
    photoTime: '',
    kind: '',
    type: '',
    result: 'block'//none
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
      quality: 'low',
      success: res => {
        console.log('拍摄成功')
        //获取拍照时间
        var d = new Date()
        this.setData({
          photoTime: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
          src: res.tempImagePath
        })
        //提示正在识别
        wx.showLoading({
          title: '正在识别ing',
          mask: true,
        })
        //上传图片和拍照时间
        wx.uploadFile({
          url: app.globalData.posImage_url,
          filePath: this.data.src,
          name: 'imageFile',
          formData: {
            'photoTime': this.data.photoTime,
            'openid': app.globalData.openid,
          },
          success: res => {
            //关闭提示
            wx.hideLoading()
            console.log('图片上传成功')
            console.log(res.data)
            var obj = JSON.parse(res.data)
            // 上传图片成功回调函数
            that.setData({
              kind: obj.kind,
              type: obj.type,
              result: 'block'
            })
            //成功上传图片后，更新历史信息
            var imageHistoyr = wx.getStorageSync("imageHistory")
            if (!imageHistoyr) {
              imageHistoyr = []
            }
            var length = imageHistoyr.length
            //读取历史记录
            imageHistoyr = this.readHistoyr(imageHistoyr, length)
          }
        })
      }
    })


  },

  //读取历史信息，如果不满10个则新加一个，如果大于10个去除最后的，在最前加入1个
  readHistoyr(imageHistoyr, length) {
    if (length == 0) {
      var needNum = 10
    } else {
      var needNum = 1
    }

    wx.request({
      url: app.globalData.getHistory_url,
      data: {
        openid: app.globalData.openid,
        num: needNum,
      },
      success: res => {
        for (var i = res.data.length - 1; i >= 0; i--) {
          imageHistoyr.unshift(res.data[i])
        }
        if (imageHistoyr.length > 10) {
          var deleted = imageHistoyr.pop()
          this.deleteTemp(deleted.filePath)
        }
        wx.setStorageSync("imageHistory", imageHistoyr)
      },

    })
    return imageHistoyr
  },

  //用于删除缓存中的文件
  deleteTemp(tempPath) {
    wx.getSavedFileList({ // 获取文件列表
      success(res) {
        console.log(res.fileList)
        res.fileList.forEach((val, key) => { // 遍历文件列表里的数据        

          // 删除存储的垃圾数据
          if (val.filePath == tempPath) {
            wx.removeSavedFile({
              filePath: val.filePath
            });
            console.log("删除文件")
          }
        })
      }
    })
  },

  ok() {
    this.setData({
      result: 'none'
    })
  },
  
  rectifyWrong:function(){

  }

})