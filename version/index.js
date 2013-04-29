'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = AppGenerator

function AppGenerator(args, options, config) {
    yeoman.generators.NamedBase.apply(this, arguments);
    this.version = args[0];
}

util.inherits(AppGenerator, yeoman.generators.NamedBase);

AppGenerator.prototype.comConfig = function(){
    var jsonFile = './abc.json';
    var sAbcJson = this.readFileAsString(jsonFile);
    this.comConfig = JSON.parse(sAbcJson);
}


AppGenerator.prototype.copy = function(){
    var curVer = this.comConfig.version;
    if(this.version == curVer) return false;
    this.directory(curVer,this.version);
    this.writeJson('./abc.json',function(json){
        json.version = this.version;
        return json;
    });
    this.writeJson('./package.json',function(json){
        json.version = this.version+'.0';
        return json;
    });

}

AppGenerator.prototype.writeJson = function(file,fnMap){
    if(!file || !fnMap) return false;
    var sAbcJson = this.readFileAsString(file);
    var oAbcJson = JSON.parse(sAbcJson);
    oAbcJson = fnMap.call(this,oAbcJson);
    this.write(file,JSON.stringify(oAbcJson));
}
