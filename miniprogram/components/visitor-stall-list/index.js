// components/visitor-stall-list/visitor-stall-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 摊位列表
    stallList: {
      type: Array,
      value: [
        {
          // 摊位名
          title: "test",
          // 封面图片
          coverImg:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3125464840,3044799355&fm=26&gp=0.jpg",
          // 摊位标签 如热门
          tag: "热门",
          // 摊位类别
          label: "美食",
          // 评价
          score: 4,
          // 距离
          distance: 100,
          // 县区
          localCity: "青山湖区",
          // 商圈
          businessArea: "南京东路",
          // 运营开始时间
          startTime: "19:00",
          // 运营结束时间
          endTime: "24:00",
          // 浏览人数
          visited: 0,
          // 优惠活动tag
          // 优惠数量
          promotionNum: 3,
          // 活动数量
          activityNum: 1,
        },
      ],
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
  methods: {},
});
