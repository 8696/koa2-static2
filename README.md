# koa2-static2

#### 项目介绍

- 基于 koa2、koa-static 中间件扩展带协商缓存的中间件

#### 功能

- 遵循 HTTP 协议缓存机制
- 基于及集成 koa-static
- 支持协商缓存
- 可配置开启文件类型（默认禁止 HTML 文件缓存）

#### 安装

- (c)npm install koa2-static2 -D

#### 使用
##### 基础使用

默认开启协商缓存并禁止 HTML 文件缓存，在静态资源中每次都会发送请求检查服务端是否有更新

```javascript
const koa2Static2 = require('koa2-static2');

const Koa = require('koa');

const path = require('path');

const staticPath = path.resolve(__dirname, './static');

const app = new Koa();

koa2Static2.install(app, staticPath);

app.listen(3000);

console.log('http://localhost:3000');
```

##### 强制缓存优先（推荐）

浏览器先检测是否已经开启强制缓存，在强制缓存时间过期之后再发送请求检查服务端是否有更新

```javascript
koa2Static2.install(app, staticPath, {
  maxAge: 10000
});
```

##### 过滤指定资源

通过配置项指定 `excludeExtensionCache` 指定需要被忽略的文件类型，由于直接覆盖默认配置如果禁止 `html` 类型扔需手动传入

```javascript
koa2Static2.install(app, staticPath, {
  maxAge: 10000,
  excludeExtensionCache: ['html', 'css']
});
```

##### `koa-static` 源用法

`koa2Static2` 本身是一个函数，基于 `koa-static` ,所以 api 保持一致

```javascript
app.use(koa2Static2(staticPath, options));
```

#### API

- function
    - koa2Static2
        - param 和 koa-static 一致
        - return 
            - function \<Function\>
            
- methods
    - install 
        - param
            - koaApp \<Object\> koa 实例
            - staticPath \<String\> 静态资源目录、同 koa-static 第一个参数
            - options \<Object\> 同 koa-static 第二个参数
                - excludeExtensionCache 继承参数、参考上面示例
                - maxage 
                - setHeaders 
                - ...
        - return
            - void
            
            
#### 其他

- 若使用 `setHeaders` 中设置 `Cache-Control`、`Pragma`、`Last-Modified`、`Etag` 将无效


#### 依赖模块

- [koa](https://github.com/koajs/koa)
- [koa-static](https://github.com/koajs/static)