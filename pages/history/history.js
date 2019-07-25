// pages/history/history.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: '',
    historys: [],
    lajiIcon: {
      '干垃圾': '/assets/laji/gan.png',
      '湿垃圾': '/assets/laji/shi.png',
      '可回收垃圾': '/assets/laji/kehuishou.png',
      '有害垃圾': '/assets/laji/youhai.png'
    }
  },

  save: function() {
    wx.setStorageSync('history', this.data.historys);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that=this
    var historys = wx.getStorageSync('imageHistory')
    this.setData({
      historys: historys
    })
    console.log(this.data.historys)
    //下载历史信息图片
    for (var i = 0; i < historys.length; i++) {
      wx.request({
        url: app.globalData.getTemp_url,
        data: {
          'temp': i
        },
        success: res => {
          var n = res.data
          if (!historys[n].filePath) {
            console.log('开始下载图片', n)
            wx.downloadFile({
              url: app.globalData.download_url + '?imagePath=' + historys[n].imagePath,
              success: res => {
                if (res.statusCode === 200) {
                  console.log('图片下载成功' + res.tempFilePath)
                  //使用小程序的文件系统，通过小程序的api获取到全局唯一的文件管理器
                  const fs = wx.getFileSystemManager()
                  fs.saveFile({
                    tempFilePath: res.tempFilePath, // 传入一个临时文件路径
                    success(res) {
                      console.log('图片缓存成功', res.savedFilePath) // res.savedFilePath 为一个本地缓存文件路径 
                      historys[n]['filePath'] = res.savedFilePath
                      console.log(historys[n])
                      wx.setStorageSync('imageHistory', historys)
                      that.setData({
                        historys: historys
                      })
                    }
                  })
                }
              },
              fail: res => {
                console.log('下载图片失败')
              }
            })
          }
         
        }
      })

    }
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

  }
})