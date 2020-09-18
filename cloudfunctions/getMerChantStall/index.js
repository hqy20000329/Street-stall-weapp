// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openId = wxContext.OPENID; // 摊主的openid
  return await db.collection("stall_user").where({
    userId: openId,
    actorId: 2,
  }).field({
    stallList:true,
  }).get().then(res => {
    const stallIds = res.data[0].stallList;
    const stalls = [];
    const tasks = [];
    const _db = db.collection("stall_stall")
    for(let i = 0; i < stallIds.length;i ++){
      let promise = new Promise((resolve, reject) => {
        _db.doc(stallIds[i]).field({
          _id: true,
          title: true,
          coverImg: true,
          localCity: true,
          address: true,
          businessArea: true,
          openTime: true,
          label: true,
          hadSeenNum: true,
          customNum: true,
          isOpen: true,
          score: true,
          createTime:true,
          lastOpenTime: true,
        }).get()
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
      })
      tasks.push(promise);
    }
    return Promise.all(tasks).then(res => res).catch(err => err);
  })
}