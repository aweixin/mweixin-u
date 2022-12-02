/**
 * 上传图片
 * @param tempFilePaths 本地临时路径 []
 */
export declare const uploadFile: (tempFilePaths: any) => Promise<unknown>;
/**
 *选择图片上传
 * @param {number} [_count] 选择数量
 * @return {*}
 */
export declare const chooseImage: (_count?: number) => Promise<unknown>;
/**
 * 上传文件
 * @param {number} _count  一次最多可以选择的文件个数，可以 0～100
 * @param {("all" | "video" | "image" | "file" | undefined)} [_type]  文件类型
 * @param {string[]} [_extension]  根据文件拓展名过滤，仅 type==file 时有效。每一项都不能是空字符串。默认不过滤 ['jpg','pdf']
 * @return {*}
 */
export declare const chooseMessageFile: (_count: number, _type?: "all" | "video" | "image" | "file" | undefined, _extension?: string[]) => Promise<unknown>;
