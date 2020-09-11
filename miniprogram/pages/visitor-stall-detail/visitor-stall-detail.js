// miniprogram/pages/visitor-stall-detail/visitor-stall-detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 用户点击的摊位id
    stall_id: "",

    // 用户选择的摊位名称
    title: "",

    // stallData 摊位信息
    stallData: {
      imgList: [
        "https://img.yzcdn.cn/vant/cat.jpeg",
        "https://img.yzcdn.cn/vant/cat.jpeg",
        "https://img.yzcdn.cn/vant/cat.jpeg",
        "https://img.yzcdn.cn/vant/cat.jpeg",
      ],
    },
    // 折叠面板
    activeName: '0',
  },

  // 折叠面板改变
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户选择的摊位id
    this.setData({
      stall_id: options.stall_id,
      title: options.title,
    });

    // 设置摊位的navTitle为摊位title
    wx.setNavigationBarTitle({
      title: this.data.title,
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
