const LHN_key = "WJ3BZ-6X4KF-OJTJK-NLMLB-YADLT-X6FHJ";
/**
 * @param {List} locationList 坐标数组[{latitude(纬度):"", longitude(经度):""}]
 * @param {Number} type 1~6
 * @param {String} key 腾讯地图开发者Key
 */
const translate = async (locationList, type, key = LHN_key) => {
  // 腾讯地图API
  const url = "https://apis.map.qq.com/ws/coord/v1/translate";

  // 处理经纬度坐标数组参数
  let locations = [];
  for (let item of locationList) {
    if (!item.latitude || !item.longitude) {
      throw new Error("经纬度不能为空");
    } else {
      const location = item.latitude + "," + item.longitude;
      locations.push(location);
    }
  }
  locations = locations.join(";");
  return await new Promise((resolve, reject) => {
    wx.request({
      url,
      data: {
        locations,
        type,
        key,
      },
      method: "GET",
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      },
    });
  });
};

module.exports = {
  translate,
};
