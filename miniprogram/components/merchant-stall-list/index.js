const queryToString = require("../../api/dealQuery")

// components/merchant-stall-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    stallLists:{
      type:Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    editStall(e) {
      const data = queryToString({
        stall_id:e.currentTarget.dataset.id,
      })
      wx.navigateTo({
        url: "../edit-stall/edit-stall" + data,
        success: (result) => {},
        fail: () => {},
        complete: () => {},
      })
    }
  }
})
