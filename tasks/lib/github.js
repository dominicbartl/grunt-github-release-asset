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
/*
* options: {
	credentials: {
		username: '...',
		password: '...',
		token: '...'
	},
	repo: 'git@github.com:user/repo.git
}
*
*/
var Github = function (options) {
	this.options = options;
	this.headers = {
		'User-Agent': 'request/grunt-github-release-asset'
	};
	var authStr;
	if (options.credentials) {
		if (options.credentials.token) {
			authStr = options.credentials.token + ':' + '';
		} else if(options.credentials.username && options.credentials.password) {
			authStr = options.credentials.username + ':' + options.credentials.password;
		}
	}
	if (!authStr) {
		throw new Error('Please supply a token or username & password to authorize yourself.');
	}
	this.headers['Authorization'] = 'Basic ' + (new Buffer(authStr).toString('base64'))
	try {
		this.repoPath = options.repo.split(':')[1].split('.')[0].toLowerCase();
	} catch(err) {
		throw new Error('Repository url isn\'t provided or isn\'t valid.');
	}
}

Github.prototype.createRelease = function (tag, name, description, callback) {
	var url = this.getRepoUrl('releases');
	var data = {
		tag_name: tag,
		name: name ? name : tag,
		body: description
	};
	this._request('POST', url, data, callback);
};

Github.prototype.getReleases = function (callback) {
	this._request('GET', this.getRepoUrl('releases'), undefined, callback);
};

Github.prototype.getLatestTag = function (callback) {
	var url = this.getRepoUrl('tags');
	this._request('GET', url, undefined, callback);
};

Github.prototype.uploadAsset = function (releaseId, file, callback) {
	var url = this.getRepoUploadUrl('releases/' + releaseId + '/assets');
	var type = mime.lookup(file);
	var name = path.basename(file);

	url += '?name=' + name;
	var formData = {
		fileData: fs.readFileSync(file)
	};
	//fs.createReadStream(file).pipe(this._request('POST', url, undefined, callback));
	request({
		method: 'POST',
		url: url,
		headers: this.headers,
		formData: formData
	}, callbackWrapper(callback));
};

Github.prototype.createReleaseWithAsset = function (tag, name, description, file, callback) {
	var self = this;
	this.createRelease(tag, name, description, function (body) {
		body = JSON.parse(body);
		self.uploadAsset(body.id, file, callback);
	});
}

Github.prototype._request = function (method, url, body, callback) {
	return request({
		method: method,
		url: url,
		headers: this.headers,
		body: body ? JSON.stringify(body) : undefined,
		json: true,
	}, callbackWrapper(callback));
}

Github.prototype.getUrl = function (endpoint) {
	return 'https://' + endpoint;
}

Github.prototype.getRepoUrl = function (endpoint) {
	return this.getUrl('api.github.com/repos/' + this.repoPath + '/' + endpoint);
};

Github.prototype.getRepoUploadUrl = function (endpoint) {
	return this.getUrl('uploads.github.com/repos/' + this.repoPath + '/' + endpoint);
};

function callbackWrapper(callback) {
	return function (err, response, body) {
		if (response.statusCode === 401) {
			throw new Error("Not authorized, check your credentials.");
		} else {
			callback(err, body);
		}
	}
}
module.exports = Github;