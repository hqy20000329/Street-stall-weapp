// views/merchant-minePage/index.js
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    totalStall: {
      type: Object,
      value: {},
    },
    stallLists: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPopup: false,
    actions: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTotalStall() {
      this.setData({
        showPopup: true,
      });
    },
    onClose() {
      this.setData({
        showPopup: false,
      });
    },
    onSelect(event) {
      console.log(event.detail);
      if (this.data.totalStall.title === event.detail.name) {
        return;
      } else {
        this.setData({
          totalStall: this.data.stallLists[event.detail.index],
        });
      }
    },
    addStall() {
      if (this.data.stallLists.length === 3) {
        Toast.fail({
          duration: 1500,
          message: "每个用户只能创建三个小摊",
          context: this,
        });
      } else {
        wx.navigateTo({
          url: "../create-stall/create-stall",
          fail: () => {
            Toast.fail({
              duration: 1500,
              message: "网络异常",
              context: this,
            });
          },
        });
      }
    },
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      const stallLists = this.data.stallLists;
      const actions = [];
      stallLists.forEach((item, index) => {
        actions.push({ name: item.title, index });
      });
      this.setData({
        actions,
      });
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
});
