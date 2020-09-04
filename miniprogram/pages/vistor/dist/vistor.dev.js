"use strict";

// miniprogram/pages/vistor/vistor.js
Page({
  data: {
    active: 0,
    pageList: [{
      text: '首页'
    }, {
      text: '活动'
    }, {
      text: '我的'
    }]
  },
  onChange: function onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({
      active: event.detail
    });
  }
});