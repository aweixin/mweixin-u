"use strict";
/*
 * @Author: Mr.xu
 * @Date: 2022-12-07 16:33:31
 * @LastEditors: Mr.xu
 * @LastEditTime: 2022-12-07 16:54:06
 * @Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = void 0;
const request = (url, options) => {
    return new Promise((resolve, reject) => {
        const app = getApp();
        let header = {
            "content-type": "application/json",
        };
        if (app.setPublic) {
            if (app.setPublic instanceof Array) {
                const keys = app.setPublic;
                for (let index = 0; index < keys.length; index++) {
                    const element = keys[index];
                    options.data[element] = wx.getStorageSync(element);
                }
            }
            else {
                console.warn("setPublic is Array");
            }
        }
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
/**
 * get 请求
 * @param url
 * @param options
 * @param header
 */
const get = (url, options = {}, header = {}) => {
    return request(url, { method: "GET", data: options, header: header });
};
exports.get = get;
/**
 * post 请求
 * @param url
 * @param options
 * @param header
 */
const post = (url, options = {}, header = {}) => {
    return request(url, { method: "POST", data: options, header: header });
};
exports.post = post;
