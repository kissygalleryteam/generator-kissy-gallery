'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = Gallery;
function Gallery(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  var that = this;

  this.hookFor('kissy-gallery:version', {
    args:[false]
  });

  this.on('end',function(){
    console.log('gallery dir build done!');
    console.log("模块初始化完成！")
    console.log("\n调用：")
    console.log('  grunt build 1.0 # 打包你的组件')
    console.log('  grunt test      # 测试你的组件')
  })
}

util.inherits(Gallery, yeoman.generators.Base);

var prt = Gallery.prototype

prt.welcome = function() {
    var welcome = "\n" +
        "\n __  _  ____ _____ _____ __ __".cyan +
        "\n|  |/ ]|    / ___// ___/|  |  |".cyan +
        "\n|  ' /  |  (   \\_(   \\_ |  |  |".white +
        "\n|    \\  |  |\\__  |\\__  ||  ~  |".white +
        "\n|     | |  |/  \\ |/  \\ ||___, |".green +
        "\n|  .  | |  |\\    |\\    ||     |".green +
        "\n|__|\\_||____|\\___| \\___||____/".green +
        "\n                                                 " +
        "\n  ____   ____  _      _        ___  ____   __ __ " +
        "\n /    | /    || |    | |      /  _]|    \\ |  |  |" +
        "\n|   __||  o  || |    | |     /  [_ |  D  )|  |  |" +
        "\n|  |  ||     || |___ | |___ |    _]|    / |  ~  |" +
        "\n|  |_ ||  _  ||     ||     ||   [_ |    \\ |___, |" +
        "\n|     ||  |  ||     ||     ||     ||  .  \\|     |" +
        "\n|___,_||__|__||_____||_____||_____||__|\\_||____/ " +
        "\n                                                 ";
    console.log(welcome);
}

prt.readme = function(){
  this.copy('README.md','README.md');
}

prt.abcJSON = function(){
  this.template('abc.json','abc.json');
}

prt.gruntfile = function(){
  this.template('Gruntfile.js','Gruntfile.js');
}

prt.pkgJSON = function(){
  this.template('_package.json','package.json');
  console.log('请手动配置package.json，来方便进行kissy gallery打包！')
}
