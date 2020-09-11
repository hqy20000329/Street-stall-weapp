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
  const openId = wxContext.OPENID; // 商家id
  const stallId = event.stallId; // 摊位id
  const activityTitle = event.activityTitle; // 活动标题
  const activityDesc = event.activityDesc; //活动描述
  const activityImgCover = event.activityImgCover; // 活动封面图
  const activityImgList = event.activityImgList; // 活动宣传图
  const holdTime = event.holdTime; // 举办时间
  const joined = []; // 参加的记录id
    /**{
    startTime:'',
    closeTime: ''
  }; */
  return await db.collection('stall_activity').add({
    data: {
      merchant: openId,
      stallId,
      activityTitle,
      activityDesc,
      activityImgCover,
      activityImgList,
      holdTime,
      joined,
      createTime: Date.now()
    }
  }).then(res => {
    return db.collection('stall_stall').doc(res.stallId).update({
      data: {
        activityList: _.push(res.id)
      }
    })
  })
}