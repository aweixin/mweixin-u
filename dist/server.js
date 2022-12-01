"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = void 0;
const request = (url, options) => {
    return new Promise((resolve, reject) => {
        let header = {
            "content-type": "application/json;charset=utf-8",
        };
        wx.request({
            url: url,
            method: options.method,
            data: options.method === "GET" ? options.data : JSON.stringify(options.data),
            header: Object.assign(header, options.header),
            success(request) {
                if (request.statusCode === 200) {
                    resolve(request.data);
                }
                else {
                    console.log("请求状态错误：", request.data);
                    reject(request.data);
                }
            },
            fail(error) {
                console.log(error.data);
                reject(error.data);
            },
        });
    });
};
const get = (url, options = {}, header = {}) => {
    return request(url, { method: "GET", data: options, header: header });
};
exports.get = get;
const post = (url, options = {}, header = {}) => {
    return request(url, { method: "POST", data: options, header: header });
};
exports.post = post;
