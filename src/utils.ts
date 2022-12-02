import moment from "moment"

export const formatTime = (date: string) => {
      const current_date = new Date(date.replace(/-/g, "/"))
      const year = current_date.getFullYear()
      const month = current_date.getMonth() + 1
      const day = current_date.getDate()
      const hour = current_date.getHours()
      const minute = current_date.getMinutes()
      const second = current_date.getSeconds()

      return [year, month, day].map(formatNumber).join("/") + " " + [hour, minute, second].map(formatNumber).join(":")
}

const formatNumber = (n: number) => {
      const s = n.toString()
      return s[1] ? s : "0" + s
}

/**
 * 跳转小程序内部页面
 * @param path （https 跳转网页）
 */
export const gourl = (path: string) => {
      if (path.includes("https")) {
            // 网址
            wx.navigateTo({
                  url: `/pages/webview/index?url=${encodeURIComponent(path)}`,
            })
      } else {
            wx.navigateTo({
                  url: path,
            })
      }
}

/**
 * 微信小程序rich-text富文本图片自适应处理
 * @param data html内容
 */
export const get_html = (data: any) => {
      var result = data
      result = result.replace(/section/gi, "div")
      result = result.replace(/data-src/gi, "src")
      result = result.replace(/src="data:/gi, 'data-src="data:')
      result = result.replace(/<img[^>]*>/gi, function (match: any) {
            var match = match.replace(/style/gi, "styles")
            return match
      })
      result = result.replace(/\<img/gi, '<img style="max-width:100%!important;height:auto!important;display:block;" ')
      return result
}
/**
 * 获取当前点击元素的参数
 * @param e
 */
export const tapinfo = (e: any) => {
      return e.currentTarget.dataset
}

/**
 * 获取元素信息 DOM
 * @param obj class | ID
 */
export const getRect = (obj: string) => {
      return new Promise((resolve, reject) => {
            wx.createSelectorQuery()
                  .select(obj)
                  .boundingClientRect((rect) => {
                        if (rect) {
                              resolve(rect)
                        } else {
                              reject("error")
                        }
                  })
                  .exec()
      })
}

// 胶囊按钮与顶部的距离
export const checkFullSucreen = () => {
      const res = wx.getSystemInfoSync()
      wx.setStorage({
            data: res,
            key: "systemInfo",
      })

      if (wx.getMenuButtonBoundingClientRect()) {
            let menuButtonObject = wx.getMenuButtonBoundingClientRect()
            wx.getSystemInfo({
                  success: (res) => {
                        let statusBarHeight = res.statusBarHeight,
                              navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
                              navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2 //导航高度
                        wx.setStorage({
                              data: navHeight,
                              key: "navHeight",
                        })
                        wx.setStorage({
                              data: navTop,
                              key: "navTop",
                        })
                        wx.setStorage({
                              data: menuButtonObject,
                              key: "menuButtonObject",
                        })
                  },
            })
      }
}

/**
 * 弹窗提示
 * @param content 弹窗内容
 */
export const alert = (content: string) => {
      return wx.showModal({
            title: "提示",
            content: content,
            showCancel: false,
      })
}
/**
 * 消息提示
 * @param msg 提示内容
 * @param icon success | error
 */
export const msg = (msg: string, icon?: "success" | "error", duration?: number) => {
      return new Promise<boolean>((_resolve) => {
            if (msg.length > 7) {
                  icon = undefined
            }

            wx.showToast({
                  title: msg,
                  icon: icon ? icon : "none",
                  mask: icon ? true : false,
                  duration: duration ? duration : 1500,
                  success: () => {
                        setTimeout(() => {
                              _resolve(true)
                        }, 1500)
                  },
            })
      })
}

interface opctionType {
      showCancel?: boolean
      cancelText?: string
      cancelColor?: string
      confirmText?: string
      confirmColor?: string
}

export const confirm = (msg: string, opction?: opctionType) => {
      return wx.showModal(
            Object.assign(
                  {
                        title: "提示",
                        content: msg,
                        showCancel: true,
                  },
                  opction
            )
      )
}

/**
 * 获取本地存储
 * @param key
 */
export const getsys = (key: string) => {
      return wx.getStorageSync(key)
}

interface expireDateType {
      key: "years" | "quarters" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds"
      value: number
}
/**
 *设置本地存储
 * @param {string} key
 * @param {*} value
 * @param {expireDateType} [expireDate]   过期时间 {key:days,value:1} 获取时间1天
 */
export const setsys = (key: string, value: any, expireDate?: expireDateType) => {
      if (expireDate) {
            let date = moment().add(expireDate.value, expireDate.key).format("YYYY-MM-DD HH:mm:ss")
            wx.setStorageSync(key + "_expire", date)
      }
      wx.setStorageSync(key, value)
}
/**
 * 删除本地存储
 * @param key
 */
export const delsys = (key: string) => {
      wx.removeStorageSync(key)
}
/**
 *删除已过期的数据
 * @param {string} key
 */
export const delsys_expire = (key: string) => {
      let data = getsys(key + "_expire")
      if (moment(data).isBefore(moment())) {
            delsys(key)
            delsys(key + "_expire")
      }
}

/**
 * 需要预览的图片
 * @param current 当前预览的图片
 * @param urls 所有图片
 */
export const previewImage = (current: string, urls: string[]) => {
      wx.previewImage({
            current: current, // 当前显示图片的 http 链接
            urls: urls, // 需要预览的图片 http 链接列表
      })
}

/**
 * 订阅消息
 * @param {*} tmplIds 模板ids
 */
export const requestSubscribeMessage = (tmplIds: string[]) => {
      return new Promise<any>((resolve) => {
            console.log(`模板---------ids:${tmplIds}`)
            wx.requestSubscribeMessage({
                  tmplIds: tmplIds,
                  complete(res) {
                        resolve(res)
                  },
            })
      })
}

/**
 * 打开文档
 * @param url
 */
export const openDocument = (url: string) => {
      wx.downloadFile({
            url: url,
            success: function (res) {
                  const filePath = res.tempFilePath
                  wx.openDocument({
                        filePath: filePath,
                        success: function (res) {
                              console.log("打开文档成功")
                        },
                  })
            },
      })
}

/**
 * 检测当前的小程序
 * 版本自动更新
 */
export const checkUpdateVersion = () => {
      console.log("checkUpdateVersion")
      //判断微信版本是否 兼容小程序更新机制API的使用
      if (wx.canIUse("getUpdateManager")) {
            //创建 UpdateManager 实例
            const updateManager = wx.getUpdateManager()
            //检测版本更新
            updateManager.onCheckForUpdate(function (res) {
                  // 请求完新版本信息的回调
                  if (res.hasUpdate) {
                        //监听小程序有版本更新事件
                        updateManager.onUpdateReady(function () {
                              //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
                              updateManager.applyUpdate()
                        })
                        updateManager.onUpdateFailed(function () {
                              // 新版本下载失败
                              wx.showModal({
                                    title: "已经有新版本喽~",
                                    content: "请您删除当前小程序，重新搜索打开哦~",
                              })
                        })
                  }
            })
      } else {
            //TODO 此时微信版本太低（一般而言版本都是支持的）
            wx.showModal({
                  title: "溫馨提示",
                  content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
            })
      }
}
/**
 *对象转URL
 */
export const urlEncode = (data: object = {}) => {
      var _result = []
      for (var key in data) {
            var value = data[key]
            if (value.constructor == Array) {
                  value.forEach(function (_value) {
                        _result.push(key + "=" + _value)
                  })
            } else {
                  _result.push(key + "=" + value)
            }
      }
      return _result.join("&")
}

/**
 * 复制内容
 * @param {*} data 复制数据
 * @param {*} title  提示内容
 */
export const setClipboardData = (data: string, title?: string) => {
      wx.setClipboardData({
            data: data,
            success() {
                  msg(title || "复制成功", "success")
            },
      })
}
