/**
 * get 请求
 * @param url
 * @param options
 * @param header
 */
declare const get: (url: any, options?: {}, header?: {}) => Promise<unknown>;
/**
 * post 请求
 * @param url
 * @param options
 * @param header
 */
declare const post: (url: any, options?: {}, header?: {}) => Promise<unknown>;
export { get, post };
