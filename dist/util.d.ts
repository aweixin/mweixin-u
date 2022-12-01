export declare const formatTime: (date: Date) => string;
/**
 * 跳转小程序内部页面
 * @param path （https 跳转网页）
 */
export declare const gourl: (path: string) => void;
/**
 * 微信小程序rich-text富文本图片自适应处理
 * @param data html内容
 */
export declare const get_html: (data: any) => any;
/**
 * 获取当前点击元素的参数
 * @param e
 */
export declare const tapinfo: (e: any) => any;
/**
 * 获取元素信息 DOM
 * @param obj class | ID
 */
export declare const getRect: (obj: string) => Promise<unknown>;
export declare const checkFullSucreen: () => void;
/**
 * 弹窗提示
 * @param content 弹窗内容
 */
export declare const alert: (content: string) => any;
/**
 * 消息提示
 * @param msg 提示内容
 * @param icon success | error
 */
export declare const msg: (msg: string, icon?: 'success' | 'error', duration?: number) => Promise<unknown>;
interface opctionType {
    showCancel?: boolean;
    cancelText?: string;
    cancelColor?: string;
    confirmText?: string;
    confirmColor?: string;
}
export declare const confirm: (msg: string, opction?: opctionType) => any;
/**
 * 获取本地存储
 * @param key
 */
export declare const getsys: (key: string) => any;
/**
 * 设置本地存储
 * @param key
 * @param value
 */
export declare const setsys: (key: string, value: any) => void;
/**
 * 删除本地存储
 * @param key
 */
export declare const delsys: (key: string) => void;
/**
 * 需要预览的图片
 * @param current 当前预览的图片
 * @param urls 所有图片
 */
export declare const previewImage: (current: string, urls: string[]) => void;
/**
* 订阅消息
* @param {*} tmplIds 模板ids
*/
export declare const requestSubscribeMessage: (tmplIds: string[]) => Promise<unknown>;
/**
 * 打开文档
 * @param url
 */
export declare const openDocument: (url: string) => void;
export {};
