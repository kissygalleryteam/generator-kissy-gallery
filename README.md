a yeoman generator for kissy pie

## install
### 安装yeoman
````sh
npm install yo
````

### 安装Generator

第一步：安装generator

````sh
git clone git@github.com:neekey/generator-kissy-gallery.git
cd generator-kissy-gallery
npm link
````

第二步：构建你自己gallery组建，比如:创建一个uplodaer组建，且初始版本设置为1.0

````sh
mkdir uploader
cd uploader
yo kissy-gallery # 初始化组件
yo kissy-gallery:version 1.0 # 创建1.0版本
````
