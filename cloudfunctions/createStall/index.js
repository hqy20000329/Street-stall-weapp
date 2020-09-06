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
  const descImg = event.descImgs;// 图片地址数组
  const location = event.location; // 地理位置
  /**{
    latitude:'',
    longitude:''
  };*/
  const activityList = [] // 活动数组
  const isOpen = false; // 是否营业
  const assessList = []; // 评价数组存评价id
  const scoreList = []; //存评分id 
  const hadSeenNum = 0; //浏览人数

  return await db.collection('stall_stall').add({
    data: {
      merchantId: openId,
      title,
      label,
      desc,
      openTime,
      coverImg,
      descImg,
      location,
      isOpen,
      activityList,
      assessList,
      scoreList,
      hadSeenNum,
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