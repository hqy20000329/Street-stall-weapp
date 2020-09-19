// components/collection-card-list/index.js
const computedBehavior = require("miniprogram-computed");
const queryToString = require("../../api/dealQuery");
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    stallListData: {
      type: Array,
      value: [],
    },
  },
  watch: {
    stallListData: function () {
      if (this.data.stallListData.length !== 0) {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          context:this,
        });
        this.getStallList();
      } else if (this.data.stallListData.length === 0) {
        this.setData({
          stalls: [],
        });
      }
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    stalls: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getStallList() {
      const self = this;
      wx.cloud.callFunction({
        name: "getStallList",
        data: {
          stallListData: self.data.stallListData,
        },
        success(res) {
          console.log(res);
          const resData = res.result;
          const stalls = [];
          resData.forEach((item) => {
            stalls.push(item.data);
          });
          self.setData({
            stalls,
          });
          Toast.clear();
        },
        fail(err) {
          Toast.clear();
          console.log(err);
        },
      });
    },

    onClick(e) {
      console.log(e);
      const self = this;
      if (e.detail === "right") {
        Dialog.confirm({
          title: "标题",
          message: "弹窗内容",
          asyncClose: true,
          context: this,
        })
          .then(() => {
            wx.cloud.callFunction({
              name: "deleteCollection",
              data: {
                stallId: e.currentTarget.dataset.id,
              },
              success(res) {
                console.log(res);
                Dialog.close();
                let stallListData = [...self.data.stallListData];

                stallListData.splice(e.currentTarget.dataset.index, 1);
                self.setData({
                  stallListData,
                });
                console.log(stallListData);
              },
              fail(err) {
                console.log(err);
              },
            });
          })
          .catch(() => {
            // on cancel
            Dialog.close();
          });
      } else if (e.detail === "cell") {
        const data = queryToString({
          stall_id: e.currentTarget.dataset.id,
          title: e.currentTarget.dataset.title,
        });
        wx.navigateTo({
          url: "../visitor-stall-detail/visitor-stall-detail" + data,
          success: (result) => {},
        });
      }
    },

    onClose(e) {
      const { instance } = e.detail;
      instance.close();
    },
  },
});
