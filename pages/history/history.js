// pages/history/history.js
Page({

// history:{
//   iamgePath:'',
//   name:'',
//   type:'',
//   time:'',
// }



  /**
   * 页面的初始数据
   */
  data: {
    history:'',
    historys:[],
    lajiIcon:{
      '干垃圾':'/assets/laji/gan.png',
      '湿垃圾':'/assets/laji/shi.png',
      '可回收垃圾':'/assets/laji/kehuishou.png',
      '有害垃圾':'/assets/laji/youhai.png'
    }
  },

  save:function(){
    wx.setStorageSync('history', this.data.historys);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var historys=wx.getStorageSync('historys');
    console.info(historys);
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