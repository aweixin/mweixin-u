export var formatTime = function (date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return ([year, month, day].map(formatNumber).join('/') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':'));
};
var formatNumber = function (n) {
    var s = n.toString();
    return s[1] ? s : '0' + s;
};
/**
 * 跳转小程序内部页面
 * @param path （https 跳转网页）
 */
export var gourl = function (path) {
    if (path.includes('https')) { // 网址
        wx.navigateTo({
            url: "/pages/webview/index?url=".concat(encodeURIComponent(path))
        });
    }
    else {
        wx.navigateTo({
            url: path
        });
    }
};
/**
 * 微信小程序rich-text富文本图片自适应处理
 * @param data html内容
 */
export var get_html = function (data) {
    var result = data;
    result = result.replace(/section/gi, 'div');
    result = result.replace(/data-src/gi, 'src');
    result = result.replace(/src="data:/gi, 'data-src="data:');
    result = result.replace(/<img[^>]*>/gi, function (match) {
        var match = match.replace(/style/gi, 'styles');
        return match;
    });
    result = result.replace(/\<img/gi, '<img style="max-width:100%!important;height:auto!important;display:block;" ');
    return result;
};
/**
 * 获取当前点击元素的参数
 * @param e
 */
export var tapinfo = function (e) {
    return e.currentTarget.dataset;
};
/**
 * 获取元素信息 DOM
 * @param obj class | ID
 */
export var getRect = function (obj) {
    return new Promise(function (resolve, reject) {
        wx.createSelectorQuery().select(obj).boundingClientRect(function (rect) {
            if (rect) {
                resolve(rect);
            }
            else {
                reject('error');
            }
        }).exec();
    });
};
// 胶囊按钮与顶部的距离
export var checkFullSucreen = function () {
    var res = wx.getSystemInfoSync();
    wx.setStorage({
        data: res,
        key: 'systemInfo'
    });
    if (wx.getMenuButtonBoundingClientRect()) {
        var menuButtonObject_1 = wx.getMenuButtonBoundingClientRect();
        wx.getSystemInfo({
            success: function (res) {
                var statusBarHeight = res.statusBarHeight, navTop = menuButtonObject_1.top, //胶囊按钮与顶部的距离
                navHeight = statusBarHeight + menuButtonObject_1.height + (menuButtonObject_1.top - statusBarHeight) * 2; //导航高度
                wx.setStorage({
                    data: navHeight,
                    key: 'navHeight'
                });
                wx.setStorage({
                    data: navTop,
                    key: 'navTop'
                });
                wx.setStorage({
                    data: menuButtonObject_1,
                    key: 'menuButtonObject'
                });
            }
        });
    }
};
/**
 * 弹窗提示
 * @param content 弹窗内容
 */
export var alert = function (content) {
    return wx.showModal({
        title: '提示',
        content: content,
        showCancel: false
    });
};
/**
 * 消息提示
 * @param msg 提示内容
 * @param icon success | error
 */
export var msg = function (msg, icon, duration) {
    return new Promise(function (_resolve) {
        wx.showToast({
            title: msg,
            icon: icon ? icon : 'none',
            mask: icon ? true : false,
            duration: duration ? duration : 1500,
            success: function () {
                setTimeout(function () {
                    _resolve(true);
                }, 1500);
            }
        });
    });
};
export var confirm = function (msg, opction) {
    return wx.showModal(Object.assign({
        title: '提示',
        content: msg,
        showCancel: true
    }, opction));
};
/**
 * 获取本地存储
 * @param key
 */
export var getsys = function (key) {
    return wx.getStorageSync(key);
};
/**
 * 设置本地存储
 * @param key
 * @param value
 */
export var setsys = function (key, value) {
    wx.setStorageSync(key, value);
};
/**
 * 删除本地存储
 * @param key
 */
export var delsys = function (key) {
    wx.removeStorageSync(key);
};
/**
 * 需要预览的图片
 * @param current 当前预览的图片
 * @param urls 所有图片
 */
export var previewImage = function (current, urls) {
    wx.previewImage({
        current: current,
        urls: urls
    });
};
/**
* 订阅消息
* @param {*} tmplIds 模板ids
*/
export var requestSubscribeMessage = function (tmplIds) {
    return new Promise(function (resolve) {
        console.log("\u6A21\u677F---------ids:".concat(tmplIds));
        wx.requestSubscribeMessage({
            tmplIds: tmplIds,
            complete: function (res) {
                resolve(res);
            }
        });
    });
};
/**
 * 打开文档
 * @param url
 */
export var openDocument = function (url) {
    wx.downloadFile({
        url: url,
        success: function (res) {
            var filePath = res.tempFilePath;
            wx.openDocument({
                filePath: filePath,
                success: function (res) {
                    console.log('打开文档成功');
                }
            });
        }
    });
};
