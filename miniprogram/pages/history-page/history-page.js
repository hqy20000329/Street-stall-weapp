// miniprogram/pages/history-page/history-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stallListData:[],
  },
  /**
   * 获取个人历史列表
   */
  getHistoryIds(){
    const self = this;
    wx.cloud.callFunction({
      name:'login',
      success(res){
        const resData = res.result.data[0]; // 用户数据
        let tempList = resData.watchHistory.reverse();
        const stallListData = [];
        const map = new Map();
        tempList.forEach(item => {
          if(!map.get(item.stallId)){
            stallListData.push(item);
            map.set(item.stallId,true);
          }
        })
        
        self.setData({
          stallListData
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
    this.getHistoryIds();
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