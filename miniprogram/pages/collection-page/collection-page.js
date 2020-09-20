// miniprogram/pages/collection-page/collection-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stallListData:[],
  },

  // 获取收藏记录
  getCollectionIds(){
    const self = this;
    wx.cloud.callFunction({
      name:'login',
      success(res){
        let resData = res.result.data[0]; // 用户数据
        let tempList = resData.collectionList.reverse();
        const stallListData = [];
        tempList.forEach(item => {
          stallListData.push({stallId:item});
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
    this.getCollectionIds()
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