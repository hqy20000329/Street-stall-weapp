// views/merchant-minePage/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    totalStall: {
      type:Object,
      value:{},
    },
    stallLists: {
      type:Array,
      value:[],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPopup:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTotalStall(){
      this.setData({
        showPopup:true,
      })
    },
    onClose(){
      this.setData({
        showPopup:false,
      })
    }
  }


})
