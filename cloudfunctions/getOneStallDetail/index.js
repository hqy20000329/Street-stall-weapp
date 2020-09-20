// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
// 云函数入口函数
const _ = db.command;
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID; // 游客的openId

  const stallId = event._id;

  return await db
    .collection("stall_stall")
    .doc(stallId)
    .update({
      data: {
        hadSeenNum: _.inc(1),
      },
    })
    .then(async (res) => {
      return await db
        .collection("stall_user")
        .where({
          userId: openId,
          actorId: 1,
        })
        .update({
          data: {
            watchHistory:_.push({stallId,createTime:Date.now()}),
          }
        })
        .then((res) => res);
    })
    .then(async (res) => {
      return await db
        .collection("stall_stall")
        .doc(stallId)
        .get()
        .then((res) => res);
    })
    .catch((err) => err);
};
