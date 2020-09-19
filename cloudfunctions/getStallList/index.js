// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const stallListData = event.stallListData;
  const tasks = [];
  const _db = db.collection("stall_stall")
  stallListData.forEach(item => {
    const promise = new Promise((resolve, reject) => {
      _db.doc(item.stallId).field({
        _id:true,
        title:true,
        label:true,
        coverImg:true,
        score:true,
        address:true,
      }).get().then(res => {
        resolve(res);
      }).catch(err =>{
        reject(err);
      })
    })
    tasks.push(promise);
  })
  return await Promise.all(tasks).then(res => res).catch(err => err);
}