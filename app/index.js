'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = Gallery;
function Gallery(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
    this.version = args[0] || '1.0';
    this.cwd = options.env.cwd;
    this.componentName = getComName(this);
    this.on('end',function(){
        this.installDependencies();
        console.log("组件目录和文件初始化完成！")
        console.log("\n打包组件运行：")
        console.log('grunt')
    })
}

util.inherits(Gallery, yeoman.generators.Base);

var prt = Gallery.prototype;

prt.askFor = function(){
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
}
prt.askAuthor = function(){
    var cb = this.async();
    var prompts = [{
        name: 'author',
        message: 'author of component:',
        default: 'kissy-team'
    },{
        name: 'email',
        message: 'email of author:',
        default: 'kissy-team@gmail.com'
    }];

    this.prompt(prompts, function (err, props) {
        if (err) {
            return this.emit('error', err);
        }
        this.author = props.author;
        this.email = props.email;
        cb();
    }.bind(this));
}
prt.copyFile = function(){
    this.copy('Gruntfile.js','Gruntfile.js');
    this.copy('_.gitignore','.gitignore');
    this.template('abc.json','abc.json');
    this.template('_package.json','package.json');
    this.template('README.md', 'README.md');

}

prt.mk = function(){
    var version = this.version;
    this.mkdir(version);
    var fold = ['demo','doc','spec','build','plugin','guide','meta'];
    for(var i=0;i<fold.length;i++){
        this.mkdir(path.join(version, fold[i]));
    }
}

prt.createVersion = function(){
    var version = this.version;
    this.comConfig = comConfig(this);
    this.template('index.js', path.join(version, 'index.js'));
    this.template('alias.js', path.join(version, 'meta','alias.js'));
    this.template('modules.js', path.join(version, 'meta','modules.js'));
    this.template('index.md', path.join(version, 'guide', 'index.md'));
    this.template('index.html', path.join(version, 'demo', 'index.html'));
}

function getComName(that){
    var root = that.destinationRoot();
    return 'demo';
}

function comConfig(that){
    var jsonFile = './abc.json';
    var sAbcJson = that.readFileAsString(jsonFile);
    var comConfig = JSON.parse(sAbcJson);
    var comName = comConfig.name;
    if(!comName) return false;
    var first = comName.substring(0,1).toUpperCase();
    var componentClass = first + comName.substring(1);
    comConfig.componentClass = componentClass;
    return comConfig;
}


