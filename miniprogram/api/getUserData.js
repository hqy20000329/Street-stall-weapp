/**
 * 获取用户信息
 */
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
