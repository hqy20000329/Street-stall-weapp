// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID; // 游客id
  const stallId = event.stallId; // 收藏的摊位id

  return await db
    .collection("stall_user")
    .where({
      userId: openId,
      actorId: 1,
    })
    .get()
    .then((res) => {
      if (res.data[0].collectionList.indexOf(stallId) >= 0) {
        return true;
      }
      return false;
    })
    .then(async (res) => {
      if (res) {
        return { type: false, msg: "收藏过了" };
      }
      return await db
        .collection("stall_user")
        .where({
          userId: openId,
          actorId: 1,
        })
        .update({
          data: {
            collectionList: _.push(stallId),
          },
        })
        .then((res) => {
          return { type: true, msg: "收藏成功" };
        })
        .catch((err) => err);
    });
};
