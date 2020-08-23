"use strict";

// miniprogram/pages/vistor/vistor.js
Page({
  data: {
    active: 0,
    pageList: [{
      text: '首页',
      url: '../visitor-index/visitor-index'
    }, {
      text: '活动',
      url: '../visitor-active/visitor-active'
    }, {
      text: '我的',
      url: '../visitor-user/visitor-user'
    }]
  },
  onChange: function onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({
      active: event.detail
    });
    wx.showToast({
      title: "\u70B9\u51FB\u6807\u7B7E ".concat(event.detail + 1),
      icon: 'none'
    });
    wx.navigateTo({
      url: this.data.pageList[event.detail].url
    });
  }
});