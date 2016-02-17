# Autocode 

[![Travis](https://img.shields.io/travis/ctate/autocode.svg)](https://travis-ci.org/ctate/autocode)
[![Gitter](https://img.shields.io/gitter/room/ctate/autocode.svg)](http://gitter.im/ctate/autocode)

> spec-driven code generator

# Table of Contents

- [Install](#install)
- [Generators](#projects)
- [Documentation](#docs)

<a name="install"></a>

# Install

Use `npm` to install Autocode:

```sh
npm install autocode -g
```

<a name="projects"></a>

# Generators

<table width="100%">
  <tr>
    <td>
      <a href="https://github.com/ctate/angular">
        <img width="50" src="https://rawgit.com/ctate/angular/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/angular">ctate/angular</a></b></div>
      Generates an Angular app
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/asciinema">
        <img width="50" src="https://rawgit.com/ctate/asciinema/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/asciinema">ctate/asciinema</a></b></div>
      Generates an Asciicast
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/backbone">
        <img width="50" src="https://rawgit.com/ctate/backbone/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/backbone">ctate/backbone</a></b></div>
      Generates a Backbone app
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/bower">
        <img width="50" src="https://rawgit.com/ctate/bower/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/bower">ctate/bower</a></b></div>
      Generates Bower config and package files
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/cocoapods">
        <img width="50" src="https://rawgit.com/ctate/cocoapods/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/cocoapods">ctate/cocoapods</a></b></div>
      Generates a Podfile
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/coffeescript">
        <img width="50" src="https://rawgit.com/ctate/coffeescript/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/coffeescript">ctate/coffeescript</a></b></div>
      Transforms CoffeeScript into JavaScript
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/composer">
        <img width="50" src="https://rawgit.com/ctate/composer/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/composer">ctate/composer</a></b></div>
      Generates a Composer package file
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/cordova">
        <img width="50" src="https://rawgit.com/ctate/cordova/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/cordova">ctate/cordova</a></b></div>
      Generates a Cordova app
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/django">
        <img width="50" src="https://rawgit.com/ctate/django/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/django">ctate/django</a></b></div>
      Generates a Django app
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/docker">
        <img width="50" src="https://rawgit.com/ctate/docker/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/docker">ctate/docker</a></b></div>
      Generates a Dockerfile
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/editorconfig">
        <img width="50" src="https://rawgit.com/ctate/editorconfig/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/editorconfig">ctate/editorconfig</a></b></div>
      Generates an .editorconfig file
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/electron">
        <img width="50" src="https://rawgit.com/ctate/electron/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/electron">ctate/electron</a></b></div>
      Generates an Electron app
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/eslint">
        <img width="50" src="https://rawgit.com/ctate/eslint/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/eslint">ctate/eslint</a></b></div>
      Generates an .eslintrc file
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/express">
        <img width="50" src="https://rawgit.com/ctate/express/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/express">ctate/express</a></b></div>
      Generates an Express app
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/feathers">
        <img width="50" src="https://rawgit.com/ctate/feathers/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/feathers">ctate/feathers</a></b></div>
      Generates a Feathers app
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/git">
        <img width="50" src="https://rawgit.com/ctate/git/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/git">ctate/git</a></b></div>
      Generates `.gitignore` and `.gitkeep` files
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/google-analytics">
        <img width="50" src="https://rawgit.com/ctate/google-analytics/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/google-analytics">ctate/google-analytics</a></b></div>
      Generates tracking code for Google Analytics
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/grunt">
        <img width="50" src="https://rawgit.com/ctate/grunt/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/grunt">ctate/grunt</a></b></div>
      Generates a Gruntfile
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/handlebars">
        <img width="50" src="https://rawgit.com/ctate/handlebars/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/handlebars">ctate/handlebars</a></b></div>
      Renders Handlebars templates for generators
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/hosts">
        <img width="50" src="https://rawgit.com/ctate/hosts/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/hosts">ctate/hosts</a></b></div>
      Generates a HOSTS file
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/httpd">
        <img width="50" src="https://rawgit.com/ctate/httpd/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/httpd">ctate/httpd</a></b></div>
      Generates a `apache.conf` file
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/ini">
        <img width="50" src="https://rawgit.com/ctate/ini/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/ini">ctate/ini</a></b></div>
      Renders INI files for generators
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/jade">
        <img width="50" src="https://rawgit.com/ctate/jade/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/jade">ctate/jade</a></b></div>
      Renders Jade templates for generators
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/javascript">
        <img width="50" src="https://rawgit.com/ctate/javascript/master/.autocode/icon.svg" />
      <a/>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/javascript">ctate/javascript</a></b></div>
      Transforms JavaScript into beautiful JavaScript
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/jshint">
        <img width="50" src="https://rawgit.com/ctate/jshint/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/jshint">ctate/jshint</a></b></div>
      Generates a `.jshintrc` file
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/json">
        <img width="50" src="https://rawgit.com/ctate/json/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/json">ctate/json</a></b></div>
      Renders JSON files for generators
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/laravel">
        <img width="50" src="https://rawgit.com/ctate/laravel/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/laravel">ctate/laravel</a></b></div>
      Generates a Laravel app
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/license">
        <img width="50" src="https://rawgit.com/ctate/license/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/license">ctate/license</a></b></div>
      Generates a LICENSE file
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/martini">
        <img width="50" src="https://rawgit.com/ctate/martini/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/martini">ctate/martini</a></b></div>
      Generates a Martini app
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/model">
        <img width="50" src="https://rawgit.com/ctate/model/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/model">ctate/model</a></b></div>
      Model Schema
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/npm">
        <img width="50" src="https://rawgit.com/ctate/npm/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/npm">ctate/npm</a></b></div>
      Generates `package.json` and `.npmignore` files
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/php">
        <img width="50" src="https://rawgit.com/ctate/php/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/php">ctate/php</a></b></div>
      Generates `php.ini` files
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/pip">
        <img width="50" src="https://rawgit.com/ctate/pip/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/pip">ctate/pip</a></b></div>
      Generates `requirements.txt` files
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/rails">
        <img width="50" src="https://rawgit.com/ctate/rails/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/rails">ctate/rails</a></b></div>
      Generates a Rails app
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/raml">
        <img width="50" src="https://rawgit.com/ctate/raml/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/raml">ctate/raml</a></b></div>
      Schemas for RAML
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/redis">
        <img width="50" src="https://rawgit.com/ctate/redis/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/redis">ctate/redis</a></b></div>
      Generates a `redis.conf` file
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/rubygems">
        <img width="50" src="https://rawgit.com/ctate/rubygems/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/rubygems">ctate/rubygems</a></b></div>
      Generates a `Gemfile`
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/sequelize">
        <img width="50" src="https://rawgit.com/ctate/sequelize/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/sequelize">ctate/sequelize</a></b></div>
      Generates models for Sequelize
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/swagger">
        <img width="50" src="https://rawgit.com/ctate/swagger/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/swagger">ctate/swagger</a></b></div>
      Schemas for Swagger
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/travis">
        <img width="50" src="https://rawgit.com/ctate/travis/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/travis">ctate/travis</a></b></div>
      Generates a `.travis.yml` file
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/vagrant">
        <img width="50" src="https://rawgit.com/ctate/vagrant/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/vagrant">ctate/vagrant</a></b></div>
      Generates a `Vagrantfile`
    </div>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ctate/watchman">
        <img width="50" src="https://rawgit.com/ctate/watchman/master/.autocode/icon.svg" />
      </a>
    </td>
    <td>
      <div><b><a href="https://github.com/ctate/watchman">ctate/watchman</a></b></div>
      Generates a `.watchmanconfig` file
    </div>
  </tr>
</table>

<a name="docs"></a>

# Documentation

View Autocode's Official Documentation here:

[https://autocode.readme.io](https://autocode.readme.io)

