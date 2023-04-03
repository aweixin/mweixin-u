"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeURI = exports.setClipboardData = exports.urlEncode = exports.checkUpdateVersion = exports.openDocument = exports.requestSubscribeMessage = exports.previewImage = exports.delsys_expire = exports.delsys = exports.setsys = exports.getsys = exports.confirm = exports.msg = exports.alert = exports.checkFullSucreen = exports.getRect = exports.tapinfo = exports.get_html = exports.gourl = exports.formatTime = void 0;
const moment_1 = __importDefault(require("moment"));
const formatTime = (date) => {
    const current_date = new Date(date.replace(/-/g, "/"));
    const year = current_date.getFullYear();
    const month = current_date.getMonth() + 1;
    const day = current_date.getDate();
    const hour = current_date.getHours();
    const minute = current_date.getMinutes();
    const second = current_date.getSeconds();
    return [year, month, day].map(formatNumber).join("/") + " " + [hour, minute, second].map(formatNumber).join(":");
};
exports.formatTime = formatTime;
const formatNumber = (n) => {
    const s = n.toString();
    return s[1] ? s : "0" + s;
};
/**
 * 跳转小程序内部页面
 * @param path （https 跳转网页）
 */
const gourl = (path) => {
    if (path.includes("https")) {
        // 网址
        wx.navigateTo({
            url: `/pages/webview/index?url=${encodeURIComponent(path)}`,
        }).catch((error) => {
            console.log(error);
        });
    }
    else {
        wx.navigateTo({
            url: path,
        }).catch((error) => {
            console.log(error);
        });
    }
};
exports.gourl = gourl;
/**
 * 微信小程序rich-text富文本图片自适应处理
 * @param data html内容
 */
