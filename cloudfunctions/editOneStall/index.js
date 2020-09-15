// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID; // 摊主的openid
  const stallId = event.stallId; // 摊位Id
  if (event.operate === "get") {
    return await db
      .collection("stall_stall")
      .doc(stallId)
      .field({
        title: true,
        label: true,
        desc: true,
        openTime: true,
        coverImg: true,
        descImgs: true,
      })
      .get()
      .then((res) => res);
  } else if (event.operate === "update") {
    const title = event.title; //摊位标题
    const label = event.label; // 标签
    const desc = event.desc; // 描述
    const openTime = event.openTime; // 营业时间
    const coverImg = event.coverImg; // 封面图片
    const descImgs = event.descImgs; // 图片地址数组

    return await db
      .collection("stall_stall")
      .doc(stallId)
      .update({
        data: {
          title,
          label,
          desc,
          openTime,
          coverImg,
          descImgs,
        }
      })
      .then((res) => res);
  }
};
