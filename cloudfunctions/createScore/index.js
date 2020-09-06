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
  const openId = wxContext.OPENID; // 评分用户id
  const stallId = event.stallId; // 游客评分的摊位
  const score = event.score; // 游客的评分

  return await db.collection('stall_score').add({
    data: {
      visitorId: openId,
      stallId,
      score,
      createTime: Date.now()
    }
  }).then(res => {
    const update_stall_stall = new Promise((resolve,reject) => {
      db.collection('stall_stall').doc(stallId).update({
        data: {
          assessList: _.push(res.id)
        }
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
    const update_stall_user = new Promise((resolve, reject) => {
      db.collection('stall_user').where({
        userId: openId,
        actorId: 1
      }).update({
        data: {
          assessList: _.push(res._id)
        }
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
    const tasks = [update_stall_stall, update_stall_user];
    return Promise.all(tasks).then(res => res);
  })
}