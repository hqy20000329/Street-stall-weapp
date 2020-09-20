/*
 * @Author: your name
 * @Date: 2020-09-17 22:14:21
 * @LastEditTime: 2020-09-20 15:39:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Street-stall-weapp\cloudfunctions\stallOpen\index.js
 */
// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  // const openId = wxContext.OPENID; // 摊主的openId
  const stallId = event.stallId; // 摊位Id
  if (event.operate === "open") {
    return await db
      .collection("stall_stall")
      .doc(stallId)
      .update({
        data: {
          isOpen: true,
          lastOpenTime: Date.now(),
        },
      })
      .then(async (res) => {
        return await db
          .collection("stall_stall")
          .doc(stallId)
          .field({
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
            createTime: true,
            assessList:true,
            lastOpenTime: true,
          })
          .get()
          .then((res) => res);
      });
  } else if (event.operate === "close") {
    return await db
      .collection("stall_stall")
      .doc(stallId)
      .update({
        data: {
          isOpen: false,
        },
      })
      .then(async (res) => {
        return await db
          .collection("stall_stall")
          .doc(stallId)
          .field({
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
            assessList:true,
            createTime: true,
            lastOpenTime: true,
          })
          .get()
          .then((res) => res);
      });
  }
};
