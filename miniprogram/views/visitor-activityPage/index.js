// components/visitor-activityPage/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 活动数据
    activityList:{
      type:Array,
      value:[
        {
          id:"",
          title:"test",
          desc:"This is a test word",
          startTime:"19:00",
          endTime:"23:00",
          interestNum:1000
        }
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    option1: [
      { text: '当前活动', value: 0 },
      { text: '未开始活动', value: 1 },
      { text: '已结束活动', value: 2 },
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '热门排序', value: 'b' },
      { text: '距离排序', value: 'c' },
    ],
    value1: 0,
    value2: 'a',
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
