// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const _ = db.command;
const $ = _.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openId = wxContext.OPENID; // 操作用户
  const stallId = event.stallId; // 要删除记录的摊位id
  return await db.collection('stall_user')
  .where({
    userId: openId,
    actorId: 1,
  })
  .update({
    data:{
      watchHistory:_.pull({
        stallId: _.eq(stallId),
      })
    }
  })
  .then(res => res)
  .catch(err => err)
}