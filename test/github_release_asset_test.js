'use strict';

var grunt = require('grunt');
var Github = require('../tasks/lib/github');
var credentials = require('../credentials');
/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

function auth() {
	return new Github({
		credentials: credentials,
		repo: 'git@github.com:Bartinger/grunt-github-release-asset.git'
	});
}

function time() {
	return new Date().toString();
}

exports.githubAsset = {
	setUp: function(done) {
		done();
	},
	/*testGetLatestTag: function (test) {
		test.expect(1);
		auth().getLatestTag(function (body) {
			var tag = JSON.parse(body)[0];
			test.equal(tag.name, 'test', 'Latest tag should be test');
			test.done();
		});
	},
	testCreateRelease: function (test) {
		test.expect(0);
		test.done();
		return;
		var name = 'A release ' + time()
		auth().createRelease('test', name, 'A release description ' + time(), function (err, response, body) {
			var body = JSON.parse(body);
			//test.equal(body.name, name, 'The release should be named ' + name);
			test.done();
		});
	},
	testGetReleases: function (test) {
		test.expect(0);
		test.done();
		return;
		auth().getReleases(function (err, response, body) {
			if (err) {
				console.log(err);
			};
			body = JSON.parse(body);
			for (var i = body.length - 1; i >= 0; i--) {
				console.log(body[i].id + ': ' + body[i].name);
			};
			test.done();
		});
	},
	testUploadAsset: function (test) {
		var file = 'phantom.zip';
		test.done();
		return;
		auth().uploadAsset(658652, file, function (err, response, body) {
			if (err) {
				console.log(err);
			}
			test.done();
		});
	},
	testCreateReleaseWithAsset: function (test) {
		test.expect(0);
		var name = 'A release ' + time();
		var file = 'phantom.zip'
		auth().createReleaseWithAsset('test', name, 'A release description ' + time(), file, function (err, response, body) {
			
			test.done();
		});
	}*/
};
