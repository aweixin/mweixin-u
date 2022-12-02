"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliyunOss = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const js_base64_1 = require("js-base64");
// 计算签名。
const computeSignature = (accessKeySecret, canonicalString) => {
    return crypto_js_1.default.enc.Base64.stringify(crypto_js_1.default.HmacSHA1(canonicalString, accessKeySecret));
};
/**
 * aliyunOss 阿里云oss
 * @param filePath 文件路径
 * @param {ossAuthInfoType} OssAuthInfo
 * 示例：
 * ```
     async aliyunOss(filePath: any, path: string) {
        Utils.delsys_expire('aliyunoss_' + path)
        let aliyunoss_config = Utils.getsys('aliyunoss_' + path);
        if (!aliyunoss_config) {
            const { data } = await Server.post('http://192.168.199.218:10201/open/v1/file/getOssAuthInfo', {
                path: path
            });
            aliyunoss_config = data;
            Utils.setsys('aliyunoss_' + path, data, { key: 'seconds', value: aliyunoss_config.durationSeconds });
        }

        aliyunOss(filePath, aliyunoss_config);
      }

      //////////////////////////////////////////////////////////////////////////////////////
      aliyunOss(filePath,{
            accessKeyId: string
            accessKeySecret: string
            bucket?: string
            endpoint: string
            filePath: string
            host: string
            region: string
            stsToken: string
      })
 * ```
 */
const aliyunOss = (filePath, OssAuthInfo) => {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    const policyText = {
        expiration: date.toISOString(),
        conditions: [
            // 限制上传大小。
            ["content-length-range", 0, 1024 * 1024 * 1024],
        ],
    };
    const policy = js_base64_1.Base64.encode(JSON.stringify(policyText)); // policy必须为base64的string。
    const signature = computeSignature(OssAuthInfo.accessKeySecret, policy);
    const formData = {
        key: OssAuthInfo.filePath + filePath.split("/").reverse()[0],
        OSSAccessKeyId: OssAuthInfo.accessKeyId,
        signature,
        policy,
        "x-oss-security-token": OssAuthInfo.stsToken,
    };
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: OssAuthInfo.host,
            filePath: filePath,
            header: {},
            name: "file",
            formData: formData,
            success: (res) => {
                // console.log(res);
                if (res.statusCode === 204) {
                    console.log("上传成功", `${OssAuthInfo.endpoint}/${formData.key}`);
                    resolve(`${OssAuthInfo.endpoint}/${formData.key}`);
                }
            },
        });
    });
};
exports.aliyunOss = aliyunOss;
