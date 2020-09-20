// components/visitor-stall-list/visitor-stall-list.js
const queryToString = require('../../api/dealQuery')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 摊位列表
    stallList: {
      type: Array,
      value: [],
    },

    // 是否开启懒加载
    isLazyLoad: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    enterStall(e) {
      const data = queryToString({
        stall_id:e.currentTarget.dataset.id,
        title:e.currentTarget.dataset.title,
      })
      wx.navigateTo({
        url: "../visitor-stall-detail/visitor-stall-detail" + data, 
        success: (result) => {},
        fail: () => {},
        complete: () => {},
      });
    },
  },
});
