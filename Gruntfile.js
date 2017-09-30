// Generated on 2016-01-05 using generator-angular 0.15.1
'use strict';
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
module.exports = function(grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    'replace': 'grunt-replace'
  });
  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };
  // Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    yeoman: appConfig,
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/modules/**/*.js'],
        tasks: ['newer:jshint:all', 'newer:jscs:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'postcss:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/*.html',
          '<%= yeoman.app %>/assets/**/*',
          '<%= yeoman.app %>/modules/**/*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },
    // Make sure there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/modules/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },
    // Make sure code styles are up to par
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/modules/**/*.js'
        ]
      },
      test: {
        src: ['test/spec/{,*/}*.js']
      }
    },
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      script: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.dist %>/scripts/scripts.*.js'
          ]
        }]
      },
      server: '.tmp'
    },
    // Add vendor prefixed styles
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({
            browsers: ['last 1 version']
          })
        ]
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    replace: {
      local: {
        options: {
          patterns: [{
            match: /constants.SERVING_MODE.REMOTE/g,
            replacement: 'constants.SERVING_MODE.LOCAL'
          }]
        },
        files: [{
          src: '<%= yeoman.app %>/modules/shared/js/shared.constants.js',
          dest: '<%= yeoman.app %>/modules/shared/js/shared.constants.js'
        }]
      },
      remote: {
        options: {
          patterns: [{
            match: /constants.SERVING_MODE.LOCAL/g,
            replacement: 'constants.SERVING_MODE.REMOTE'
          }]
        },
        files: [{
          src: '<%= yeoman.app %>/modules/shared/js/shared.constants.js',
          dest: '<%= yeoman.app %>/modules/shared/js/shared.constants.js'
        }]
      },
      removeAngularSanitize: {
        options: {
          patterns: [{
            match: /angular-sanitize/gi,
            replacement: 'dummy'
          }]
        },
        files: [{
          src: '<%= yeoman.app %>/index.html',
          dest: '<%= yeoman.app %>/index.html'
        }]
      }      
    },
    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath: /\.\.\//,
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/modules/**/js',
        fontsDir: '<%= yeoman.app %>/assets/fonts/**/*',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },
    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/modules/**/*',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          // '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/assets/fonts/**/*'
        ]
      }
    },
    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: ['<%= yeoman.app %>/index.html'],
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/*.html', '<%= yeoman.dist %>/modules/**/*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/scripts/{,*/}*.js', '<%= yeoman.dist %>/modules/**/*.js'],
      /** scripts folder */
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ],
        blockReplacements: {
          js: function(block) {
            var primaryTaskName = grunt.cli.tasks[0];
            var blockName = block.dest;
            var returnSrc;
            switch (primaryTaskName) {
              case 'build-dev':
                returnSrc = (blockName === 'scripts/scripts.js') ? block.raw.slice(1, -1).join('\n') : '<script src="' + blockName + '"></script>';
                break;
              default:
                returnSrc = '<script src="' + blockName + '"></script>';
                break;
            }
            return returnSrc;
          }
        },
        patterns: {
          js: [
            [/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']
          ]
        }
      }
    },
    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css'
          ]
        }
      }
    },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'modules/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    ngtemplates: {
      dist: {
        options: {
          module: 'app',
          htmlmin: '<%= htmlmin.dist.options %>',
          usemin: 'scripts/scripts.js'
        },
        cwd: '<%= yeoman.app %>',
        src: ['modules/**/*.html'],
        dest: '.tmp/templateCache.js'
      }
    },
    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,png,txt}',
              '*.html',
              'images/{,*/}*.{webp}',
              'styles/fonts/{,*/}*.*'
            ]
          }, {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.dist %>/images',
            src: ['generated/*']
          }, { //TODO: Need to fix font issue in the build
            expand: true,
            src: ['bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
              'bower_components/fontawesome/fonts/*'
            ],
            dest: '<%= yeoman.dist %>'
          }
          /*, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/fontawesome',
                    src: ['fonts/*.*'],
                    dest: '<%= yeoman.dist %>'
                  }*/
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      images: {
        expand: true,
        cwd: '<%= yeoman.app %>/images',
        dest: '<%= yeoman.dist %>/images',
        src: '{,*/}*.{png,jpg,jpeg,gif}'
      },
      modules: {
        expand: true,
        cwd: '<%= yeoman.app %>/modules/',
        dest: '<%= yeoman.dist %>/modules/',
        src: '**/*'
      },
      assets: {
        expand: true,
        cwd: '<%= yeoman.app %>/assets/',
        dest: '<%= yeoman.dist %>/assets/',
        src: '**/*'
      }
    },
    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist'
        // 'imagemin',
        // 'svgmin'
      ]
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });
  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }
    grunt.task.run([
      'clean:server',
      'replace:local',
      'replace:removeAngularSanitize',
      'wiredep',
      'concurrent:server',
      'postcss:server',
      'connect:livereload',
      'watch'
    ]);
  });
  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });
  /*grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'postcss',
    'connect:test',
    'karma'
  ]);*/
  grunt.registerTask('build-dev', [
    'clean:dist',
    'replace:remote',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'copy:images',
    'copy:assets',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'copy:modules',
    'clean:script'
  ]);
  grunt.registerTask('build-prod', [
    'clean:dist',
    'replace:remote',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'copy:images',
    'copy:assets',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);
  grunt.registerTask('default', [
    'newer:jshint',
    'newer:jscs',
    // 'test',
    'build-dev'
  ]);
};
