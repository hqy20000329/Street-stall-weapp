//app.js
const { getUserLocation } = require("./api/getUserData");
const { translate , geocoder } = require("./api/txMapApi");
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: "writebefore-ifk65",
        traceUser: true,
      });
    }
    this.globalData = {};

    // getUserLocation().then((res) => {
    //   console.log(res);
    //   geocoder({longitude:res.longitude,latitude:res.latitude})
    //   .then(res => {
    //     console.log(res);
    //   })
    // })
    // translate(
    //   [{ latitude: 28.717235565185547, longitude: 115.82322692871094 }],
    //   1
    // ).then((res) => {
    //   console.log(res);
    // });
    const systemInfo = wx.getSystemInfoSync();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    console.log(systemInfo);
    console.log(menuButtonInfo);

    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.left;
    this.globalData.menuButton = menuButtonInfo.top - systemInfo.statusBarHeight;
    this.globalData.menuHeight = menuButtonInfo.height;
  },
});
