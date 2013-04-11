'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = AppGenerator;
function AppGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
}

util.inherits(AppGenerator, yeoman.generators.Base);

AppGenerator.prototype.readme = function(){
  this.copy('README.md','README.md');
}
AppGenerator.prototype.gruntfile = function(){
  this.template('Gruntfile.js','Gruntfile.js');
}
