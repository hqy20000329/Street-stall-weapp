Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否自动切换
    autoplay: {
      type: Boolean,
      value: true,
    },

    // 切换间隔时间
    interval: {
      type: Number,
      value: 3000,
    },

    // 滑动时长
    duration: {
      type: Number,
      value: 500,
    },
    backgroundList: {
      type: Array,
      value: ["../../images/img/slide1.jpg", "../../images/img/slide2.jpg","../../images/img/slide3.jpg"],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 是否显示面板指示点
    indicatorDots: false,
    isActive: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange(e) {
      this.setData({
        isActive:e.detail.current
      })
    },
  },
});
