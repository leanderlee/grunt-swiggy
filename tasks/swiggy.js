'use strict';

module.exports = function(grunt) {

	var fs = require('fs');
	var swig = require('swig');
	var path = require('path');

	grunt.registerMultiTask('swiggy', 'swig templater', function(tpl_context) {
		var options = this.options();
		var config = this;
		var context = tpl_context || '';
		var globalVars = {};

		if (options.swigDefaults) {
			swig.setDefaults(options.swigDefaults);
		}

		try {
			globalVars = grunt.util._.extend(options.data, grunt.file.readJSON(process.cwd() + '/global.json'));
		} catch (err) {
			globalVars = grunt.util._.clone(options.data);
		}

		this.files.forEach(function(f) {
			var from = f.src[0];
			var to = f.dest;

			if (!grunt.file.exists(from)) return;

			var dirFrom = path.dirname(from);
			var baseFrom = path.basename(from, path.extname(from));
			var dirTo = path.dirname(to);
			var baseTo = path.basename(to, path.extname(to));

			var jsons = {};
			jsons[dirFrom + "/global.json"] = true;
			jsons[dirTo + "/global.json"] = true;
			jsons[dirFrom + "/" + baseFrom + ".json"] = true;
			jsons[dirTo + "/" + baseTo + ".json"] = true;
			grunt.verbose.writeln("JSON: " + dirFrom + "/global.json");
			grunt.verbose.writeln("JSON: " + dirTo + "/global.json");
			grunt.verbose.writeln("JSON: " + dirFrom + "/" + baseFrom + ".json");
			grunt.verbose.writeln("JSON: " + dirTo + "/" + baseTo + ".json");

			var tplVars = {};
			Object.keys(jsons).forEach(function (file) {
				try {
					var fileVars = grunt.file.readJSON(file);
					if (fileVars) {
						tplVars = grunt.util._.extend(tplVars, fileVars);
					}
				} catch (err) {}
			});
			grunt.log.writeln(from + " -> " + to);
			grunt.verbose.writeln("Vars:", tplVars);

			tplVars.context = context;
			tplVars.tplFile = {
				path: dirFrom,
				basename: baseFrom
			};

			grunt.file.write(to, swig.renderFile(from, grunt.util._.extend({}, globalVars, tplVars)));
		});
	});
};
