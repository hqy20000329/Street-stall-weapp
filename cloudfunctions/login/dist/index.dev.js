"use strict";

// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”
var cloud = require('wx-server-sdk');

var env = "writebefore-ifk65";
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
var db = cloud.database({
  env: env
});

exports.main = function _callee(event, context) {
  var wxContext;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          wxContext = cloud.getWXContext(); // return await db.collection("stall_visit").add({
          //   data:{
          //     visitId:wxContext.OPENID
          //   }
          // })
          // console.log(event)
          // console.log(context)
          // const wxContext = cloud.getWXContext()
          // return {
          //   event,
          //   openid: wxContext.OPENID,
          //   appid: wxContext.APPID,
          //   unionid: wxContext.UNIONID,
          //   env: wxContext.ENV,
          // }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};