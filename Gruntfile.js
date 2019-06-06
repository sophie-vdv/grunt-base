
module.exports = function (grunt) {
    const sass = require('node-sass');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        uglify  : {
            build : {
                files : {
                    'dist/js/main.min.js' : 'src/js/main.js'
                }
            }
        },
        sass: {
            options: {
                implementation: sass,
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'dist/css/main.min.css' : 'src/sass/import.scss'
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: '*.html',
                dest: 'dist',
            },
        },
        watch   : {
            options : {
                livereload : true
            },
            sass    : {
                files : 'src/sass/*.scss',
                tasks : ['sass']
            },
            html    : {
                files : ['src/*.html'],
                tasks : ['copy', 'build']
            },
            js    : {
                files : ['src/js/*.js'],
                tasks : ['uglify']
            }
        },
        connect : {
            server : {
                options : {
                    port      : 8000,
                    base      : 'dist',
                    keepalive : true
                }
            }
        }
    });

    grunt.registerTask('default', ['uglify', 'sass', 'copy', 'connect:server', 'watch']);
};