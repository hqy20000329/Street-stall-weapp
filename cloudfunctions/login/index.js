// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')
const env = "writebefore-ifk65"
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database({env})
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection("stall_visit").add({
    data:{
      visitId:wxContext.OPENID
    }
  })
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
}

