module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        options: {
          paths: ['src/styles']
        },
        files: {
          'dev/styles/main.css': 'src/styles/main.less'
        }
      },
      production: {
        options: {
          compress: true
        },
        files: {
          'dist/styles/main.min.css': 'src/styles/main.less'
        }
      }
    },

    uglify: {
      production: {
        options: {
          mangle: true,
          compress: true,
          sourceMap: false
        },
        files: {
          'dist/scripts/main.min.js': ['src/scripts/main.js']
        }
      }
    },

    copy: {
      dev: {
        expand: true,
        cwd: 'src/scripts',
        src: ['**/*.js'],
        dest: 'dev/scripts'
      }
    },

    watch: {
      styles: {
        files: ['src/styles/**/*.less'],
        tasks: ['less:development'],
        options: {
          spawn: false
        }
      },
      scripts: {
        files: ['src/scripts/**/*.js'],
        tasks: ['copy:dev'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('dev', ['less:development', 'copy:dev']);

  grunt.registerTask('build', ['less:production', 'uglify:production']);
};
