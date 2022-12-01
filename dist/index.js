/*
 * @Author: Mr.xu
 * @Date: 2022-12-01 14:36:24
 * @LastEditors: Mr.xu
 * @LastEditTime: 2022-12-01 14:44:52
 * @Description:微信工具类
 */
/**
 * 获取本地存储
 * @param {string} key
 * @return {*}
 */
var getsys = function (key) {
    return key;
};
/**
 *设置本地存储
 * @param {string} key
 * @param {*} value
 */
var setsys = function (key, value) {
    window.localStorage.setItem(key, value);
};
export { setsys, getsys };
