/**
 * 获取本地存储
 * @param {string} key
 * @return {*}
 */
declare const getsys: (key: string) => string;
/**
 *设置本地存储
 * @param {string} key
 * @param {*} value
 */
declare const setsys: (key: string, value: any) => void;
export { setsys, getsys };
