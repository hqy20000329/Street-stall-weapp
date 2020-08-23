// miniprogram/pages/vistor/vistor.js
Page({
  data: {
    active: 0,
    pageList: [
      {
        text: '首页',
        url: '../visitor-index/visitor-index'
      },
      {
        text: '活动',
        url: '../visitor-active/visitor-active'
      },
      {
        text: '我的',
        url: '../visitor-user/visitor-user'
      }
    ]
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
    wx.showToast({
      title: `点击标签 ${event.detail + 1}`,
      icon: 'none',
    });
    wx.navigateTo({
      url: this.data.pageList[event.detail].url
    });
  },
});