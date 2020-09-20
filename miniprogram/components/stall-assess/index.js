const {dayTimeFormat} = require('../../api/dealTime');
const computedBehavior = require("miniprogram-computed");
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    assessList: {
      type: Array,
      value: [],
    },
  },

  watch: {
    assessList: function () {
      if (this.data.assessList.length !== 0) {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          context:this,
        });
        this.getAssessList('first')
      }
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    assessData:[],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getAssessList(operate){
      const self = this;
      const assessList = [...this.data.assessList];
      wx.cloud.callFunction({
        name:'getAssess',
        data:{
          operate,
          assessList,
        },
        success(res){
          const resData = [...res.result];
          const assessData = [];
          resData.forEach(item => {
            item.data.createTime = dayTimeFormat(item.data.createTime);
            assessData.push(item.data);
          })
          self.setData({
            assessData,
          })
          Toast.clear();
          console.log('评论数据',assessData);
        },
        fail(err){
          Toast.clear();
          console.log(err);
        }      
      })
    },

    loadMoreAssess(){
      this.getAssessList('more');
    }
  },
});
