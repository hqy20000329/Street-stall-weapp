// 云函数入口文件
const cloud = require('wx-server-sdk')

// 云函数入口函数
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const _ = db.command
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID; //游客的id 可根据id获取头像昵称显示
  const stallId = event.stallId; // 游客评价的摊位
  const assessDesc = event.assessDesc // 游客的评价
  const assessImgList = event.assessList // 游客的评价图片
  return await db.collection('stall_assess').add({
    data: {
      visitorId: openId,
      stallId,
      assessDesc,
      assessImgList,
      createTime: Date.now()
    }
  }).then( res => {
    const update_stall_stall = new Promise((resolve, reject) => {
      db.collection('stall_stall').doc(stallId).update({
        data: {
          assessList: _.push(res._id)
        }
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
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