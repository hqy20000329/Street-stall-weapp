/**
 * @param {function} success  获取用户信息成功的回调
 * @param {function} fail     获取用户信息失败的回调
 * @param {function} complete 获取用户信息完成后的回调
 */
// const getUserInfo = () => {
//   wx.getUserInfo({
//     withCredentials: "false",
//     lang: "zh_CN",
//     timeout: 10000,
//     success,
//     fail: () => {
//       console.log("用户未授权获取用户信息");
//       fail(); //用户传入的fail
//     },
//     complete,
//   });
// };
const getUserInfo = async () => {
  return await new Promise((resolve, reject) => {
    wx.getUserInfo({
      withCredentials: "false",
      lang: "zh_CN",
      timeout: 10000,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

/**
 * 获取用户位置
 */
const getUserLocation = async () => {
  return await new Promise((resolve, reject) => {
    wx.getLocation({
      type: "wgs84",
      altitude: false,
      isHighAccuracy: true,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

module.exports = {
  getUserInfo,
  getUserLocation,
};
