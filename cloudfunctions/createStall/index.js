// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openId = wxContext.OPENID; //所属商家
  const title = event.title; //标题
  const label = event.label; //标签
  const desc = event.desc; //描述
  const openTime = event.openTime; // 营业时间
  /**{
    startTime:'',
    closeTime: ''
  }; */
  const coverImg = event.coverImg; // 封面图片
  const descImgs = event.descImgs;// 图片地址数组
  const location = event.location; // 地理位置
  /**{
    latitude:'',
    longitude:''
  };*/
  const localCity = event.localCity;// 县 区
  const businessArea = event.businessArea; // 商圈
  const address = event.address; // 地址描述

  const activityList = [] // 活动数组
  const isOpen = false; // 是否营业
  const assessList = []; // 评价数组存评价id
  const scoreList = []; //存评分id 
  const score = 5.0; // 评分
  const hadSeenNum = 0; //浏览人数
  const customNum = 0; // 接待人数
  const lastOpenTime = 0;// 上一次营业时间

  return await db.collection('stall_stall').add({
    data: {
      merchantId: openId,
      title,
      label,
      desc,
      openTime,
      coverImg,
      descImgs,
      location,
      localCity,
      address,
      businessArea,
      isOpen,
      activityList,
      assessList,
      scoreList,
      score,
      hadSeenNum,
      customNum,
      lastOpenTime,
      createTime: Date.now() 
    }
  }).then(res => {
      return db.collection('stall_user').where({
        userId: openId,
        actorId: 2
      }).update({
        data: {
          stallList: _.push(res._id)
        }
      })
  })
}