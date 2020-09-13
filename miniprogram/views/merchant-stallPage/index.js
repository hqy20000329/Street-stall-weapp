// views/merchant-stallPage/index.js
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
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
    // 摊位数量 最大3个
    num:1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addStall(){
      const self = this;
      if(this.data.num >= 3){
        Toast.fail({
          message:'最多三个摊位',
          context: this
        });
      }else{
        wx.navigateTo({
          url: "../create-stall/create-stall",
          fail:() => {
            Toast.fail({
              message:'网络异常',
              context: this
            });
          }
        })
      }
    },
  }
})
