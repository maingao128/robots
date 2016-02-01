# 简单的爬虫抓取

##输入目标网页，可以在http://localhost:2015/抓取你想要的数据

###由于nodejs访问其他页面不存在跨域，可以任意输入http页面进行抓取，

```
http.get(url,callBack)
#这里用的是http模块，能够在node作为客户端发送请求的模块还有很多，比如request模块，superagent模块等，
```
###这里http作为服务端接受req,和res两个参数，分别表示客户端来的请求和服务端返回的相应，

http作为客户端的时候只有一个参数response表示服务端的响应

###平时node端用得比较多的是request模块去后台请求数据，然后渲染给前台，所有顺道看了看request源码，平时request用法是

```
request(uri, options, callback)
```

###进入request/index.js

```
function request (uri, options, callback){
    ...
    return new request.Request(params)
};
...
request.Request = require('./request')
```
###进入request.js,伪代码如下,得到协议类型

```
var http = require('http');
var defaultModules = {'http:':http, 'https:':https};
var protocol = self.proxy && !self.tunnel ? self.proxy.protocol : self.uri.protocol

#其中
self.proxy = getProxyFromURI(self.uri);
getProxyFromURI = require('./lib/getProxyFromURI')
```

###进入lib/getProxyFromURI.js,返回代理地址

```
function getProxyFromURI(uri){
    return process.env.HTTP_PROXY ||
           process.env.http_proxy || null
}
```


###再回到request.js，根据协议类型不同进行不同处理

```
self.httpModule = httpModules[protocol] || defaultModules[protocol]
#其中httpModules={},会运行后面一句，如果是Http,则self.httpModule = http;

self.req = self.httpModule.request(reqOptions);
#最后调用了http.request(reqOptions)返回一个http.ClientRequest类的实例，最后再end();
```