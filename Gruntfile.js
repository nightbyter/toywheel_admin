var dependenciesCfg = require('./dependenciesCfg.json');
module.exports = function (grunt) {
    'use strict';
    [
        'grunt-contrib-uglify',
        'grunt-contrib-concat',
        'grunt-contrib-cssmin',
        'grunt-contrib-watch',
        'grunt-contrib-clean',
        'grunt-contrib-copy',
        'grunt-parallel',
        'grunt-shell'
    ].forEach(function (gruntPluginName) {
            grunt.loadNpmTasks(gruntPluginName);
        });

    grunt.initConfig({

        uglify: {
            common: {
                files: dependenciesCfg
            }
        },

        concat: {
            common: {
                files: dependenciesCfg
            }
        },

        cssmin: {
            common: {
                files: {
                    'compile/css/common.min.css': [
                        'bower_components/html5-boilerplate/dist/css/normalize.css',
                        'bower_components/html5-boilerplate/dist/css/main.css',
                        'src/app/**/*.css'
                    ]
                }
            }
        },

        clean: ['compile'],

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['img/**/*', 'index.html', 'favicon.ico'],
                        dest: 'compile/'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: ['src/app/**/*.html'],
                        dest: 'compile/partials/'
                    }
                ]
            }
        },

        watch: {
            scripts: {
                files: ['src/**/*.*', 'Gruntfile.js', '*.json'],
                tasks: ['concat', 'cssmin', 'copy'],
                options: {
                    livereload: true
                }
            }
        }

    });

    [{
        start: ['watch']
    }, {
        compile: ['clean', 'uglify', 'cssmin', 'copy']
    }, {
        unit_test: ['shell:unit_test']
    }, {
        e2e_test: ['shell:e2e_test']
    }, {
        deploy: ['compile', 'ftp-deploy:build']
    }].forEach(function (item) {
            var key = Object.keys(item)[0];
            grunt.registerTask(key, item[key]);
        });
};