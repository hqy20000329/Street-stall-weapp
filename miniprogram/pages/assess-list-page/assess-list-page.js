// miniprogram/pages/assess-list-page/assess-list-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assessList:[],
  },

  // 获取用户评论id列表
  getVisitorAssess(){
    const self = this;
    wx.cloud.callFunction({
      name:'login',
      success(res){

        const assessList = res.result.data[0].assessList;
        self.setData({
          assessList,
        })
        console.log("获取用户信息",assessList);
      },
      fail(err){
        console.log(err);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getVisitorAssess();
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