const get_html = (data) => {
    var result = data;
    result = result.replace(/section/gi, "div");
    result = result.replace(/data-src/gi, "src");
    result = result.replace(/src="data:/gi, 'data-src="data:');
    result = result.replace(/<img[^>]*>/gi, function (match) {
        var match = match.replace(/style/gi, "styles");
        return match;
    });
    result = result.replace(/\<img/gi, '<img style="max-width:100%!important;height:auto!important;display:block;" ');
    return result;
};
exports.get_html = get_html;
/**
 * 获取当前点击元素的参数
 * @param e
 */
const tapinfo = (e) => {
    return e.currentTarget.dataset;
};
exports.tapinfo = tapinfo;
/**
 * 获取元素信息 DOM
 * @param obj class | ID
 */
const getRect = (obj) => {
    return new Promise((resolve, reject) => {
        wx.createSelectorQuery()
            .select(obj)
            .boundingClientRect((rect) => {
            if (rect) {
                resolve(rect);
            }
            else {
                reject("error");
            }
        })
            .exec();
    });
};
exports.getRect = getRect;
// 胶囊按钮与顶部的距离
const checkFullSucreen = () => {
    const res = wx.getSystemInfoSync();
    wx.setStorage({
        data: res,
        key: "systemInfo",
    });
    if (wx.getMenuButtonBoundingClientRect()) {
        let menuButtonObject = wx.getMenuButtonBoundingClientRect();
        wx.getSystemInfo({
            success: (res) => {
                let statusBarHeight = res.statusBarHeight, navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
                navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
                wx.setStorage({
                    data: navHeight,
                    key: "navHeight",
                });
                wx.setStorage({
                    data: navTop,
                    key: "navTop",
                });
                wx.setStorage({
                    data: menuButtonObject,
                    key: "menuButtonObject",
                });
            },
        });
    }
};
exports.checkFullSucreen = checkFullSucreen;
/**
 * 弹窗提示
 * @param content 弹窗内容
 */
const alert = (content) => {
    return wx.showModal({
        title: "提示",
        content: content,
        showCancel: false,
    });
};
exports.alert = alert;
/**
 * 消息提示
 * @param msg 提示内容
 * @param icon success | error
 */
const msg = (msg, icon, duration) => {
    return new Promise((_resolve) => {
        if (msg.length > 7) {
            icon = undefined;
        }
        wx.showToast({
            title: msg,
            icon: icon ? icon : "none",
            mask: icon ? true : false,
            duration: duration ? duration : 1500,
            success: () => {
                setTimeout(() => {
                    _resolve(true);
                }, 1500);
            },
        });
    });
};
exports.msg = msg;
const confirm = (msg, opction) => {
    return wx.showModal(Object.assign({
        title: "提示",
        content: msg,
        showCancel: true,
    }, opction));
};
exports.confirm = confirm;
/**
 * 获取本地存储
 * @param key
 */
const getsys = (key) => {
    return wx.getStorageSync(key);
};
exports.getsys = getsys;
/**
 *设置本地存储
 * @param {string} key
 * @param {*} value
 * @param {expireDateType} [expireDate]   过期时间 {key:days,value:1} 获取时间1天
 */
const setsys = (key, value, expireDate) => {
    if (expireDate) {
        let date = (0, moment_1.default)().add(expireDate.value, expireDate.key).format("YYYY-MM-DD HH:mm:ss");
        wx.setStorageSync(key + "_expire", date);
    }
    wx.setStorageSync(key, value);
};
exports.setsys = setsys;
/**
 * 删除本地存储
 * @param key
 */
const delsys = (key) => {
    wx.removeStorageSync(key);
};
exports.delsys = delsys;
/**
 *删除已过期的数据
 * @param {string} key
 */
const delsys_expire = (key) => {
    let data = (0, exports.getsys)(key + "_expire");
    if ((0, moment_1.default)(data).isBefore((0, moment_1.default)())) {
        (0, exports.delsys)(key);
        (0, exports.delsys)(key + "_expire");
    }
};
exports.delsys_expire = delsys_expire;
/**
 * 需要预览的图片
 * @param current 当前预览的图片
 * @param urls 所有图片
 */
const previewImage = (current, urls) => {
    wx.previewImage({
        current: current,
        urls: urls, // 需要预览的图片 http 链接列表
    });
};
exports.previewImage = previewImage;
/**
 * 订阅消息
 * @param {*} tmplIds 模板ids
 */
const requestSubscribeMessage = (tmplIds) => {
    return new Promise((resolve) => {
        console.log(`模板---------ids:${tmplIds}`);
        wx.requestSubscribeMessage({
            tmplIds: tmplIds,
            complete(res) {
                resolve(res);
            },
        });
    });
};
exports.requestSubscribeMessage = requestSubscribeMessage;
/**
 * 打开文档
 * @param url
 */
const openDocument = (url) => {
    wx.downloadFile({
        url: url,
        success: function (res) {
            const filePath = res.tempFilePath;
            wx.openDocument({
                filePath: filePath,
                success: function (res) {
                    console.log("打开文档成功");
                },
            });
        },
    });
};
exports.openDocument = openDocument;
/**
 * 检测当前的小程序
 * 版本自动更新
 */
const checkUpdateVersion = () => {
    console.log("checkUpdateVersion");
    //判断微信版本是否 兼容小程序更新机制API的使用
    if (wx.canIUse("getUpdateManager")) {
        //创建 UpdateManager 实例
        const updateManager = wx.getUpdateManager();
        //检测版本更新
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            if (res.hasUpdate) {
                //监听小程序有版本更新事件
                updateManager.onUpdateReady(function () {
                    //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
                    updateManager.applyUpdate();
                });
                updateManager.onUpdateFailed(function () {
                    // 新版本下载失败
                    wx.showModal({
                        title: "已经有新版本喽~",
                        content: "请您删除当前小程序，重新搜索打开哦~",
                    });
                });
            }
        });
    }
    else {
        //TODO 此时微信版本太低（一般而言版本都是支持的）
        wx.showModal({
            title: "溫馨提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
        });
    }
};
exports.checkUpdateVersion = checkUpdateVersion;
/**
 *对象转URL
 */
const urlEncode = (data = {}) => {
    var _result = [];
    for (var key in data) {
        var value = data[key];
        if (value.constructor == Array) {
            value.forEach(function (_value) {
                _result.push(key + "=" + _value);
            });
        }
        else {
            _result.push(key + "=" + value);
        }
    }
    return _result.join("&");
};
exports.urlEncode = urlEncode;
/**
 * 复制内容
 * @param {*} data 复制数据
 * @param {*} title  提示内容
 */
const setClipboardData = (data, title) => {
    wx.setClipboardData({
        data: data,
        success() {
            (0, exports.msg)(title || "复制成功", "success");
        },
    });
};
exports.setClipboardData = setClipboardData;
/**
 * URL 解码
 * @param {string} url encodeURIComponent 编码后的URL
 * @return {*}  返回解码后的URL
 */
const decodeURI = (url) => {
    return decodeURIComponent(url);
};
exports.decodeURI = decodeURI;
