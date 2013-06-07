'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var GitHubApi = require("github");
var yeoman = require('yeoman-generator');
var querystring = require('querystring');
var http = require('http');

var GLOBAL_TOKEN = '7b4ecb5420ad432956faf0218131355736acd142';
var gitHubId;

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    timeout: 5000
});

module.exports = AppGenerator;



/**
 * 日期格式化
 * @param  {Date} date new Date();
 * @param  {String} fmt  日期格式：yyyy-MM-dd hh:mm:ss
 * @return {String}      yyyy-MM-dd hh:mm:ss
 */

function formatDate(date, fmt) { //author: meizz 
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3)
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}


/**
 * 获取用户名 将用户输入进来的github账号处理下
 * @param  {String} id 输入的账户
 * @return {String}    返回值
 */

function getUserId(id) {
    if (id.indexOf('@') !== -1) {
        return id.split('@')[0];
    }
    return id;
}

function AppGenerator(args, options, config) {
    yeoman.generators.NamedBase.apply(this, arguments);
    this.version = args[0];
}

util.inherits(AppGenerator, yeoman.generators.NamedBase);

AppGenerator.prototype.comConfig = function() {
    var jsonFile = './abc.json';
    var sAbcJson = this.readFileAsString(jsonFile);
    this.comConfig = JSON.parse(sAbcJson);
}


AppGenerator.prototype.ask = function() {
    var cb = this.async();
    var prompts = [{
            name: 'name',
            message: 'Input your github account:'
        }
    ];

    this.prompt(prompts, function(err, props) {
        if (err) {
            return this.emit('error', err);
        }
        gitHubId = props.name;
        cb();
    }.bind(this));
}
AppGenerator.prototype.merge = function() {
    var jsonFile = './abc.json';
    var sAbcJson = this.readFileAsString(jsonFile);
    this.comConfig = JSON.parse(sAbcJson);


    // console.log(this.comConfig.name);
    // console.log(gitHubId);
    github.authenticate({
        type: "oauth",
        token: GLOBAL_TOKEN
    });

    var moduleName = this.comConfig.name;
    var title = 'Pulled at ' + formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss') + ' by kpm';
    var endGithubId = getUserId(gitHubId);
    github.pullRequests.create({
        repo: moduleName,
        user: 'kissygalleryteam',
        title: title, // 注释标题
        // body: 'test', // 注释内容
        base: 'master', // 固定
        head: endGithubId + ':master' //自己修改的库名
    }, function(e, data) {
        if (e) {
            console.log('error' + e);
            return;
        }
        console.log('PullRequest success');
        console.log('Merging...');

        var postData = querystring.stringify({
            name: 'velocity',
            type: '',
            publish: 0,
            number: data.number,
            username: 'everyone',
            password: 'nobody'
        });

        var options = {
            host: 'kpm.f2e.taobao.net',
            port: 80,
            path: '/packages/publish',
            method: 'POST',
            auth: 'everyone:nobody',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };

        var req = http.request(options, function(res) {

            var strData = '';
            res.on('data', function(data) {
                strData += data;
            });


            res.on('end', function() {
                if (JSON.parse(strData).success === 1) {
                    console.log('Merged success');
                }else{
                    console.log('Merged Error \n' + strData);
                }
            });
        });
        req.write(postData + "\n");
        req.end();
    });
}