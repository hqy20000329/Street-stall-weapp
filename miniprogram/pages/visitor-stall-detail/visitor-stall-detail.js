let plugin = requirePlugin("routePlan");
const LHN_key = "WJ3BZ-6X4KF-OJTJK-NLMLB-YADLT-X6FHJ";
const { translate } = require("../../api/txMapApi");
const queryToString = require('../../api/dealQuery');
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
// miniprogram/pages/visitor-stall-detail/visitor-stall-detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 用户点击的摊位id
    _id: "",

    // 用户选择的摊位名称
    title: "",

    // stallData 摊位信息
    stallData: {},
    // 折叠面板
    activeName: "0",
    distance: 0,
  },

  // 折叠面板改变
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },

  // 获取摊位详情
  getStallDetail() {
    const self = this;
    wx.cloud.callFunction({
      name: "getOneStallDetail",
      data: {
        _id: self.data._id,
      },
      success(res) {
        const resData = res.result.data;
        self.setData({
          stallData: { ...resData },
        });
        console.log("摊位详情的信息", resData);
      },
      fail(err) {
        console.log(err);
      },
    });
  },

  // 收藏摊位
  collectionStall(){
    const self = this;
    wx.cloud.callFunction({
      name:'createCollection',
      data:{
        stallId: self.data._id,
      },
      success(res){
        Toast({
          type:res.result.type ? 'success' : 'fail',
          message:res.result.msg,
        })
      },
      fail(err){
        console.log(err);
      }
    })
  },

  // 展示地图
  showMap() {
    let key = LHN_key; //使用在腾讯位置服务申请的key
    let referer = "Street-stall-weapp"; //调用插件的app的名称
    const location = this.data.stallData.location;

    translate([location]).then((res) => {
      const data = res.data.locations[0];
      let endPoint = JSON.stringify({
        //终点
        name: this.data.stallData.title,
        latitude: data.lat, //this.data.stallData.location.latitude,
        longitude: data.lng, //this.data.stallData.location.longitude,
      });
      wx.navigateTo({
        url:
          "plugin://routePlan/index?key=" +
          key +
          "&referer=" +
          referer +
          "&endPoint=" +
          endPoint,
      });
    });
  },

  // 前往评论发布页
  toAssessPage(){
    const data = queryToString({
      stall_id : this.data._id,
    })
    wx.navigateTo({
      url: "../assess-page/assess-page" + data,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户选择的摊位id
    this.setData({
      _id: options.stall_id,
      title: options.title,
      distance: options.distance,
    });

    // this.getStallDetail();
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
  onShow: function () {
    this.getStallDetail();
  },

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
