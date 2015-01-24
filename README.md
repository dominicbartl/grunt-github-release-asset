# grunt-github-release-asset [![npm version](https://badge.fury.io/js/grunt-github-release-asset.svg)](http://badge.fury.io/js/grunt-github-release-asset)

> Create releases and attach assets on Girhub.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-github-release-asset --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-github-release-asset');
```

## The "githubAsset" task
Run the task with ```grunt githubAsset```

Github allows you to create releases on tags. This grunt task allows you to create a release on the newest tag and attach a file to it.

### Authentication
Even though it's possible to use username and password to authenticate, it's recommended to use a token based authentication. In case your credentials get leaked you can easily revoke the token. Furthermore don't put your credentials in the Gruntfile, create a ```credentials.json``` and add it to .gitignore.

You can create a token at [Settings > Applications > Generate new token][1]. Enter ```grunt-github-release-asset``` as a name and assign only the ```repo``` permission. Copy the token into your credentials file.

### Options

#### options.credentials
Type: `object`

Token authentication (recommended)
```js
{
  token: '...'
}
```

Username & password authentication
```js
{
  username: '...',
  password: '...'
}
```

#### options.repo
Type: `String`

The git url of the repository. Must be git@github.com:user/repo.git

#### options.file
Type: `String`

The path to a single file relative to your grunt root.

#### options.releaseName
Type: `String`

Default: `{tag}`

The name of the release. By default it will use the tag name. `{tag}` is a placeholder and can be used inside another string.

### Usage Examples

```js
grunt.initConfig({
  githubAsset: {
    options: {
        credentials: grunt.file.readJSON('credentials.json'),
        repo: 'git@github.com:Bartinger/grunt-github-release-asset.git',
        file: 'project_build.zip',
        releaseName: 'Version {tag}'
     },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- **0.1.0** Initial release; Create a release and attach a single file.

[1]: https://github.com/settings/applications
