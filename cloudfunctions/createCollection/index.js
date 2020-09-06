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
  const openId = wxContext.OPENID; // 游客id
  const stallId = event.stallId; // 收藏的摊位id
  
  return await db.collection('stall_collection').add({
    data: {
      visitorId: openId,
      stallId,
      createTime: Date.now()
    }
  }).then(res => {
    return db.collection.collection('stall_user').where({
      userId: openId,
      actorId: 1
    }).update({
      data: {
        recordList: _.push(res._id)
      }
    })
  })
}