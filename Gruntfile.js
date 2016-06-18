'use strict';

const timeGrunt = require('time-grunt');
const loadGruntTasks = require('load-grunt-tasks');

const paths = {
    serverJs: ['app/**/*.js'],
    testJs: ['tests/**/*.js'],
};

module.exports = (grunt) => {
    if (process.env.NODE_ENV !== 'production') {
        timeGrunt(grunt);
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ['dist/'],
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    src: [
                        'app/**',
                        'package.json',
                        'Dockerfile',
                        'cont-delivery/**',
                    ],
                    dest: 'dist/',
                }],
            },
        },
        eslint: {
            target: paths.serverJs.concat(paths.testJs),
        },
        mocha_istanbul: {
            coverage: {
                src: paths.testJs,
                options: {
                    mochaOptions: ['--reporter', 'spec'],
                    istanbulOptions: ['--root', './app', '--include-all-sources', 'true'],
                    coverageFolder: './coverage',
                },
            },
        },
        nodemon: {
            dev: {
                script: 'app/server.js',
                options: {
                    args: [],
                    ignore: [
                        '.*/**',
                        'node_modules/**',
                        'tests/**',
                    ],
                    ext: 'js,html',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    cwd: __dirname,
                },
            },
        },
        concurrent: {
            tasks: ['nodemon:dev'],
            options: {
                logConcurrentOutput: true,
            },
        },
    });

    // load npm grunt tasks
    loadGruntTasks(grunt);

    grunt.registerTask('test', ['eslint', 'coverage']);

    grunt.registerTask('coverage', ['mocha_istanbul:coverage']);

    // build the application into the assets you want to ship.
    // this could be extended to include transpilation and/or minification.
    grunt.registerTask('build', ['clean:build', 'copy:build']);

    grunt.registerTask('dev', ['concurrent']);

    grunt.registerTask('default', ['dev']);
};
