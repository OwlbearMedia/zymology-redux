module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		express: {
			dev: {
				options: {
					script: 'app.js'
				}	
			}
		},

		concat: {
			dist: {
				src: [
					'app/scripts/angular.min.js',
					//'app/scripts/bootstrap.min.js',
					'app/scripts/app.js'
				],
				dest: 'app/scripts/<%= pkg.name %>.js'
			}
		},

		watch: {
			scripts: {
				files: ['app/scripts/app.js'],
				tasks: ['concat']
			},
			files: ['app/*.html'],
			options: {
				livereload: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['express:dev', 'watch']);
};