module.exports = function(grunt) {
  var path = require('path');

  grunt.file.defaultEncoding = 'gbk';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    pageName: grunt.option('page') || 'home',
    version: grunt.option('ver') || '1.0',
    timestamp: grunt.option('ts') || '20121212',
    pageBase: '<%%= pageName %>/<%%= version %>/page',
    pageBuildBase: '<%%= pageName %>/<%%= timestamp %>/page',

    clean: {
      page: {
        src: '<%%= pageName %>/<%%=timestamp %>/'
      },
      common: {
        src: 'common/*-min.*'
      }
    },

    copy: {
      page: {
        files: [
          {
            expand: true,
            cwd: '<%%= pageBase %>',
            src: ['*.js', '*.css'],
            dest: '<%%= pageBuildBase %>',
          }
        ]
      },
    },

    less: {
      options: {
        paths: ['./utils']
      },

      page: {
        files: [{
          expand: true,
          cwd: '<%%= pageBase %>',
          src: '*.less',
          dest: '<%%= pageBuildBase %>',
          ext: '.css'
        }]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%%= pkg.name %> <%%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      page: {
        files: [
          {
            expand: true,
            cwd: '<%%= pageName%>/<%%= version%>/page',
            src: '*.js',
            dest: '<%%= pageName%>/<%%=timestamp%>/page/',
            ext: '-min.js'
          }
        ]
      },


      common: {
        files: [{
          expand: 'true',
          src: ['common/*.js', '!common/*-min.js'],
          dest: 'common',
          ext: '.min.js'
        }]
      }
    },
    cssmin: {
      page: {
        files: [{
          expand: true,
          cwd: '<%%= pageBuildBase %>',
          src: ['*.css','!*-min.css'],
          dest: '<%%= pageBuildBase %>',
          ext: '-min.css'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt-css-combo');

  // Default task(s).
  grunt.registerTask('default', ['page']);
  grunt.registerTask('page', ['clean:page','copy:page','uglify:page','less:page','cssmin:page']);
};

