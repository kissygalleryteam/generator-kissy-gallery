a yeoman generator for kissy-gallery

## install
### 安装yeoman

````sh
npm install yo grunt-cli -g
````

### 安装kissy-gallery目录生成器

````sh
npm install generator-kissy-gallery -g
````

### 生成组件目录

比如你的组件目录是offline，进入该目录，然后执行命令：

````sh
yo kissy-gallery 1.0
````

默认版本为1.0。

### 打包组件

在组件目录下执行如下命令：

````sh
grunt
````

可以修改gruntfile.js来自定义组件的构建。

### 发布一个新的版本

在组件目录下执行如下命令：

````sh
yo kissy-gallery:version 1.1
````

##changelog

###0.1.9
*去掉多余依赖

###0.1.8
*修正编码问题

###0.1.7
*打包时中文ascii化

###0.1.6
*优化README.md

###0.1.5
*修正yo kissy-gallery:version命令无效的bug