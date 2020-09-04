// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
<<<<<<< HEAD
  // return await db.collection("stall_visit").add({
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
=======
  let openid = wxContext.OPENID
  return await db.collection("stall_user").where({
      userId:openid
  }).get().then(res => res)
>>>>>>> 94c1f27c7037bc313836d4527a5a1240c990cab4
}

