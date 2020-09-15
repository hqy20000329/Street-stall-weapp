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
    num: 0,
    stallLists:[],
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
  },


  pageLifetimes: {
    show: function() {
      const self = this;
      // 页面被展示
      wx.cloud.callFunction({
        name:"getMerChantStall",
        success(res){
          console.log(res.result);
          const resData = res.result;
          const stallLists = []
          self.setData({
            num: resData.length,
          });
          resData.forEach( ({ data }) => {
            stallLists.push({
              id: data._id,
              title: data.title,
              coverImg: data.coverImg,
              localCity: data.localCity,
              address: data.address,
              businessArea: data.businessArea,
              openTime: data.openTime,
              label: data.label,
            })
          });
          self.setData({
            stallLists,
          });
          console.log(self.data.stallLists);
        },
        fail(err){
          console.log(err);
        }
      })
    },
  }
})
