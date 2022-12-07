"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliyunOss = exports.Utils = exports.Server = exports.Upload = void 0;
/*
 * @Author: Mr.xu
 * @Date: 2022-12-01 14:36:24
 * @LastEditors: Mr.xu
 * @LastEditTime: 2022-12-01 14:44:52
 * @Description:微信工具类
 */
// 请求类
const Server = __importStar(require("./server"));
exports.Server = Server;
// 工具类
const Utils = __importStar(require("./utils"));
exports.Utils = Utils;
// 上传类
const Upload = __importStar(require("./upload"));
exports.Upload = Upload;
// 阿里云oss
const aliyunOss_1 = require("./aliyunOss");
Object.defineProperty(exports, "aliyunOss", { enumerable: true, get: function () { return aliyunOss_1.aliyunOss; } });
console.warn("使用上传类，请注意上传接口配置");
