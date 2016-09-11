module.exports = function(grunt) {

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
				dest: 'dist/js/index.js'
			}
		},
		bump: {
			options: {
				files: ['package.json'],
				pushTo: 'origin',
				commitFiles: ["-a"],
				push: true
			}
		}
	});

	//Loads all npm grunt tasks
	require('load-grunt-tasks')(grunt);

	// Default task.
	grunt.registerTask('default', ['browserify']);
};