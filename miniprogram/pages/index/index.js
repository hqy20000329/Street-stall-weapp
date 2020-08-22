// miniprogram/pages/index/index.js
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    actor: 0, // 未选择0
    visitorId: 1, // 游客1
    merchantId: 2, // 商家2
  },

  /**
   * 点击选择角色时触发
   */
  chooseActor(e) {
    // data-* *不区分大小写
    const chooseId = e.currentTarget.dataset.actorid;
    this.setData({
      actor: chooseId,
    });
  },
  /**
   * 跳转到不同页面
   */
  reLaunchPage(actorId) {
    if (actorId === this.data.visitorId) {
      console.log("进入游客界面");
      wx.reLaunch({
        url: "../vistor/vistor",
        fail: () => {
          this.entryFail();
        },
      });
    } else if (actorId === this.data.merchantId) {
      console.log("进入商家界面");
      wx.reLaunch({
        url: "../merchant/merchant",
        fail: () => {
          this.entryFail();
        },
      });
    }
  },
  /**
   * 点击进入时触发
   */
  entryApp() {
    if (this.data.actor === 0) {
      //未选择身份
      Toast.fail("请选择身份");
    } else{
      this.reLaunchPage(this.data.actor);
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
    }
  },

  /**
   * 进入失败时触发
   */
  entryFail() {
    Toast.fail("网络异常");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  //获取用户数据actorId直接重定向 否则选择角色存入云数据库
    
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
