module.exports = function(grunt) {

	var bowerPath = 'bower_components';
	var nodeModulesPath = 'node_modules/';
	var srcPath = [
		'assets/dist/**/*.js'
	];
	var sassPath = 'assets/sass/app.scss';

	var vendorPath = [nodeModulesPath + 'react/dist/react.js', nodeModulesPath + 'react-dom/dist/react-dom.js'];

	grunt.initConfig({
		browserify: {
			options: {
				browserifyOptions: {
					debug: true
				},
				transform: [["babelify", {presets: ['es2015', 'react']}]]
			},
			app: {
				src: 'assets/js/index.js',
				dest: 'assets/dist/js/index.js'
			}
		},

		babel: {
			options: {
				compact: false,
				plugins: ['transform-react-jsx'],
				presets: ['es2015', 'react']
			},
			jsx: {
				files: [{
					expand: true,
					cwd: 'assets/js',
					src: ['*.js*'],
					dest: 'assets/dist',
					ext: '.js'
				}]
			}
		},

		sass: {
			options: {
				sourcemap: 'none'
			},
			dist: {
				files: {
					'assets/dist/css/app.css': sassPath
				}
			}
		}
	});

	//Loads all npm grunt tasks
	require('load-grunt-tasks')(grunt);

	// Default task.
	grunt.registerTask('default', ['browserify']);
};