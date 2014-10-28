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
var mime = require('mime');
var path = require('path');

var Github = function (options) {
	this.options = options;
}

Github.prototype.createRelease = function (tag, name, description, callback) {
	var url = this.getRepoUrl('releases');
	var data = {
		tag_name: tag,
		name: name ? name : tag,
		body: description
	};
	_request('POST', url, data, callback);
};

Github.prototype.getReleases = function (callback) {
	_request('GET', this.getRepoUrl('releases'), undefined, callback);
};

Github.prototype.getLatestTag = function (callback) {
	var url = this.getRepoUrl('tags');
	_request('GET', url, undefined, callback);
};

Github.prototype.uploadAsset = function (releaseId, file, callback) {
	var url = this.getRepoUploadUrl('releases/' + releaseId);
	var type = mime.lookup(file);
	var name = path.basename(file);

	url += '?name=' + name + '&contentType=' + type;
	console.log(url);
	var data = fs.readFileSync(file);
	//fs.createReadStream(file).pipe(_request('POST', url, undefined, callback));
	request({
		method: 'POST',
		url: url,
		headers: {
			'User-Agent': 'request'
		},
		body: data
	}, callback);
};

function _request(method, url, body, callback) {
	return request({
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

Github.prototype.getRepoUploadUrl = function (endpoint) {
	return this.getUrl('uploads.github.com/repos/' + this.options.credentials.username + '/' + this.options.repoName + '/' + endpoint);
};
module.exports = Github;