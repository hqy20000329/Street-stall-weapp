// miniprogram/pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "login",
      success(res) {
        // console.log(res);
        let userData = res.result.data;
        if (userData.length === 1) {
          if (userData[0].actorId == 1) {
            console.log("进入游客界面");
            wx.reLaunch({
              url: "../visitor/visitor",
            });
          } else if (userData[0].actorId == 2) {
            console.log("进入商家界面");
            wx.reLaunch({
              url: "../merchant/merchant",
            });
          }
        }else{
          wx.reLaunch({
            url: "../guide/guide",
          });
        }
      },
      fail(err) {
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
