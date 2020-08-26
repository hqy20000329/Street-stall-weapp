// components/visitor-nav-home/visitor-nav-home.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 当前所处城市
    city:{
      type:String,
      value:"南昌"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuButton: app.globalData.menuButton,
    menuHeight: app.globalData.menuHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});
