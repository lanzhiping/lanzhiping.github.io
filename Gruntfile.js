module.exports = function (grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 8000,
                    directory: 'index.html'
                }
            }
        },

        concat: {
            options: {
                separator: ';' + '\n'
            },
            dist: {
                src: ['Areas/appmodule.js', 'Areas/*/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            },
            dependencyjs: {
                src: ['node_modules/angular/angular.min.js', 'node_modules/angular-*/angular-*.min.js'],
                dest: 'dist/dependsource.min.js'
            },
            dependencycss: {
                src: ['node_modules/angular*/angular*.min.css'],
                dest: 'dist/dependsource.min.css'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['Areas/appmodules.js', 'Areas/*/*.js']
                }
            }
        },

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.css': 'Areas/main.scss'
                }
            }
        },

        watch: {
            files: ['Areas/appmodule.js', 'Areas/*/*.js', 'Areas/*/*.scss', 'Areas/main.scss', 'Gruntfile.js'],
            tasks: ['uglify', 'concat:dist', 'sass']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');


    grunt.registerTask('default', ['connect', 'uglify', 'concat:dist', 'sass', 'watch']);
    grunt.registerTask('build', ['sass', 'concat', 'uglify']);
};
