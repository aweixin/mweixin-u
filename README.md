## m-weixin-utils

微信小程序常用方法 `上传`,`工具`,`请求` 封装

### Installation
```cmd
npm i m-weixin-utils
```
### Example usage
```js
import {Server,Upload,Utils} from 'm-weixin-utils';

Page({
  onLoad(){
      // 发起get 请求
      Server.get("https://www.npmjs.com/package/m-weixin-utils");
      // 发起post 请求
      Server.post("https://www.npmjs.com/package/m-weixin-utils");

      // 从相册选择上传图片
      Upload.chooseImage(9).then(urls=>{
            // 返回上传地址 []
            console.log(urls);
      })
    }
})
```


### Api

#### Upload Class

| Function name | Description                    |
| ------------- | ------------------------------ |
| `uploadFile(tempFilePaths: any)`      | 上传参数 临时路径参数       |
| `chooseImage(number?: number)`   |  选择图片后自动上传返回上传路径 参数（上传数量）默认1 |



#### Server Class

| Function name | Description                    |
| ------------- | ------------------------------ |
| `get(url: any, options = {}, header = {})`      |   GET url 地址，请求参数,请求头     |
| `post(url: any, options = {}, header = {})`   |  POST url 地址，请求参数,请求头 |


#### Utils Class

| Function name | Description                    |
| ------------- | ------------------------------ |
| `formatTime(date: string)`      |  date 2022-10-10 / 2022/10/10     |
| `gourl(path: string)`   | path 跳转路径 ，网址会自动跳转到  `/pages/webview/index?url=${encodeURIComponent(path)}`  |
| `get_html(data: any)`| data html 字符串自动适配微信小程序 rich-text|
| `tapinfo(e: any)`| e 返回点击的参数 data-id  |
| `getRect(obj: string)`|  obj class / ID 获取元素信息 DOM  |
| `checkFullSucreen()`|  获取小程序头部 胶囊按钮与顶部的距离  |
| `alert(content: string)`|  弹窗提示 |
| `msg(content: string)`|  消息提示 |
| `confirm(msg: string, opction?: opctionType)`|  opction 可参考小程序官方文档 |
| `getsys(key: string)`| 获取本地存储 |
| `delsys(key: string)`| 删除本地存储 |
| `setsys(key: string,value:any)`| 设置本地存储 |
| `previewImage(current: string, urls: string[])`| 需要预览的图片 |
| `requestSubscribeMessage(tmplIds: string[])`| tmplIds 模板ID 列表 |
| `openDocument(url: string)`| url 需要打开的文件地址 |
