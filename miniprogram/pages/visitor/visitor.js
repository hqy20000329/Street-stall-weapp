// miniprogram/pages/vistor/vistor.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前选中页面
    active: 0,
    
    // 图标src
    icon:{
      home:{
        normal:"../../images/icon/visitor-home.png",
        active:"../../images/icon/visitor-home-active.png"  
      },
      activity:{
        normal:"../../images/icon/visitor-active.png",
        active:"../../images/icon/visitor-active-active.png"
      },
      user:{
        normal:"../../images/icon/visitor-user.png",
        active:"../../images/icon/visitor-user-active.png"
      }
    }
  },
  
  /**
   * 切换页面事件
   */
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
