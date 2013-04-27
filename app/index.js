'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = Gallery;
function Gallery(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.hookFor('kissy-gallery:version', {
        args:[false]
    });

    this.on('end',function(){
        console.log('gallery dir build done!');
        console.log("模块初始化完成！")
        console.log("\n调用：")
        console.log('npm install #加载grunt依赖')
        console.log('grunt #打包你的组件')
    })
}

util.inherits(Gallery, yeoman.generators.Base);

var prt = Gallery.prototype;

prt.askFor = function(){
    var cb = this.async();

    //打印欢迎消息
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


    var prompts = [{
        name: 'componentName',
        message: 'name of component:'
    }];

    this.prompt(prompts, function (err, props) {
        if (err) {
            return this.emit('error', err);
        }
        //组件名称
        this.componentName = props.componentName;
        this.mkdir(this.componentName);
        this.env.options.componentName = this.componentName;
        cb();
    }.bind(this));
}

prt.copyFile = function(){
    this.copy('Gruntfile.js',this.componentName + '/Gruntfile.js');
    this.copy('.gitignore',this.componentName + '/.gitignore');
}

