module.exports = function(grunt) {

  grunt.initConfig({

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      dist: {
        files: [
            {
              'expand': true,
              'src': 'build/*.html',
              'dest': 'dist',
              'flatten': true
            }, {
              'expand': true,
              'cwd': 'build',
              'src': '**/index.html',
              'dest': 'dist'
            }
        ]
     }
    },

    uglify: {
      dist: {
         files: {
          'dist/static/js/main.min.js': [
              'build/static/js/*.js',
              'node_modules/webfontloader/webfontloader.js'
          ],
        }
      },
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      dist: {
        files: {
          'dist/static/css/main.min.css': ['build/static/css/main.css']
        }
      }
  },

    replace: {
      dist: {
        src: ['dist/*.html', 'dist/**/*.html'],
        overwrite: true,
        replacements: [
          {
            from: /main\.css/,
            to: "main.min.css"
          },
          {
            from: "../static/js/main.js",
            to: "https://dataforgood.no/static/js/main.min.js"
          },
          {
            from: "./static/js/main.js",
            to: "https://dataforgood.no/static/js/main.min.js"
          },
          {
             from: "http://localhost:8000/subscribe/",
             to: "https://subscribe.dataforgood.no/subscribe/"
          }
        ]
      }
  },

  copy: {
      img: {
          expand: true,
          cwd: 'assets/static/images',
          src: ['**'],
          dest: 'dist/static/images'
      },
      extra: {
          expand: true,
          cwd: 'assets/static/css/images',
          src: ['**'],
          dest: 'dist/static/css/images'
      },
      txt: {
          expand: true,
          cwd: 'build',
          src: ['*.txt'],
          dest: 'dist'
      },
      netlify: {
          expand: false,
          src: ['netlify/_headers'],
          dest: 'dist/_headers'
      }
  },

  });

  /* Load tasks */
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');

  /* Build
     The build folder contains built files, non-minified.
  */
  grunt.registerTask('build:html');
  grunt.registerTask('build', function(){
    grunt.task.run('build:html');
  });

  /* Dist
     The dist folder contains compressed and minified files, ready for deployment.
  */
  grunt.registerTask('dist:img', ['copy:img', 'copy:extra']);
  grunt.registerTask('dist:html', function(){
    grunt.task.run('htmlmin', 'replace', 'copy:txt');
  });
  grunt.registerTask('dist:css', function(){
    grunt.task.run('cssmin');
  });
  grunt.registerTask('dist:js', function(){
    grunt.task.run('uglify:dist');
  });
  grunt.registerTask('dist', function(){
    grunt.task.run('dist:html', 'dist:css', 'dist:js', 'dist:img',
                   'copy:netlify');
  });

  /* Default task
     The default task is the dist task
  */
  grunt.registerTask('default', function(){
    grunt.task.run('dist');
  });

};
