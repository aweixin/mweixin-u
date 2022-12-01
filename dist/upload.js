import { config } from "./config";
function sequenceTasks(tasks) {
    //图片上传-顺序处理函数
    //记录返回值
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    var pushValue = recordValue.bind(null, []);
    var promise = Promise.resolve();
    // 处理tasks数组中的每个函数对象
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        promise = promise.then(task).then(pushValue);
    }
    return promise;
}
/**
 * 上传图片
 * @param tempFilePaths 本地临时路径 []
 */
export var uploadFile = function (tempFilePaths) {
    return new Promise(function (uploadFileresolve) {
        var imgarr = []; //上传保存图片路径
        wx.showLoading({
            title: "上传中"
        });
        //函数数组，每个函数的返回值是一个promise对象
        var promiseFuncArr = [];
        var _loop_1 = function (i) {
            var promiseTemp = function () {
                return new Promise(function (resolve, reject) {
                    //微信图片上传
                    var formData = {
                        openid: wx.getStorageSync("openid")
                    };
                    // console.log(formData);
                    wx.uploadFile({
                        url: "".concat(config.uploadFile),
                        filePath: tempFilePaths[i],
                        name: "img",
                        formData: formData,
                        success: function (res) {
                            //可以对res进行处理，然后resolve返回
                            // console.log(res);
                            resolve(res);
                        },
                        fail: function (error) {
                            console.log(error);
                            reject(error);
                            wx.showToast({
                                title: "上传失败"
                            });
                        },
                        complete: function () {
                            wx.hideLoading();
                        }
                    });
                });
            };
            promiseFuncArr.push(promiseTemp);
        };
        //图片地址数组
        //将图片地址的上传的函数加入到promiseFuncArr数组中
        for (var i = 0; i < tempFilePaths.length; i++) {
            _loop_1(i);
        }
        sequenceTasks(promiseFuncArr).then(function (result) {
            // console.log(result)
            result.map(function (v) {
                if (JSON.parse(v.data).code != 0) {
                    /**
                     * 上传错误提示
                     */
                    wx.showToast({
                        icon: "none",
                        title: JSON.parse(v.data).msg
                    });
                }
                else {
                    imgarr.push(JSON.parse(v.data).data.src);
                }
            });
            wx.hideLoading();
            // success && success(imgarr)
            uploadFileresolve(imgarr);
            //对返回的result数组进行处理
        });
    });
};
export var chooseImage = function (num) {
    return new Promise(function (_resolve, _reject) {
        wx.chooseMedia({
            count: num ? num : 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function (res) {
                var tempFilePaths = [];
                res.tempFiles.map(function (item) {
                    tempFilePaths.push(item.tempFilePath);
                });
                // console.log('临时路径：', tempFilePaths);
                uploadFile(tempFilePaths).then(function (urls) {
                    // console.log('请求结束', urls);
                    _resolve(urls);
                });
            }
        });
    });
};
export var chooseMessageFile = function (_count, _type, _extension) {
    return new Promise(function (_resolve) {
        wx.chooseMessageFile({
            count: _count,
            type: _type,
            extension: _extension,
            success: function (res) {
                var tempFilePaths = [];
                res.tempFiles.map(function (item) {
                    tempFilePaths.push(item.path);
                });
                console.log('临时路径：', tempFilePaths);
                uploadFile(tempFilePaths).then(function (urls) {
                    // console.log('请求结束', urls);
                    _resolve(urls);
                });
            }
        });
    });
};
