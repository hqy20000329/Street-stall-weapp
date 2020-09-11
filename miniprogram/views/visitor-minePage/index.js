// components/visitor-minePage/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      wx.cloud.callFunction({
        name:'createScore',
        data:{
          stallId:'65825b355f5499ce00e5fc4541788dc8',
          score:4.5,
        },
        success(res){
          console.log(res);
        },
        fail(err){
          console.log(err);
        }
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})
