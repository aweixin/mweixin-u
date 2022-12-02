interface optionsType {
      method: "POST" | "GET" | "OPTIONS" | "HEAD" | "PUT" | "DELETE" | "TRACE" | "CONNECT"
      data: Object
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
                  "content-type": "application/json;charset=utf-8",
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
