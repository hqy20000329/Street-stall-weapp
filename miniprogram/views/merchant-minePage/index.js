// views/merchant-minePage/index.js
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    stallLists: {
      type: Array,
      value: [],
    },
    actions: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPopup: false,
    openStall: "",
    openIndex: 0,
    totalStall: {}, //显示的摊位
    totalIndex: 0, // 当前摊位的下标
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击切换摊位时
    changeTotalStall() {
      this.setData({
        showPopup: true,
      });
    },
    // 关闭选择摊位时
    onClose() {
      this.setData({
        showPopup: false,
      });
    },
    // 切换摊位选择时
    onSelect(event) {
      if (this.data.totalStall.title === event.detail.name) {
        return;
      } else {
        this.setData({
          totalStall: this.data.stallLists[event.detail.index],
          totalIndex: event.detail.index,
        });
        console.log(this.data.totalStall, this.data.totalIndex);
      }
    },
    // 添加摊位
    addStall() {
      console.log(this.data);
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

    // 摊位的营业与打烊
    stallOpen() {
      const self = this;
      console.log(self.data.openStall);
      if (self.data.totalStall._id !== self.data.openStall && self.data.openStall) {
        Dialog.confirm({
          title: "摊位营业",
          message: "当前存在其他营业摊位,是否确定切换营业小摊?",
          asyncClose: true,
          context: self,
        })
          .then(() => {
            // on confirm
            // 关闭当前营业小摊
            wx.cloud.callFunction({
              name: "stallOpen",
              data: {
                operate: "close",
                stallId: self.data.openStall,
              },
              success(res) {
                const resData = res.result.data;
                let stallLists = [...self.data.stallLists];
                stallLists.splice(self.data.openIndex, 1, resData);
                self.setData({
                  openStall: "",
                  stallLists,
                });
                console.log(self.data.stallLists);
                // 当前摊位的营业
                wx.cloud.callFunction({
                  name: "stallOpen",
                  data: {
                    operate: "open",
                    stallId: self.data.totalStall._id,
                  },
                  success(res) {
                    const resData = res.result.data;
                    let stallLists = [...self.data.stallLists];
                    stallLists.splice(self.data.totalIndex, 1, resData);
                    console.log(stallLists);
                    self.setData({
                      totalStall: resData,
                      openStall: resData._id,
                      openIndex: self.data.totalIndex,
                      stallLists,
                    });
                    Dialog.close();
                  },
                  fail(err) {
                    console.log(err);
                  },
                });
              },
              fail(err) {
                console.log(err);
              },
            });
          })
          .catch(() => {
            Dialog.close();
            return;
          });
      } else { // 当前营业摊位的营业歇业
        wx.cloud.callFunction({
          name: "stallOpen",
          data: {
            operate: self.data.totalStall.isOpen ? "close" : "open",
            stallId: self.data.totalStall._id,
          },
          success(res) {
            console.log(res);
            const resData = res.result.data;
            let stallLists = [...self.data.stallLists];
            stallLists.splice(self.data.totalIndex, 1, resData);
            console.log(stallLists);
            self.setData({
              totalStall: resData,
              openStall: resData._id,
              openIndex: self.data.totalIndex,
              stallLists,
            });
          },
          fail(err) {
            console.log(err);
          },
        });
      }
    },

    loadData() {
      // 在组件实例进入页面节点树时执行
      // 初始化选择器中列表
      // 初始化该显示的摊位
      // 初始化是否有营业摊位

      const stallLists = this.data.stallLists;
      let totalStall = {};
      let tmpIndex = 0;
      let openStall = "";
      let openIndex = 0;
      stallLists.forEach((item, index) => {
        if (item.isOpen) {
          totalStall = { ...item };
          openStall = item._id;
          openIndex = index;
        }
        if (item.lastOpenTime > stallLists[tmpIndex].lastOpenTime) {
          tmpIndex = index;
        }
      });

      if (JSON.stringify(totalStall) === "{}") {
        totalStall = { ...stallLists[tmpIndex] };
      }

      this.setData({
        totalStall,
        openStall,
        totalIndex: tmpIndex,
      });
    },
  },

  lifetimes: {
    attached: function () {
      this.loadData();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
});
