// 功能移除
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
  const assessDesc = event.assessDesc; // 游客的评价
  const assessImg = event.assessImg; // 游客的评价图片
  const avatarUrl = event.avatarUrl; //游客的头像
  const nickName = event.nickName; // 游客的昵称
  const score = event.score; // 游客的评分
  return await db.collection('stall_assess').add({
    data: {
      visitorId: openId,
      stallId,
      assessDesc,
      assessImg,
      avatarUrl,
      nickName,
      score,
      createTime: Date.now()
    }
  }).then( res => {

    const update_stall_stall_score = new Promise((resolve, reject) => {
      db.collection("stall_assess")
      .where({
        stallId,
      })
      .get()
      .then(res => {
        const assessData = res.data;
        let sum = 0;
        let avg_score = 0;
        if (assessData.length > 0){
          assessData.forEach(item => {
            sum += item.score
          })
        }
        avg_score = (sum / assessData.length).toFixed(1);
        db.collection("stall_stall").doc(stallId)
        .update({
          data:{
            score: avg_score,
          }
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
      })
    })

    const update_stall_stall_assessList = new Promise((resolve, reject) => {
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
    const tasks = [update_stall_stall_assessList, update_stall_user, update_stall_stall_score];
    return Promise.all(tasks).then(res => res);
  })
}