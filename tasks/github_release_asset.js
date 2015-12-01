/*
 * grunt-github-release-asset
 * https://github.com/bartinger/grunt-github-release-asset
 *
 * Copyright (c) 2014 Dominic Bartl
 * Licensed under the MIT license.
 */

'use strict';


var format = require('string-template');
var async = require('async');
var fs = require('fs');
var Github = require('./lib/github.js');

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerTask('githubAsset', 'Create releases and attach assets on Girhub.', function (args) {
		// Merge task-specific and/or target-specific options with these defaults.
		var done = this.async();
		var options = this.options({
			releaseName: '{tag}'
		});

		if (!options.repo) {
			grunt.fail.fatal('No repository url specified.');
		}

		if (options.repo.indexOf('git@github.com') !== 0) {
			grunt.fail.fatal('Repository url is not a Github url.');
		}

		if (!options.files || options.files.length<1) {
			grunt.fail.fatal('No files specified.');
		}

		var hub = new Github(options);
		async.waterfall([

			function (callback) {
				options.files.forEach(function(file){
					if (!fs.existsSync(file)) {
						throw 'File doesn\'t exist (' + file + ')';
					}
				})
				callback(null);
			},
			function (callback) {
				var tag;
				if (!options.tag) {
					return hub.getLatestTag(function (err, body) {
						if (err) {
							return callback(err);
						}
						try {
							callback(null, body[0].name);
						} catch (e) {
							callback(new Error('No tags for this repo'));
						}
					});
				} else {
					callback(null, options.tag);
				}
			},
			function (tag, callback) {
				var releaseName = format(options.releaseName, {
					tag: tag
				});
				grunt.log.ok('Create release "' + releaseName + '" on tag: ' + tag);
				hub.createRelease(tag, releaseName, '', callback);
			},
			function (body, callback) {
				if (body.errors) {
					var msg = body.message + (body.errors.length > 0? '(' + body.errors[0].code + ')' : '');
					throw msg;
				}
				var tasks = []

				options.files.forEach(function(file){
					tasks.push(function(_body, _callback){
						grunt.log.ok('Uploading asset: ' + file + '...');
						hub.uploadAsset(body.id, file, _callback);
					})
				});

				tasks.push(function(_body, _callback){
					_callback()
					callback()
				})

				async.waterfall(tasks)
			},
			function (body, callback) {
				grunt.log.ok('Upload successful.');
				callback(null, body);
			}
		], function (err, result) {
			if (err) {
				grunt.fail.fatal(err);
			}
			done();
		});
	});

};
