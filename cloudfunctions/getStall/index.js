/*
 * @Author: your name
 * @Date: 2020-09-10 15:23:32
 * @LastEditTime: 2020-09-17 18:32:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Street-stall-weapp\cloudfunctions\getStall\index.js
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection('stall_stall')
  .where({
    isOpen:true,
  })
  .field({
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
    location:true,
  }).get().then(res => res)
}