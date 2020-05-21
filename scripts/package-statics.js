'use strict';

const cstatics = require('./copystatics');

// manually copy static files missed by webpack
cstatics.addLibDistFiles();
