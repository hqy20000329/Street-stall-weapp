// components/visitor-item-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 列数
    columnNum:{
      type:Number,
      value:5
    },

    // 图标大小
    iconSize:{
      type:Number,
      value:40
    },

    itemList:{
      type:String,
      value:[
        {
          img:"/images/icon/visitor-barbecue.png",
          text:"美食小铺"
        },
        {
          img:"/images/icon/visitor-play.png",
          text:"游玩时刻"
        },
        {
          img:"/images/icon/visitor-life.png",
          text:"生活用品"
        },
        {
          img:"/images/icon/visitor-create.png",
          text:"创意小摊"
        },
        {
          img:"/images/icon/visitor-gone.png",
          text:"打卡精品"
        }
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
