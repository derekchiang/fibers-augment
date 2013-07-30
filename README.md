# fibers-augment

Augment objects/namespaces to user [fibers](https://github.com/laverdet/node-fibers).

## Usage

```js
var fs = require('fs')
var augment = require('fibers-augment')

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
```

You may also use `exclude`, in which case every function other than the listed onces will be augmented.  e.g.

```js
augment(fs, {exclude: ['exists']})
```

Or, to augment all functions:

```js
augment(fs)
```