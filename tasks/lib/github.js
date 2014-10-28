/*
 * grunt-github-release-asset
 * https://github.com/bartinger/grunt-github-release-asset
 *
 * Copyright (c) 2014 Dominic Bartl
 * Licensed under the MIT license.
 */

'use strict';
var request = require('request');
var fs = require('fs');

var Github = function (options) {
	this.options = options;
}

Github.prototype.createRelease = function (tag, name, description, callback) {
	var url = this.getUrl('releases');
	var data = {
		tag_name: tag,
		name: name ? name : tag,
		body: description
	};
	_request('POST', url, data, callback);
};

Github.prototype.getLatestTag = function(callback) {
	var url = this.getRepoUrl('tags');
	_request('GET', url, undefined, callback);
};

function _request(method, url, body, callback) {
	request({
		method: method,
		url: url,
		headers: {
			'User-Agent': 'request'
		},
		body: body ? JSON.stringify(body) : undefined
	}, callback);
}

Github.prototype.getUrl = function (endpoint) {
	return 'https://' + this.options.credentials.username + ':' + this.options.credentials.password + '@' + endpoint;
}

Github.prototype.getRepoUrl = function (endpoint) {
	return this.getUrl('api.github.com/repos/' + this.options.credentials.username + '/' + this.options.repoName + '/' + endpoint);
};
module.exports = Github;