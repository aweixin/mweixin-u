/*
 * @Author: Mr.xu
 * @Date: 2022-12-07 16:33:31
 * @LastEditors: Mr.xu
 * @LastEditTime: 2022-12-07 16:54:06
 * @Description:
 */
const app = getApp()

interface optionsType {
      method: "POST" | "GET" | "OPTIONS" | "HEAD" | "PUT" | "DELETE" | "TRACE" | "CONNECT"
      data: any
      header?: Object
}

interface returnType {
      code: number
      data: any
      msg: string
      message: string
}

const request = (url: string, options: optionsType) => {
      return new Promise<returnType>((resolve, reject) => {
            let header = {
                  "content-type": "application/json",
            }
            if (app.setPublic) {
                  if (app.setPublic instanceof Array) {
                        const keys = app.setPublic
                        for (let index = 0; index < keys.length; index++) {
                              const element = keys[index]
                              options.data[element] = wx.getStorageSync(element)
                        }
                  } else {
                        console.warn("setPublic is Array")
                  }
            }
            wx.request({
                  url: url,
                  method: options.method,
                  data: options.method === "GET" ? options.data : JSON.stringify(options.data),
                  header: Object.assign(header, options.header),
                  success(request: any) {
                        if (request.statusCode === 200) {
                              resolve(request.data)
                        } else {
                              console.log("请求状态错误：", request.data)
                              reject(request.data)
                        }
                  },
                  fail(error: any) {
                        console.log(error.data)
                        reject(error.data)
                  },
            })
      })
}
/**
 * get 请求
 * @param url
 * @param options
 * @param header
 */
export const get = (url: any, options = {}, header = {}) => {
      return request(url, { method: "GET", data: options, header: header })
}
/**
 * post 请求
 * @param url
 * @param options
 * @param header
 */
export const post = (url: any, options = {}, header = {}) => {
      return request(url, { method: "POST", data: options, header: header })
}
