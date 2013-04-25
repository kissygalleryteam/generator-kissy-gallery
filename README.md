a yeoman generator for kissy-gallery

## install
### 安装yeoman
````sh
npm install yo -g
````

### 安装Generator

第一步：安装generator

````sh
git clone git@github.com:neekey/generator-kissy-gallery.git
cd generator-kissy-gallery
npm link
````


第二步：手动创建个gallery目录（已经有了，就不需要）
````sh
mkdir gallery
cd gallery
````

第三步：执行如下命令

````sh
yo kissy-gallery # 初始化组件
````

就会生成组件目录了。

````sh
cd 组件目录
yo kissy-gallery:version
````

用于生成新的版本目录

### 打包组件

先加载grunt依赖

````sh
cd 组件目录
npm install
````

然后执行

````sh
grunt
````
