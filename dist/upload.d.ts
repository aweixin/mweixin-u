/**
 * 上传图片
 * @param tempFilePaths 本地临时路径 []
 */
export declare const uploadFile: (tempFilePaths: any) => Promise<unknown>;
export declare const chooseImage: (num?: number) => Promise<unknown>;
export declare const chooseMessageFile: (_count: number, _type?: "all" | "video" | "image" | "file" | undefined, _extension?: string[]) => Promise<unknown>;
