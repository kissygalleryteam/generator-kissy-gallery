## 综述

<%= comConfig.name %>是<%= comConfig.desc %>。

* 版本：<%= version %>
* 作者：<%= comConfig.author.name %>
* demo：[http://gallery.kissyui.com/<%= componentName %>/<%= version %>/demo/index.html](http://gallery.kissyui.com/<%= componentName %>/<%= version %>/demo/index.html)

## 初始化组件

    S.use('gallery/<%= comConfig.name %>/<%= comConfig.version %>/index', function (S, <%= comConfig.componentClass %>) {
         var <%= comConfig.name %> = new <%= comConfig.componentClass %>();
    })

## API说明
