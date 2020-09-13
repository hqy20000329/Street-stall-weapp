// miniprogram/pages/create-stall/create-stall.js
import couldImgFilePath from "../../static/couldImgFilePath";
const { getUserLocation } = require("../../api/getUserData");
const { translate, geocoder } = require("../../api/txMapApi");
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
import Notify from "../../miniprogram_npm/@vant/weapp/notify/notify";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    coverImg: [],
    descImgs: [],
    stallType: "未选择",
    startTime: "开始时间",
    closeTime: "关闭时间",
    stallDesc: "", // 摊位描述

    location: {}, //当前位置
    localCity: "", //县区
    address: "", // 地址描述
    businessArea: "", //商圈

    chooseTimePopup: false,
    totalChoose: "", // 当前选择的要传的时间 start close

    currentDate: "19:00",
    minHour: 0,
    maxHour: 23,

    stallTypeList: [
      { text: "未选择", value: "未选择" },
      { text: "美食小吃", value: "美食" },
      { text: "游戏玩乐", value: "游玩" },
      { text: "生活用品", value: "生活" },
      { text: "创意小摊", value: "创意" },
    ],
  },

  /**
   * 输入标题
   */
  inputTitle(e) {
    this.setData({
      title: e.detail,
    });
  },

  /**
   * 上传封面
   */
  afterReadCoverImg(e) {
    const self = this;
    const { file } = e.detail;
    console.log(e);
    let tempFileName = Date.now() + Math.floor(Math.random() * 1000) + ".png";
    wx.cloud.uploadFile({
      cloudPath: couldImgFilePath.stallCoverImg + tempFileName,
      filePath: file.path,
      success(res) {
        console.log(res);
        const coverImg = [];
        coverImg.push({
          url: res.fileID,
        });
        self.setData({
          coverImg,
        });
        console.log(self.data.coverImg);
      },
      fail(err) {
        console.log(err);
      },
    });
  },

  /**
   * 移除封面图片
   */
  deleteCoverImg() {
    this.setData({
      coverImg: [],
    });
  },

  /**
   * 上传摊位描述图片
   */
  afterReadDescImg(e) {
    const self = this;
    const { file } = e.detail;
    console.log(file);
    const tasks = [];
    for (let item of file) {
      let tempFileName = Date.now() + Math.floor(Math.random() * 1000) + ".png";
      const promise = new Promise((resolve, reject) => {
        wx.cloud
          .uploadFile({
            cloudPath: couldImgFilePath.stallDescImg + tempFileName,
            filePath: item.path,
          })
          .then((res) => {
            self.setData({
              descImgs: [...this.data.descImgs, { url: res.fileID }],
            });
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      tasks.push(promise);
    }
    Promise.all(tasks).then((res) => res);
  },

  /**
   * 移除描述图片
   */
  deleteDescImg(event) {
    let temp = this.data.descImgs;
    temp.splice(event.detail.index, 1);
    this.setData({
      descImgs: temp,
    });
  },

  /**
   * 选择摊位类型
   */
  changeStallType(e) {
    this.setData({
      stallType: e.detail,
    });
    console.log(this.data.stallType);
  },

  /**
   * 选择营业时间
   */
  showChooseTime(e) {
    this.setData({
      chooseTimePopup: true,
      totalChoose: e.target.dataset.type,
    });
  },

  /**
   * 关闭时间层弹出
   */
  onCloseTimeChoose() {
    this.setData({
      chooseTimePopup: false,
      totalChoose: "",
    });
  },
  /**
   * 时间修改
   */
  onInputTime(e) {
    this.setData({
      currentDate: e.detail,
    });
  },

  /**
   * 点击取消选择时间
   */
  onCancelTime() {
    this.closeTimePopup();
  },

  /**
   * 提交时间
   */
  onConfirmTime() {
    if (this.data.totalChoose === "start") {
      this.setData({
        startTime: this.data.currentDate,
      });
    } else if (this.data.totalChoose === "close") {
      this.setData({
        closeTime: this.data.currentDate,
      });
    }
    this.closeTimePopup();
  },

  /**
   * 关闭时间弹出层
   */
  closeTimePopup() {
    this.setData({
      chooseTimePopup: false,
      currentDate: "19:00",
      totalChoose: "",
    });
  },

  getLocation() {
    const self = this;
    getUserLocation().then((res) => {
      console.log("当前位置", res);
      self.setData({
        location: {
          latitude: res.latitude,
          longitude: res.longitude,
        },
      });
      geocoder({ longitude: res.longitude, latitude: res.latitude }, 1).then(
        (res) => {
          const localData = res.data.result;
          console.log("逆地址解析2", localData);
          self.setData({
            address: localData.address,
            localCity: localData.ad_info.district || localData.ad_info.city,
            businessArea: localData.address_reference.business_area
              ? localData.address_reference.business_area.title
              : localData.address_component.street || "",
          });
        }
      );
    });
  },

  /**
   * 创建摊位
   */
  createStall() {
    Toast.loading({
      message: "创建中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    wx.cloud.callFunction({
      name: "createStall",
      data: {
        title: this.data.title,
        label: this.data.stallType,
        desc: this.data.desc,
        openTime: {
          startTime: this.data.startTime,
          closeTime: this.data.closeTime,
        },
        coverImg: this.data.coverImg,
        descImgs: this.data.descImgs,
        location: this.data.location,
        localCity: this.data.localCity,
        address: this.data.address,
        businessArea: this.data.businessArea,
      },
      success(res) {
        console.log(res);
        Toast.clear();
        Notify({
          type: "success",
          message: "创建成功",
          duration: 500,
          onClose: () => {
            wx.navigateBack();
          },
        });
      },
      fail(err) {
        console.log(err);
        Toast.clear();
        Notify({ type: "danger", message: "创建失败",duration: 1500, });
      },
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
