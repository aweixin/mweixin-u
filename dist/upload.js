"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chooseMessageFile = exports.chooseImage = exports.uploadFile = void 0;
const app = getApp();
function sequenceTasks(tasks) {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    let pushValue = recordValue.bind(null, []);
    let promise = Promise.resolve();
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        promise = promise.then(task).then(pushValue);
    }
    return promise;
}
const uploadFile = (tempFilePaths) => {
    if (!app.uploadFile || app.uploadFile == "") {
        throw new Error(`
缺少上传接口地址
app.ts | app.js 中 APP 中配置
uploadFile:https://www.baidu.com/upload
            `);
    }
    return new Promise((uploadFileresolve) => {
        var imgarr = [];
        wx.showLoading({
            title: "上传中",
        });
        let promiseFuncArr = [];
        for (let i = 0; i < tempFilePaths.length; i++) {
            let promiseTemp = function () {
                return new Promise((resolve, reject) => {
                    var formData = {
                        openid: wx.getStorageSync("openid"),
                    };
                    wx.uploadFile({
                        url: `${app.uploadFile}`,
                        filePath: tempFilePaths[i],
                        name: "img",
                        formData: formData,
                        success: function (res) {
                            resolve(res);
                        },
                        fail: function (error) {
                            console.log(error);
                            reject(error);
                            wx.showToast({
                                title: "上传失败",
                            });
                        },
                        complete: function () {
                            wx.hideLoading();
                        },
                    });
                });
            };
            promiseFuncArr.push(promiseTemp);
        }
        sequenceTasks(promiseFuncArr).then((result) => {
            result.map((v) => {
                if (JSON.parse(v.data).code != 0) {
                    wx.showToast({
                        icon: "none",
                        title: JSON.parse(v.data).msg,
                    });
                }
                else {
                    imgarr.push(JSON.parse(v.data).data.src);
                }
            });
            wx.hideLoading();
            uploadFileresolve(imgarr);
        });
    });
};
exports.uploadFile = uploadFile;
const chooseImage = (num) => {
    return new Promise((_resolve, _reject) => {
        wx.chooseMedia({
            count: num ? num : 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success(res) {
                const tempFilePaths = [];
                res.tempFiles.map((item) => {
                    tempFilePaths.push(item.tempFilePath);
                });
                (0, exports.uploadFile)(tempFilePaths).then((urls) => {
                    _resolve(urls);
                });
            },
        });
    });
};
exports.chooseImage = chooseImage;
const chooseMessageFile = (_count, _type, _extension) => {
    return new Promise((_resolve) => {
        wx.chooseMessageFile({
            count: _count,
            type: _type,
            extension: _extension,
            success(res) {
                const tempFilePaths = [];
                res.tempFiles.map((item) => {
                    tempFilePaths.push(item.path);
                });
                console.log("临时路径：", tempFilePaths);
                (0, exports.uploadFile)(tempFilePaths).then((urls) => {
                    _resolve(urls);
                });
            },
        });
    });
};
exports.chooseMessageFile = chooseMessageFile;
