// components/visitor-homePage/index.js
const { translate, distanceMatrix } = require("../../api/txMapApi");
const computedBehavior = require("miniprogram-computed");
Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    userLocation: {
      type: Object,
      value: {},
    },

    homePageCity: {
      type: String,
      value: "南昌",
    },

    // 轮播图图片
    swiperList: {
      type: Array,
      value: [
        "../../images/img/slide1.jpg",
        "../../images/img/slide2.jpg",
        "../../images/img/slide3.jpg",
      ],
    },
  },
  // 当子组件接受到位置时计算距离
  watch: {
    userLocation: function () {
      if (Object.keys(this.data.userLocation).length) {
        console.log(this.data.userLocation);
        this.getDistanceMatrix();
      }
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    // 摊位列表数据
    stalls: [],
    txLocations: [], // 腾讯地址解析
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getStallListData() {
      const self = this;
      wx.cloud.callFunction({
        name: "getStall",
        success(res) {
          console.log(res);
          const stalls = [];
          const stallData = res.result.data;
          const txLocations = [];
          stallData.forEach((item) => {
            stalls.push({
              id: item._id,
              title: item.title,
              coverImg: item.coverImg,
              tag: item.hadSeenNum >= 1000 ? "热门" : "",
              label: item.label,
              score: item.score,
              distance: 0,
              location: item.location,
              localCity: item.localCity,
              businessArea: item.businessArea,
              startTime: item.openTime.startTime,
              closeTime: item.openTime.closeTime,
              visited: item.hadSeenNum,
              activityNum: item.activityList.length,
            });
            txLocations.push({ ...item.location });
          });
          self.setData({
            stalls,
            txLocations,
          });
          self.getStallDistance();
        },
        fail(err) {
          console.log("获取数据出现错误", err);
        },
      });
    },
    getStallDistance() {
      const self = this;
      let txLocations = self.data.txLocations;
      translate(txLocations).then((res) => {
        console.log("批量摊位地址解析", res);
        txLocations = [...res.data.locations];
        self.setData({
          txLocations,
        });
      });
    },
    getDistanceMatrix() {
      const self = this;
      let txLocations = self.data.txLocations;
      let userLocation = self.data.userLocation;
      distanceMatrix(userLocation, txLocations).then((res) => {
        console.log(111);
        const elements = res.data.result.rows[0].elements;
        console.log("批量距离计算", elements);
        const stalls = [...self.data.stalls];
        stalls.forEach((item,index) => {
          item.distance = elements[index].distance;
        });
        this.setData({
          stalls,
        })
      });
    },
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.getStallListData();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
});
