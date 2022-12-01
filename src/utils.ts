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
      return new Promise((_resolve) => {
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
/**
 * 设置本地存储
 * @param key
 * @param value
 */
export const setsys = (key: string, value: any) => {
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
      return new Promise((resolve) => {
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
