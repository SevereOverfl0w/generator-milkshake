'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

// hic sunt dracones


var MilkshakeGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Milkshake generator!'));

    var prompts = [
        {
          type: 'list',
          name: 'css',
          message: 'Which CSS preprocessor would you like use?',
          choices: ['css', 'less', 'scss'],
          default: 'less' 
        },
        {
          type: 'confirm',
          name: 'coffee',
          message: 'Would you like to enable CoffeeScript?',
          default: true
        },
        {
          type: 'confirm',
          name: 'jade',
          message: 'Would you like to use Jade templating?',
          default: true
        }
    ];

    this.prompt(prompts, function (props) {
      for (var option in props){
          this[option] = props[option];
      }
      //this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  app: function () {
    //this.mkdir('app');
    //this.mkdir('app/templates');
    this.mkdir('app/bower_components');

    // Jade/HTML
    if (this.jade){
        this.copy('layout.jade', 'app/layout.jade');
        this.copy('index.jade', 'app/index.jade');
    } else {
        this.copy('index.html', 'app/index.html');
    }

    // Styles
    this.copy('main.' + this.css, 'app/styles/main.' + this.css);

    // Scripts
    var scriptExt = this.coffee ? 'coffee' : 'js';
    this.copy('main.' + scriptExt, 'app/scripts/main.' + scriptExt);

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');
  }
});

module.exports = MilkshakeGenerator;
