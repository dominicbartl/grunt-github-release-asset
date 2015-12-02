/*
 * grunt-github-release-asset
 * https://github.com/bartinger/grunt-github-release-asset
 *
 * Copyright (c) 2014 Dominic Bartl
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		// Configuration to be run (and then tested).
		githubAsset: {
			options: {
				credentials: grunt.file.readJSON('credentials.json'),
				repo: 'git@github.com:Bartinger/grunt-github-release-asset.git',
				files: ['test/test-file.zip'],
				releaseName: 'Release {tag}'
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'githubAsset'/*, 'nodeunit'*/]);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
