interface ossAuthInfoType {
    accessKeyId: string;
    accessKeySecret: string;
    bucket?: string;
    endpoint: string;
    filePath: string;
    host: string;
    region: string;
    stsToken: string;
}
/**
 * aliyunOss 阿里云oss
 * @param filePath 文件路径
 * @param {ossAuthInfoType} OssAuthInfo
 * 示例：
 * ```
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
export declare const aliyunOss: (filePath: string, OssAuthInfo: ossAuthInfoType) => Promise<string>;
export {};
