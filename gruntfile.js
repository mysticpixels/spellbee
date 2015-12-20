// Grunt file for ixdlegos
// ranjithkumarr.com
// @mysticpixels

module.exports = function(grunt) {

  grunt.initConfig({

    // reading the package file
    pkg: grunt.file.readJSON('package.json'),

    // adding a neat banner to the top of the source files
    tag: {
      banner: '/*\n' +
              ' Hello world ' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.title %>\n' +
              ' * <%= pkg.url %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
              ' */\n'
    },

    // setting up folder structure pointers
    project: {
      dev: 'dev',
      build: 'build',
      devcss: '<%= project.dev %>/css',
      devjs: '<%= project.dev %>/js',
      buildcss: '<%= project.build %>/css',
      buildjs: '<%= project.build %>/js'
    },

    // concatenating all handwritten js to single js file
    concat: {
      options: {
        separator: ';',
        style: 'compressed'
      },
      dist: {
        src: ['<%= project.devjs %>/*.js'],
        dest: '<%= project.buildjs %>/spellbee.js'
      }
    },

    // converting scss files to css and saving to relevant folders
    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none',
          // banner: '<%= tag.banner %>'
          // compass: true
        },
        files: {
          '<%= project.devcss %>/css/spellbee.css': '<%= project.devcss %>/scss/spellbee.scss'
        }
      },
      build: {
        options: {
          style: 'compressed',
          sourcemap: 'none'          
          // compass: true
        },
        files: {
          '<%= project.buildcss %>/spellbee.css': '<%= project.devcss %>/scss/spellbee.scss'
        }
      }
    },

    // uglify
    uglify: {
      option: {
        mangle: 'true'
      },
      mainjs: {
        files: {
          '<%= project.buildjs %>/spellbee.js': ['<%= project.buildjs %>/spellbee.js']
        }
      }
    },

    // modernizr
    modernizr: {
      dist:{
        'dest': '<%= project.devjs %>/modernizr.js',
        "options" : [
          "setClasses",
          "addTest",
          "html5printshiv",
          "testProp",
          "fnBind"
        ]
      }
    },

    // copying files to build system
    sync: {
      main: {
        files: [
          {cwd: '<%= project.dev %>/', src: '*.html', dest: '<%= project.build %>/'},
        ],
        verbose: 'true',
        // updateAndDelete: 'true'
      }
    },

    // watching the scss files
    watch: {
      sass: {
        files: ['<%= project.devcss %>/scss/{,*/}*.{scss,sass}'],
        tasks: ['sass:dev', 'sass:build'],
        option: {
          livereload: true
        }
      },
      html: {
        files: ['<%= project.dev %>/*.html'],
        tasks: ['sync']
      }
    }
  });

  // loading the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-banner');

  // registering the tasks
  grunt.registerTask('default', ['concat', 'sass', 'uglify', 'modernizr', 'watch'  ]);
};