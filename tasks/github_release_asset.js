/*
 * grunt-github-release-asset
 * https://github.com/bartinger/grunt-github-release-asset
 *
 * Copyright (c) 2014 Dominic Bartl
 * Licensed under the MIT license.
 */

'use strict';


var Github = require('./lib/github.js');
var format = require("string-template");
module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerTask('githubAsset', 'Attach assets to Girhub releases.', function (args) {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			releaseName: '{tag}'
		});
		var hub = new Github(options);
		if (!options.file) {
			grunt.fail.fatal('No file specified.');
		}

		var releaseName = format(options.releaseName, { tag: 'testx' });
		console.log(releaseName);
		/*hub.createRelease('test', 'New Release', 'A description', function (){
			console.log(arguments);
		});*/
	});

};
