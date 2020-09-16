// miniprogram/pages/merchant/merchant.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前选中页面
    active: 0,
    
    // 性能优化，各个页面是否渲染
    drawStallPage: true,
    drawMinePage: false,
    // 图标src
    icon: {
      myStall: {
        normal: "../../images/icon/merchant-stall.png",
        active: "../../images/icon/merchant-stall-active.png",
      },
      useQRCode: {
        normal: "../../images/icon/merchant-QRCode.png",
      },
      manage: {
        normal: "../../images/icon/visitor-user.png",
        active: "../../images/icon/visitor-user-active.png",
      },
    },

    // 摊位数量 最大3个
    num: 0,
    stallLists: [],
    totalStall: {},
  },

  /**
   * 切换页面事件
   */
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
    this.changeDrawPage(this.data.active);
  },

  /**
   * 更改页面渲染
   */
  changeDrawPage(pageNum) {
    if (pageNum === 0) {
      if (!this.data.drawHomePage) {
        this.setData({ drawHomePage: true });
      }
    } else if (pageNum === 2) {
      if (!this.data.drawMinePage) {
        this.setData({ drawMinePage: true });
      }
    }
  },

  /**
   * 获取数据
   */
  getStallData(){
    const self = this;
    // 页面被展示
    wx.cloud.callFunction({
      name:"getMerChantStall",
      success(res){
        let resData = res.result;
        const stallLists = [];
        let totalStall = {};

        if(resData.length > 0){
          totalStall = resData[0].data;
        }

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
            hadSeenNum: data.hadSeenNum,
            customNum: data.customNum,
            isOpen: data.isOpen,
            score: data.score,
          })
          if(data.isOpen){
            totalStall = data
          }
        });
        self.setData({
          stallLists,
          totalStall,
        });
        console.log(self.data.stallLists);
        console.log(self.data.totalStall);
      },
      fail(err){
        console.log(err);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStallData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getStallData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
