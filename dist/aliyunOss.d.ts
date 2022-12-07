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
 * @param path 文件分类 face
 * @param  fileName 后台接收的字段
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
export declare const aliyunOss: (filePath: string, fileName: string | undefined, OssAuthInfo: ossAuthInfoType) => Promise<string>;
export {};
