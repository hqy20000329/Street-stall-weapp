// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

// 云函数入口函数
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const actorId = event.actorId;
  return actorId === 1
    ? await db.collection("stall_user").add({
        data: {
          userId: openid,
          actorId,
          // location:{
          //   latitude:null, //纬度
          //   longitude:null //经度
          // },
          couponRecordList: [],
          recordList: [],
          scoreId: [],
        },
      })
    : await db.collection("stall_user").add({
        data: {
          userId: openid,
          actorId,
          location:{
            latitude:null, //纬度
            longitude:null //经度
          },
          stallList:[]
        },
      });
};
