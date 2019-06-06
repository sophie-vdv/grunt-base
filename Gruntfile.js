module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
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
        cssmin  : {
            build : {
                files : {
                    'dist/css/main.min.css' : 'dist/css/main.css'
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'dist/css/main.css' : 'src/sass/import.scss'
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
                tasks : ['sass', 'cssmin']
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

    grunt.registerTask('default', ['uglify', 'sass', 'cssmin', 'copy', 'connect:server', 'watch']);
};