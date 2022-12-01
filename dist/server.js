var request = function (url, options) {
    return new Promise(function (resolve, reject) {
        var header = {
            "content-type": "application/json;charset=utf-8"
        };
        wx.request({
            url: url,
            method: options.method,
            data: options.method === "GET" ? options.data : JSON.stringify(options.data),
            header: Object.assign(header, options.header),
            success: function (request) {
                if (request.statusCode === 200) {
                    resolve(request.data);
                }
                else {
                    console.log("请求状态错误：", request.data);
                    reject(request.data);
                }
            },
            fail: function (error) {
                console.log(error.data);
                reject(error.data);
            }
        });
    });
};
/**
 * get 请求
 * @param url
 * @param options
 * @param header
 */
var get = function (url, options, header) {
    if (options === void 0) { options = {}; }
    if (header === void 0) { header = {}; }
    return request(url, { method: "GET", data: options, header: header });
};
/**
 * post 请求
 * @param url
 * @param options
 * @param header
 */
var post = function (url, options, header) {
    if (options === void 0) { options = {}; }
    if (header === void 0) { header = {}; }
    return request(url, { method: "POST", data: options, header: header });
};
export { get, post };
