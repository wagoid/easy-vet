module.exports = function(grunt) {

	var bowerPath = 'bower_components';
	var nodeModulesPath = 'node_modules/';
	var srcPath = [
		'src/dist/**/*.js'
	];
	var sassPath = 'src/sass/app.scss';

	var vendorPath = [nodeModulesPath + 'react/dist/react.js', nodeModulesPath + 'react-dom/dist/react-dom.js'];

	grunt.initConfig({
		browserify: {
			options: {
				watch: true,
				keepAlive: true,
				browserifyOptions: {
					debug: true
				},
				transform: [["babelify", { presets: ['es2015', 'react'], plugins: ['transform-object-rest-spread'] }], ['envify']]
			},
			app: {
				src: 'src/js/index.js',
				dest: 'src/dist/js/index.js'
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
					cwd: 'src/js',
					src: ['*.js*'],
					dest: 'src/dist',
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
					'src/dist/css/app.css': sassPath
				}
			}
		}
	});

	//Loads all npm grunt tasks
	require('load-grunt-tasks')(grunt);

	// Default task.
	grunt.registerTask('default', ['browserify']);
};