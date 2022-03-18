'use strict';

const fractal = module.exports = require('@frctl/fractal').create();

/* SET TITLES */
fractal.set('project.title', 'Reiheacht | Component Libary');
fractal.set('project.version', 'v1.0');
fractal.set('project.author', 'jeromehaas');

/* DEFINE COMPONENTS DIRECTORY */
fractal.components.set('path', __dirname + '/components');
fractal.components.set('ext', '.hbs');

/* DEFINE ASSETS DIRECTORY */
fractal.web.set('static.path', __dirname + '/public');

/* DEFINE BUILD DIRECTORY */
fractal.web.set('builder.dest', __dirname + '/build');

/* DEFINE PREVIEW LAYOUT */
fractal.components.set('default.preview', '@preview');