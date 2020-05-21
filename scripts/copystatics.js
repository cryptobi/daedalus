'use strict';

const fs = require('fs');
const copy = require('copy');

module.exports = {
  /*
    Unable to get static resources packaged using webpack,
    made manual copying routine.
  */
  addLibDistFiles:  function() {

      console.log("Copying static dependencies...")

      fs.mkdir('dist/font/data',
        { recursive: true }, (err) => {
          if (err) {
            return console.error(err);
          }
          console.log('Font directory created successfully.');
        });

      copy('./node_modules/pdfkit/js/font/data/*.afm', './dist/font/data', function(err, files) {
        if (err) throw err;
      });

      copy('./node_modules/fontkit/*.trie', './dist/main', function(err, files) {
        if (err) throw err;
      });

      copy('node_modules/linebreak/src/*.trie', './dist/main', function(err, files) {
        if (err) throw err;
      });

      console.log("DONE copying static dependencies.")
    }
};
