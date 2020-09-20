// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID; // 游客的id
  const assessList = event.assessList; // 评价列表id
  const operate = event.operate; // 是否首次加载

  const tasks = [];
  const _db = db.collection("stall_assess");
  assessList.forEach((assessId) => {
    const promise = new Promise((resolve, reject) => {
      _db
        .doc(assessId)
        .get()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
    tasks.push(promise);
  });
  return await Promise.all(tasks)
    .then((res) => {
      let result = res;
      result.sort((a, b) => {
       return b.data.createTime - a.data.createTime;
      });
      if (result.length <= 3 || operate === "more") {
        return result;
      } else if (operate === "first") {
        return result.slice(0, 3);
      }
    })
    .catch((err) => err);
};
