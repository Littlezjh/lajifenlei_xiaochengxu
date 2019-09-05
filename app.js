var app = getApp()
App({
  globalData: {
    userInfo: '',
    openid: '',
    login_url: 'https://www.littlezhu.top/login',
    posImage_url: 'https://www.littlezhu.top/upload',
    getHistory_url: 'https://www.littlezhu.top/load_history',
    getTemp_url: 'https://www.littlezhu.top/temp',
    download_url: 'https://www.littlezhu.top/download',
    changeCredits_url: '',
    getCredits_url:'https://www.littlezhu.top/credits',
    get_phone_address_url:'https://www.littlezhu.top/get_phone_address',
    submitInfo_url:'https://www.littlezhu.top/changeInfo',
  },
  onLaunch: function() {
    //   // 展示本地存储能力
    //   var logs = wx.getStorageSync('logs') || []
    //   logs.unshift(Date.now())
    //   wx.setStorageSync('logs', logs)

    //   // 登录
    //   wx.login({
    //     success: res => {
    //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     }
    //   })
    //   // 获取用户信息
    //   wx.getSetting({
    //     success: res => {
    //       if (res.authSetting['scope.userInfo']) {
    //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //         wx.getUserInfo({
    //           success: res => {
    //             // 可以将 res 发送给后台解码出 unionId
    //             this.globalData.userInfo = res.userInfo

    //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //             // 所以此处加入 callback 以防止这种情况
    //             if (this.userInfoReadyCallback) {
    //               this.userInfoReadyCallback(res)
    //             }
    //           }
    //         })
    //       }
    //     }
    //   })
    // },
    // var name = wx.getStorageSync('name');
    // var avatar = wx.getStorageSync('avatar');

    // if (!name || !avatar) {
    //   wx.getUserInfo({
    //     success: function(res) {
    //       var userInfo = res.userInfo;
    //       wx.setStorageSync('name', userInfo.nickName);
    //       wx.setStorageSync('avatar', userInfo.avatarUrl);
    //     }
    //   });
    // }
    var that = this;
    //登录
    // wx.checkSession({
    //   success() {
    //     console.log('会话还存在')
    //   },
    //   fail() {
    wx.login({
      success: res => {
        wx.request({
          url: that.globalData.login_url,
          data: {
            code: res.code,
            name: '腾讯不让我拿用户名',
          },
          success: res => {
            if (res.data != 'none') {
              console.log(res.data)
              that.globalData.openid = res.data
              console.log('登录成功')
            } else {
              wx.showToast({
                title: '登录失败',
                icon: 'none',
                duration: 1500,
              })
            }
          },
          fail: function() {
            wx.showToast({
              title: '网络错误',
              icon: 'none',
              duration: 1500,
            })
          }
        })
      },
      fail: function() {
        wx.showToast({
          title: '网络错误',
          icon: 'none',
          duration: 1500,
        })
      }
    })
    //   },
    // })



  },


  startOperating: function(info) {
    wx.showLoading({
      title: info,
      mask: true
    })
  },

  stopOperating: function() {
    wx.hideLoading();
  }
})