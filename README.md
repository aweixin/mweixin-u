## m-weixin-utils

微信小程序常用方法封装

### Installation
```cmd
npm i m-weixin-utils
```
### Example usage
```js
import {getsys} from 'm-weixin-utils';

Page({
  onLoad(){
      // 获取本地存储
      const userName = getsys('userName');
      // 获取openid
      const openid = getsys('openid');
    }
})

```


### Api

#### getsys(key:string)
获取小程序本地存储

#### setsys(key:string,value:any)
设置小程序本地存储

#### delsys(key:string)
删除小程序本地存储