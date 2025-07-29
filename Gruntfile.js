module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

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
      options: {
        mangle: true,
        compress: true,
        sourceMap: false
      },
      my_target: {
        files: {
          'dist/scripts/main.min.js': ['src/scripts/main.js']
        }
      }
    },

    copy: {
      html: {
        files: [
          {
            expand: true,
            cwd: 'dev/',
            src: ['index.html'],
            dest: 'dist/'
          }
        ]
      }
    },

    watch: {
      styles: {
        files: ['src/styles/**/*.less'],
        tasks: ['less:development'],
        options: {
          nospawn: true
        }
      },
      scripts: {
        files: ['src/scripts/**/*.js'],
        tasks: ['uglify'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['less:production', 'uglify', 'copy:html']);
};
