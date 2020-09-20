// components/visitor-homePage/index.js
const { translate, distanceMatrix } = require("../../api/txMapApi");
const computedBehavior = require("miniprogram-computed");
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
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
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          context:this,
        });
        this.getStallDistance();
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
    tempStalls:[],//临时数据
    chooseLabel: '全部',
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
              tag: item.hadSeenNum >= 200 ? "热门" : "",
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
            tempStalls:[...stalls],
          });
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
        self.getDistanceMatrix();
      });
    },
    getDistanceMatrix() {
      const self = this;
      let txLocations = self.data.txLocations;
      let userLocation = self.data.userLocation;
      distanceMatrix(userLocation, txLocations).then((res) => {
        const elements = res.data.result.rows[0].elements;
        console.log("批量距离计算", elements);
        const stalls = [...self.data.stalls];
        stalls.forEach((item, index) => {
          item.distance = (elements[index].distance / 1000).toFixed(1);
        });
        this.setData({
          stalls,
        });
        Toast.clear();
      });
    },

    changeType(e) {
      this.setData({
        chooseLabel:e.detail
      })
      const tempStalls = this.data.tempStalls;
      
      if(e.detail === "全部"){
        this.setData({
          stalls:[...tempStalls],
        })
      } else {
        let stalls = [];
        stalls = tempStalls.filter(item => {
          return item.label === e.detail;
        })
        this.setData({
          stalls,
        })
      }
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
