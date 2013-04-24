module.exports = (grunt)->

  abcJSON = grunt.file.readJSON 'abc.json'

  if not abcJSON
    grunt.fatal 'abcJSON is not found!'

  if not abcJSON.version
    grunt.fatal 'version is not found in abc.json!'

  if not abcJSON.author
    grunt.warnning 'author filed missing in abc.json'

  grunt.initConfig
    abc: abcJSON
    banner: '/*! <%%= abc.title || abc.name %> - v<%%= abc.version %> - ' +
      '<%%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>\n' +
      '<%%= abc.homepage ? "* " + abc.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%%= grunt.template.today("yyyy") %> <%%= abc.author.name %>;' +
      ' Licensed <%%= _.pluck(abc.licenses, "type").join(", ") %> */\n'

    kmc:
      options:
        packages: [
          name: '<%%= abc.name %>'
          path: '../'
        ]
        map: [
          ["<%%= abc.name %>/", "gallery/<%%= abc.name %>/"]
        ]
      main:
        files: [
          src: "<%%= abc.version %>/index.js"
          dest: "<%%= abc.version %>/build/index.js"
        ,
          src: "<%%= abc.version %>/parse.js"
          dest: "<%%= abc.version %>/build/parse.js"
        ]

    uglify:
      options:
        banner: '<%%= banner %>'
      base:
        files: [
          {
            expand: true,
            cwd: '<%%= abc.version %>/build/'
            src: '*.js'
            dest: '<%%= abc.version %>/build/'
            ext: "-min.js"
          }

        ]
    less:
      main:
        files:
          [
            {
              expand: true,
              cwd: '<%%= abc.version %>/'
              src: '*.less'
              dest: '<%%= abc.version %>/build/'
              ext: '.css'
            }

          ]
    cssmin:
      main:
        files:
          [
            {
              expand: true,
              cwd: '<%%= abc.version %>/build/'
              src: '*.css'
              dest: '<%%= abc.version %>/build/'
              ext: '-min.css'
            }

          ]
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-kmc'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'

  grunt.registerTask 'default', ['kmc', 'uglify', 'less', 'cssmin']
