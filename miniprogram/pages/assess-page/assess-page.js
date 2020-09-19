import couldImgFilePath, { stallCoverImg } from "../../static/couldImgFilePath";
import Notify from "../../miniprogram_npm/@vant/weapp/notify/notify";
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
// miniprogram/pages/assess-page/assess-page.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    assessImg:[], // 图片列表

    avatarUrl:"",// 用户头像
    nickName:"", // 用户昵称
    assessDesc:"", // 用互评论 
    stallId: '', // 评价摊位id
    rate:5, // 评分
    isDisable:false, // 按钮
    tempAssessImg:[],// 展示用
  },

  onGetUserInfo(e) {
    const self = this;
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              const {avatarUrl, nickName} = res.userInfo;
              self.setData({
                avatarUrl,
                nickName,
              })
              Toast.loading({
                message: "创建中...",
                forbidClick: true,
                loadingType: "spinner",
              });
              self.uploadAssess();
            } 
          })
        }
      }
    })
  },

  afterRead(e){
    const self = this;
    const { file } = e.detail;
    self.setData({
      tempAssessImg: [{ url: file.path }],
      isDisable: true,
    });
    let tempFileName = Date.now() + Math.floor(Math.random() * 1000) + ".png";
    wx.cloud.uploadFile({
      cloudPath: couldImgFilePath.visitorAssessImg + tempFileName,
      filePath: file.path,
      success(res) {
        console.log(res);
        const assessImg = [];
        assessImg.push({
          url: res.fileID,
        });
        self.setData({
          assessImg,
          isDisable: false,
        });
      },
      fail(err){
        console.log(err);
      }
    })
  },


  /**
   * 获取评分
   */
  onChange(e){
    this.setData({
      rate: e.detail, 
    });
    console.log(e.detail);
  },
  /**
   * 上传评论
   */
  uploadAssess(){
    const self = this;
    console.log("上传评论...");
    wx.cloud.callFunction({
      name:'createAssess',
      data:{
        stallId: self.data.stallId,
        assessDesc: self.data.assessDesc,
        assessImg: self.data.assessImg,
        avatarUrl: self.data.avatarUrl,
        nickName: self.data.nickName,
        score: self.data.rate, 
      },
      success(res){
        console.log(res);
        Toast.clear();
        Notify({
          type: "success",
          message: "创建成功",
          duration: 500,
          onClose: () => {
            wx.navigateBack();
          },
        });
      },
      fail(err){
        console.log(err);
        Toast.clear();
        Notify({ type: "danger", message: "创建失败", duration: 1500 });
      }
    })
  },
  /**
   * 移除评论图片
   */
  deleteAssessImg(e) {
    console.log(e);
    this.setData({
      assessImg: [],
      tempAssessImg: [],
    });
  },

  subText(e){
    this.setData({
      assessDesc:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const stallId = options.stall_id;
    this.setData({
      stallId,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
