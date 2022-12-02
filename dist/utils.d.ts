export declare const formatTime: (date: string) => string;
export declare const gourl: (path: string) => void;
export declare const get_html: (data: any) => any;
export declare const tapinfo: (e: any) => any;
export declare const getRect: (obj: string) => Promise<unknown>;
export declare const checkFullSucreen: () => void;
export declare const alert: (content: string) => any;
export declare const msg: (msg: string, icon?: "success" | "error", duration?: number) => Promise<unknown>;
interface opctionType {
    showCancel?: boolean;
    cancelText?: string;
    cancelColor?: string;
    confirmText?: string;
    confirmColor?: string;
}
export declare const confirm: (msg: string, opction?: opctionType) => any;
export declare const getsys: (key: string) => any;
interface expireDateType {
    key: "years" | "quarters" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds";
    value: number;
}
export declare const setsys: (key: string, value: any, expireDate?: expireDateType) => void;
export declare const delsys: (key: string) => void;
export declare const delsys_expire: (key: string) => void;
export declare const previewImage: (current: string, urls: string[]) => void;
export declare const requestSubscribeMessage: (tmplIds: string[]) => Promise<unknown>;
export declare const openDocument: (url: string) => void;
export declare const checkUpdateVersion: () => void;
export declare const urlEncode: (data?: object) => string;
export declare const setClipboardData: (data: string, title?: string) => void;
export {};
