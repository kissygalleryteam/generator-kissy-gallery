'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = AppGenerator

function AppGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
}

util.inherits(AppGenerator, yeoman.generators.NamedBase);

AppGenerator.prototype.askFor = function(version) {


  var abcJSON;

  try {
    abcJSON = require(path.resolve(process.cwd(), 'abc.json'));
  } catch (e) {

  }

  this.name = abcJSON.name;
  this.author = abcJSON.author;

  this.moduleVersion = version || abcJSON.version;
  //TODO 如果参数版本号和 json的版本号不一致，则提示用户是否更新 json 版本



  if (!this.moduleVersion) {
    var cb = this.async();
    var prompts = [{
      name: 'version',
      message: 'please input init version number ',
      default: '1.0',
      warning: '开始gallery之旅吧'
    }];

    this.prompt(prompts
      ,function (err, props) {
        if (err) {
          this.emit('error', err);
        }
        this.moduleVersion = props.version;

        cb();

      }.bind(this));
  }

}

AppGenerator.prototype.initVersionDir = function(){
  var version = this.moduleVersion

  if(!version){
    return
  }

  this.mkdir(version)
  this.mkdir(path.join(version,'demo'));
  this.mkdir(path.join(version,'doc'));
  this.mkdir(path.join(version,'plugin'));
  this.mkdir(path.join(version,'guide'));

  this.template('index.js',path.join(version, 'index.js'));
  this.template('index.less',path.join(version, 'index.less'));

  this.template('index.md',path.join(version, 'guide', 'index.md'));
}

