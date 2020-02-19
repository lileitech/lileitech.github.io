#### 目录结构
```
-src  # 项目源码
-webpack.config.js  # webpack 配置文件
-script
 +-deploy.js  # 网页发布脚本
```

#### 分支说明
master 项目发布分支！请勿手动修改内容或推送

dev 开发分支，在该分支上开发

#### 开发和测试
在 dev 分支上开发，使用 `npm run build` 命令打包，请自行构建本地 web 服务器测试

#### 发布
使用 `npm run deploy` 命令发布，生产环境打包命令同测试，如需调试自行修改 webpack 配置。

