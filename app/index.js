'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = Gallery;
function Gallery(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  var that = this;
  this.hookFor('kissy-gallery:version',{
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

prt.readme = function(){
  this.copy('README.md','README.md');
}

prt.abcJSON = function(){
  this.template('abc.json','abc.json');
}
prt.gruntfile = function(){
  this.template('Gruntfile.js','Gruntfile.js');
}
