'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = AppGenerator

function AppGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
}

util.inherits(AppGenerator, yeoman.generators.NamedBase);

AppGenerator.prototype.askFor = function askFor(pagePath) {
  if(this.name){
    return
  }
  var cb = this.async();
    var prompts = [{
        name: 'version',
        message: 'please input the version number(like 1.0) : ',
        default: '1.0',
        warning: 'warnings'
    }];
  this.prompt(prompts
             , function (err, props) {
                 if (err) {
                   this.emit('error', err);
                 }else{
                   this.name = props['version']
                   cb();
                 }
               }.bind(this));
}

AppGenerator.prototype.initVersionDir = function(){
  var version = this.name
  if(!version){
    return
  }
  this.mkdir(version)
  this.mkdir(path.join(version,'demo'))
  this.mkdir(path.join(version,'doc'))
  this.mkdir(path.join(version,'plugin'))
  this.mkdir(path.join(version,'guide'))

  this.template('index.js',path.join(version,'index.js'))
  this.template('index.md',path.join(version,'guide','index.md'))
}
