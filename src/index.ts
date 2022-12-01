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
const getsys = (key: string) => {
      return key
}
/**
 *设置本地存储
 * @param {string} key
 * @param {*} value
 */
const setsys = (key: string, value: any) => {
      window.localStorage.setItem(key, value)
}

export { setsys, getsys }
