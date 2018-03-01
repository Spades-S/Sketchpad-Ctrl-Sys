#### 系统运行要求

* node [版本高于v8.5.0 (含v8.5.0) ]
* mysql数据库
* redis数据库 [版本高于v4.0.8 (含v4.0.8 ) ]
* **浏览器 chrome最佳**



#### 系统安装

```Shell
cd ./App
npm install
npm run prod

cd ../Server
npm install
```



#### 系统启动

* 启动时不清空Redis，npm run prod
* 启动时同时清空Redis,  MODE=clear npm run prod



#### 配置信息修改

* 服务端口：**默认 3000 端口**   [./Server/config/index.js 中 port属性]
* Redis数据库端口和host：**默认为port: 6379, host: 127.0.0.1**    [./Server/config/index.js 中 redisConf属性]
* mysql数据库相关配置：**启动服务时务必修改mysql配置，使其符合所在系统** [./Server/config/mysql.js]