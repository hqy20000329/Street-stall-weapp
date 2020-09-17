/*
 * @Author: your name
 * @Date: 2020-09-17 15:04:05
 * @LastEditTime: 2020-09-17 15:20:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \Street-stall-weapp\cloudfunctions\getOneStallDetail\index.js
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
  const openId = wxContext.OPENID; // 游客的openId
  
  return await db.collection()
}