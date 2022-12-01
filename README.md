## m-weixin-utils

微信小程序常用方法`上传`,`工具`,`请求`封装

### Installation
```cmd
npmim-weixin-utils
```
### Exampleusage
```js
import{Server,Upload,Utils}from'm-weixin-utils';

Page({
  onLoad(){
    //发起get请求
    Server.get("https://www.npmjs.com/package/m-weixin-utils");
    //发起post请求
    Server.post("https://www.npmjs.com/package/m-weixin-utils");

    //从相册选择上传图片
    Upload.chooseImage(9).then(urls=>{
      //返回上传地址[]
      console.log(urls);
    })
  }
})
```


### Api

#### Upload Class

##### uploadFile(tempFilePaths:any)
tempFilePaths:上传参数临时路径参数

##### chooseImage(number?:number)
number:选择图片后自动上传返回上传路径参数（上传数量）默认1



#### Server Class

##### get(url:any,options?={},header?={})
url:地址
options:请求参数
header:请求头

##### post(url:any,options?={},header?={})
url:地址
options:请求参数
header:请求头

#### Utils Class

##### formatTime(date:string)
date:2022-10-10 | 2022/10/10

##### gourl(path:string)
path:跳转路径
网址会自动跳转到`/pages/webview/index?url=${encodeURIComponent(path)}`

##### get_html(data:any)
data:html字符串自动适配微信小程序rich-text

##### tapinfo(e:any)
e返回点击的参数data-id

##### getRect(obj:string)
obj ： class/ID获取元素信息DOM

##### checkFullSucreen()
获取小程序头部胶囊按钮与顶部的距离

##### alert(content:string)
content:弹窗提示

##### msg(content:string)
content:弹窗提示

##### confirm(msg:string,opction?:opctionType)
msg 提示
opction 可参考小程序官方文档

##### getsys(key:string)
获取本地存储

##### delsys(key:string)
删除本地存储

##### setsys(key:string)
设置本地存储

##### previewImage(current:string,urls:string[])
需要预览的图片

##### requestSubscribeMessage(tmplIds:string[])
tmplIds模板ID列表

##### openDocument(url:string)
url需要打开的文件地址
