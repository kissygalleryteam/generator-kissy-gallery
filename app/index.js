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

AppGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
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

  var abcJSON = {};

  try {
    abcJSON = require(path.resolve(process.cwd(), 'abc.json'));
  } catch (e) {}

  if (!abcJSON.author) {
    abcJSON.author = {
      name: '',
      email: ''
    }
  }

  var prompts = [{
    name: 'projectName',
    message: 'Name of Project?',
    default: abcJSON.name || path.basename(process.cwd())
  },{
    name: 'author',
    message: 'Author Name:',
    default: abcJSON.author.name,
    warning: ''
  },{
    name: 'email',
    message: 'Author Email:',
    default: abcJSON.author.email,
    warning: ''
  },{
    name: 'styleEngine',
    message: 'Whitch style engin do you use [css-combo|less|sass]?',
    default: abcJSON._kissy_pie.styleEngine
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.projectName = props.projectName;
    this.author = props.author;
    this.email = props.email;
    this.styleEngine = props.styleEngine;
    this.enableLess = (/less/i).test(this.styleEngine);
    this.enableSass = (/sass/i).test(this.styleEngine);
    this.enableCSSCombo = (/css-combo/i).test(this.styleEngine);

    cb();

  }.bind(this));
};

prt.pkgJSON = function(){
  this.template('_package.json','package.json');
}

prt.abcJSON = function(){
  this.template('abc.json','abc.json');
}

prt.readme = function(){
  this.copy('README.md','README.md');
}

prt.gruntfile = function(){
  this.template('Gruntfile.js','Gruntfile.js');
}


