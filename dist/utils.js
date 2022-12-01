"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDocument = exports.requestSubscribeMessage = exports.previewImage = exports.delsys = exports.setsys = exports.getsys = exports.confirm = exports.msg = exports.alert = exports.checkFullSucreen = exports.getRect = exports.tapinfo = exports.get_html = exports.gourl = exports.formatTime = void 0;
const formatTime = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
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
const setsys = (key, value) => {
    wx.setStorageSync(key, value);
};
exports.setsys = setsys;
const delsys = (key) => {
    wx.removeStorageSync(key);
};
exports.delsys = delsys;
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
