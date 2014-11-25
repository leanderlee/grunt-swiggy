# grunt-swiggy

> Introducing a better grunt-swig: grunt-swiggy!

## Getting Started
This plugin requires Grunt `0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-swiggy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-swiggy');
```

## The "swiggy" task

### Overview
In your project's Gruntfile, add a section named `swiggy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  swiggy: {
    dev: {
      options: {
        swigDefaults: {
          allowErrors: false,
          autoescape: true
        },
        data: {
          foo: {
            bar: 'yeah'
          }
        }
      },
      files: [{
        // ... Standard grunt selector
      }]
    }
  }
});
```

For each template found within src swiggy will look for a json file. It looks in the following order:
- `global.json` in the working directory
- `global.json` in the source folder
- `global.json` in the destination folder
- `source-filename.json` in the source directory
- `dest-filename.json` in the destination folder


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Todo

We need some unit tests.

