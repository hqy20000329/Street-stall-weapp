// components/visitor-homePage/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    homePageCity:{
      type:String,
      value:"南昌"
    },

    // 轮播图图片
    swiperList:{
      type: Array,
      value: [
        "../../images/img/slide1.jpg",
        "../../images/img/slide2.jpg",
        "../../images/img/slide3.jpg",
      ],
    },

    // 摊位列表 
    // stalls: {
    //   type: Array,
    //   value: [
    //     {
    //       // 摊位id
    //       id: 1231213,
    //       // 摊位名
    //       title: "test",
    //       // 封面图片
    //       coverImg:
    //         "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3125464840,3044799355&fm=26&gp=0.jpg",
    //       // 摊位标签 如热门
    //       tag: "热门",
    //       // 摊位类别
    //       label: "美食",
    //       // 评价
    //       score: 4,
    //       // 距离
    //       distance: 100,
    //       // 县区
    //       localCity: "青山湖区",
    //       // 商圈
    //       businessArea: "南京东路",
    //       // 运营开始时间
    //       startTime: "19:00",
    //       // 运营结束时间
    //       endTime: "24:00",
    //       // 浏览人数
    //       visited: 0,
    //       // 优惠活动tag
    //       // 优惠数量
    //       promotionNum: 3,
    //       // 活动数量
    //       activityNum: 1,
    //     },
    //     {
    //       // 摊位名
    //       title: "test",
    //       // 封面图片
    //       coverImg:
    //         "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3125464840,3044799355&fm=26&gp=0.jpg",
    //       // 摊位标签 如热门
    //       tag: "热门",
    //       // 摊位类别
    //       label: "美食",
    //       // 评价
    //       score: 4,
    //       // 距离
    //       distance: 100,
    //       // 县区
    //       localCity: "青山湖区",
    //       // 商圈
    //       businessArea: "南京东路",
    //       // 运营开始时间
    //       startTime: "19:00",
    //       // 运营结束时间
    //       closeTime: "24:00",
    //       // 浏览人数
    //       visited: 0,
    //       // 优惠活动tag
    //       // 优惠数量
    //       promotionNum: 3,
    //       // 活动数量
    //       activityNum: 1,
    //     },
        
    //   ],
    // },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 摊位列表数据
    stalls: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getStallListData(){
      const self = this;
      wx.cloud.callFunction({
        name:'getStall',
        success(res) {
          console.log(res);
          const stalls = [];
          const stallData = res.result.data;
          stallData.forEach( item => {
            stalls.push({
              id:item._id,
              title: item.title,
              coverImg: item.coverImg,
              tag: item.hadSeenNum >= 1000 ? '热门' : '',
              label: item.label,
              score: item.score,
              distance: 0,
              localCity: item.localCity,
              businessArea: item.businessArea,
              startTime: item.openTime.startTime,
              closeTime: item.openTime.closeTime,
              visited: item.hadSeenNum,
              activityNum: item.activityList.length
            })
          });
          console.log(stalls);
          self.setData({
            stalls,
          })
        },
        fail(err) {
          console.log("获取数据出现错误")
        },
      })
    }
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.getStallListData()
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
