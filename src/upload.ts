const app = getApp()
function sequenceTasks(tasks: any[]) {
      //图片上传-顺序处理函数
      //记录返回值
      function recordValue(results: any, value: any) {
            results.push(value)
            return results
      }
      let pushValue = recordValue.bind(null, [])
      let promise = Promise.resolve()
      // 处理tasks数组中的每个函数对象
      for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i]
            promise = promise.then(task).then(pushValue)
      }
      return promise
}
/**
 * 上传图片
 * @param tempFilePaths 本地临时路径 []
 */
export const uploadFile = (tempFilePaths: any) => {
      if (!app.uploadFile || app.uploadFile == "") {
            throw new Error(`
缺少上传接口地址
app.ts | app.js 中 APP 中配置
uploadFile:https://www.baidu.com/upload
            `)
      }

      return new Promise((uploadFileresolve) => {
            var imgarr: string[] = [] //上传保存图片路径
            wx.showLoading({
                  title: "上传中",
            })
            //函数数组，每个函数的返回值是一个promise对象
            let promiseFuncArr = []
            //图片地址数组
            //将图片地址的上传的函数加入到promiseFuncArr数组中
            for (let i = 0; i < tempFilePaths.length; i++) {
                  let promiseTemp = function () {
                        return new Promise((resolve, reject) => {
                              //微信图片上传
                              var formData = {
                                    openid: wx.getStorageSync("openid"),
                              }
                              // console.log(formData);
                              wx.uploadFile({
                                    url: `${app.uploadFile}`,
                                    filePath: tempFilePaths[i],
                                    name: "img",
                                    formData: formData,
                                    success: function (res) {
                                          //可以对res进行处理，然后resolve返回
                                          // console.log(res);
                                          resolve(res)
                                    },
                                    fail: function (error) {
                                          console.log(error)
                                          reject(error)
                                          wx.showToast({
                                                title: "上传失败",
                                          })
                                    },
                                    complete: function () {
                                          wx.hideLoading()
                                    },
                              })
                        })
                  }
                  promiseFuncArr.push(promiseTemp)
            }

            sequenceTasks(promiseFuncArr).then((result: any) => {
                  // console.log(result)
                  result.map((v: any) => {
                        if (JSON.parse(v.data).code != 0) {
                              /**
                               * 上传错误提示
                               */
                              wx.showToast({
                                    icon: "none",
                                    title: JSON.parse(v.data).msg,
                              })
                        } else {
                              imgarr.push(JSON.parse(v.data).data.src)
                        }
                  })
                  wx.hideLoading()
                  // success && success(imgarr)
                  uploadFileresolve(imgarr)
                  //对返回的result数组进行处理
            })
      })
}

export const chooseImage = (num?: number) => {
      return new Promise((_resolve, _reject) => {
            wx.chooseMedia({
                  count: num ? num : 1,
                  sizeType: ["original", "compressed"],
                  sourceType: ["album", "camera"],
                  success(res: any) {
                        const tempFilePaths: string[] = []
                        res.tempFiles.map((item: any) => {
                              tempFilePaths.push(item.tempFilePath)
                        })
                        // console.log('临时路径：', tempFilePaths);
                        uploadFile(tempFilePaths).then((urls: any) => {
                              // console.log('请求结束', urls);
                              _resolve(urls)
                        })
                  },
            })
      })
}

export const chooseMessageFile = (_count: number, _type?: "all" | "video" | "image" | "file" | undefined, _extension?: string[]) => {
      return new Promise((_resolve) => {
            wx.chooseMessageFile({
                  count: _count,
                  type: _type,
                  extension: _extension,
                  success(res) {
                        const tempFilePaths: string[] = []
                        res.tempFiles.map((item: any) => {
                              tempFilePaths.push(item.path)
                        })
                        console.log("临时路径：", tempFilePaths)
                        uploadFile(tempFilePaths).then((urls: any) => {
                              // console.log('请求结束', urls);
                              _resolve(urls)
                        })
                  },
            })
      })
}
