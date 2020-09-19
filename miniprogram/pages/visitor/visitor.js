// miniprogram/pages/vistor/vistor.js
const { getUserLocation } = require("../../api/getUserData");
const { translate, geocoder } = require("../../api/txMapApi");
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前选中页面
    active: 0,

    // 性能优化，各个页面是否渲染
    drawHomePage: true,
    drawActivityPage: false,
    drawMinePage: false,

    userLocation: {}, // 用户坐标

    localCity: "南昌",
    // 图标src
    icon: {
      home: {
        normal: "../../images/icon/visitor-home.png",
        active: "../../images/icon/visitor-home-active.png",
      },
      // activity: {
      //   normal: "../../images/icon/visitor-active.png",
      //   active: "../../images/icon/visitor-active-active.png",
      // },
      user: {
        normal: "../../images/icon/visitor-user.png",
        active: "../../images/icon/visitor-user-active.png",
      },
    },

    navBarHeight: app.globalData.navBarHeight,
  },

  /**
   * 切换页面事件
   */
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    // if (event.detail === 1) {
    //   Toast("功能开发中!");
    //   return;
    // }
    this.setData({ active: event.detail });
    this.changeDrawPage(this.data.active);
  },

  /**
   * 更改页面渲染
   */
  changeDrawPage(pageNum) {
    if (pageNum === 0) {
      if (!this.data.drawHomePage) {
        this.setData({ drawHomePage: true });
      }
    } 
    // else if (pageNum === 1) {
    //   if (!this.data.drawActivityPage) {
    //     this.setData({ drawActivityPage: true });
    //   }
    // } 
    else if (pageNum === 1) {
      if (!this.data.drawMinePage) {
        this.setData({ drawMinePage: true });
      }
    }
  },

  /**
   * 显示用户首页左上角位置
   */
  getLocation() {
    const self = this;
    getUserLocation().then((res) => {
      console.log("微信定位", res);
      geocoder({ longitude: res.longitude, latitude: res.latitude }, 1).then(
        (res) => {
          console.log(res);
          const localData = res.data.result;
          console.log("坐标解析", localData);
          self.setData({
            localCity: localData.ad_info.district || localData.ad_info.city,
          });
          if (localData.address_component.city !== "南昌市") {
            Dialog.alert({
              title: "注意",
              message: "当前小程序测试地区为南昌市,其他地区信息不准确",
            }).then(() => {
              // on close
            });
          }
        }
      );
      translate([{ latitude: res.latitude, longitude: res.longitude }]).then(
        (res) => {
          const userLocation = { ...res.data.locations[0] };
          console.log("坐标转换", userLocation);
          self.setData({
            userLocation,
          });
        }
      );
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting["scope.userLocation"]) {
          wx.authorize({
            scope: "scope.userLocation",
            success() {
              self.getLocation();
            },
          });
        } else {
          self.getLocation();
        }
      },
      fail: () => {
        console.log("用户未授权");
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
