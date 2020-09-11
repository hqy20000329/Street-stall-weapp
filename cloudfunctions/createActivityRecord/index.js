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
  const openId = wxContext.OPENID; // 参加活动游客的id
  const stallId = event.stallId; // 所属摊位id
  const activityId = event.activityId; // 活动id

  return await db.collection('stall_activity-record').add({
    visitorId: openId,
    stallId,
    activityId,
    createTime: Date.now()
  }).then(res => {
    return db.collection('stall-activity').doc(res.activityId).update({
      data: {
        joined: _push(res._id)
      }
    })
  })
}