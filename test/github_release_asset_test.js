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
		repoName: 'grunt-github-release-asset'
	});
}

exports.githubAsset = {
	setUp: function(done) {

		done();
	},
	testGetLatestTag: function (test) {
		test.expect(1);

		auth().getLatestTag(function (err, response, body) {
			var tag = JSON.parse(body)[0];
			console.log(tag);
			test.equal(tag.name, 'test', 'Latest tag should be test');
			test.done();
		});

		
	}
};
