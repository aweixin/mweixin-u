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
export declare const aliyunOss: (filePath: string, OssAuthInfo: ossAuthInfoType) => Promise<string>;
export {};
