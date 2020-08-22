/**
 * @param {function} success  获取用户信息成功的回调
 * @param {function} fail     获取用户信息失败的回调
 * @param {function} complete 获取用户信息完成后的回调
 */
const getUserInfo = (success, fail = () => {}, complete = () => {}) => {
  wx.getUserInfo({
    withCredentials: "false",
    lang: "zh_CN",
    timeout: 10000,
    success,
    fail:()=>{
        console.log("用户未授权获取用户信息");
        fail();//用户传入的fail
    },
    complete,
  });
};

/**
 * 
 * @param {function} success  获取用户定位成功的回调
 * @param {function} fail     获取用户定位失败的回调 
 * @param {function} complete 获取用户定位完成的回调
 */
const getUserLocation = async (success, fail = ()=>{}, complete = () => {}) => {
   wx.getLocation({
    type: 'wgs84',
    altitude: false,
    isHighAccuracy: true,
    success,
    fail: (err)=>{
      console.log("用户可能未授权获取地理位置");
    },
    complete: ()=>{}
  });
}
module.exports = {
  getUserInfo,
  getUserLocation
};
