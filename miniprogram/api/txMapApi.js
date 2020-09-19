const LHN_key = "WJ3BZ-6X4KF-OJTJK-NLMLB-YADLT-X6FHJ";
/**
 * 坐标转换
 * @param {List} locationList 坐标数组[{latitude(纬度):"", longitude(经度):""}]
 * @param {Number} type 1~6
 * @param {String} key 腾讯地图开发者Key
 */
const translate = async (locationList, type=1, key = LHN_key) => {
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
 * 单一逆地址解析
 * @param {*} locationObj {latitude(纬度):"", longitude(经度):""}
 * @param {*} get_poi 0~1
 * @param {*} poi_optionsList 见https://lbs.qq.com/service/webService/webServiceGuide/webServiceGcoder
 * @param {*} key
 */
const geocoder = async (locationObj, get_poi = 0, poi_optionsList = [], key = LHN_key) => {
  const url = "https://apis.map.qq.com/ws/geocoder/v1";
  const location = locationObj.latitude + "," + locationObj.longitude;
  let data = {};
  if (poi_optionsList.length === 0) {
    data = {
      location,
      get_poi,
      key,
    };
  } else {
    let poi_options = [];
    for (let item of poi_optionsList) {
      poi_options.push(item);
      poi_options = poi_options.join(";");
      data = {
        location,
        get_poi,
        poi_options,
        key,
      };
    }
  }

  return await new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method: "GET",
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
 * 矩阵距离计算
 * @param {*} fromObj 起点坐标对象
 * @param {*} toArr 终点坐标对象数组
 * @param {*} mode 方式driving：驾车 walking：步行 bicycling：自行车
 * @param {*} key 
 */
const distanceMatrix = async ( fromObj, toArr, mode = 'walking', key = LHN_key) => {
  const url = "https://apis.map.qq.com/ws/distance/v1/matrix?parameters";
  const from = fromObj.lat + "," + fromObj.lng;
  let data = {};
  let to = [];
  console.log(toArr);
  for (let item of toArr) {
    let tmp = item.lat + "," + item.lng;
    to.push(tmp);
  }
  to = to.join(";");
  data = {
    mode,
    from,
    to,
    key,
  };
  return await new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method: "GET",
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
  translate,
  geocoder,
  distanceMatrix,
};
