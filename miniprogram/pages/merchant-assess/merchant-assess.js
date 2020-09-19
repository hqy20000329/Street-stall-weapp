// miniprogram/pages/merchant-assess/merchant-assess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stallId:'',// 摊位id
    assessList:[], // 摊位评论id列表
  },

  // 获取摊位数据
  getStallData(){
    const self = this;
    wx.cloud.callFunction({
      name:'editOneStall',
      data:{
        stallId:self.data.stallId,
        operate:'get',
      },
      success(res){
        console.log(res);
        const assessList = [...res.result.data.assessList];
        self.setData({
          assessList,
        })
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
    this.setData({
      stallId:options.id,
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
    this.getStallData();
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