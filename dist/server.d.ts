interface returnType {
    code: number;
    data: any;
    msg: string;
    message: string;
}
/**
 * get 请求
 * @param url
 * @param options
 * @param header
 */
export declare const get: (url: any, options?: {}, header?: {}) => Promise<returnType>;
/**
 * post 请求
 * @param url
 * @param options
 * @param header
 */
export declare const post: (url: any, options?: {}, header?: {}) => Promise<returnType>;
export {};
