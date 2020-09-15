// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection('stall_stall').field({
    _id:true,
    title:true,
    coverImg:true,
    hadSeenNum:true,
    label:true,
    score:true,
    localCity:true,
    businessArea:true,
    openTime:true,
    activityList:true,
  }).get().then(res => res)
}