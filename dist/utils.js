"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setClipboardData = exports.urlEncode = exports.checkUpdateVersion = exports.openDocument = exports.requestSubscribeMessage = exports.previewImage = exports.delsys_expire = exports.delsys = exports.setsys = exports.getsys = exports.confirm = exports.msg = exports.alert = exports.checkFullSucreen = exports.getRect = exports.tapinfo = exports.get_html = exports.gourl = exports.formatTime = void 0;
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
const gourl = (path) => {
    if (path.includes("https")) {
        wx.navigateTo({
            url: `/pages/webview/index?url=${encodeURIComponent(path)}`,
        });
    }
    else {
        wx.navigateTo({
            url: path,
        });
    }
};
exports.gourl = gourl;
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
const tapinfo = (e) => {
    return e.currentTarget.dataset;
};
exports.tapinfo = tapinfo;
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
                let statusBarHeight = res.statusBarHeight, navTop = menuButtonObject.top, navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
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
const alert = (content) => {
    return wx.showModal({
        title: "提示",
        content: content,
        showCancel: false,
    });
};
exports.alert = alert;
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
const getsys = (key) => {
    return wx.getStorageSync(key);
};
exports.getsys = getsys;
const setsys = (key, value, expireDate) => {
    if (expireDate) {
        let date = (0, moment_1.default)().add(expireDate.value, expireDate.key).format("YYYY-MM-DD HH:mm:ss");
        wx.setStorageSync(key + "_expire", date);
    }
    wx.setStorageSync(key, value);
};
exports.setsys = setsys;
const delsys = (key) => {
    wx.removeStorageSync(key);
};
exports.delsys = delsys;
const delsys_expire = (key) => {
    let data = (0, exports.getsys)(key + "_expire");
    if ((0, moment_1.default)(data).isBefore((0, moment_1.default)())) {
        (0, exports.delsys)(key);
        (0, exports.delsys)(key + "_expire");
    }
};
exports.delsys_expire = delsys_expire;
const previewImage = (current, urls) => {
    wx.previewImage({
        current: current,
        urls: urls,
    });
};
exports.previewImage = previewImage;
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
const checkUpdateVersion = () => {
    console.log("checkUpdateVersion");
    if (wx.canIUse("getUpdateManager")) {
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            if (res.hasUpdate) {
                updateManager.onUpdateReady(function () {
                    updateManager.applyUpdate();
                });
                updateManager.onUpdateFailed(function () {
                    wx.showModal({
                        title: "已经有新版本喽~",
                        content: "请您删除当前小程序，重新搜索打开哦~",
                    });
                });
            }
        });
    }
    else {
        wx.showModal({
            title: "溫馨提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
        });
    }
};
exports.checkUpdateVersion = checkUpdateVersion;
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
const setClipboardData = (data, title) => {
    wx.setClipboardData({
        data: data,
        success() {
            (0, exports.msg)(title || "复制成功", "success");
        },
    });
};
exports.setClipboardData = setClipboardData;
