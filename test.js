var fs = require('fs'),
    Fiber = require('fibers'),
    augment = require('./')

// Augment a list of functions
augment(fs, {
  include: ['readdir', 'stat']
})

// readdir and stat are now augmented

Fiber(function() {
  // Get a list of files in the directory
  var fileNames = fs.readdir('.').wait()
  console.log('Found '+ fileNames.length+ ' files')

  // Stat each file
  for (var ii = 0; ii < fileNames.length; ++ii) {
    console.log(fs.stat(fileNames[ii]).wait())
  }
}).run()