# fibers-augment

Augment objects/namespaces to use [fibers](https://github.com/laverdet/node-fibers).

## Usage

```js
var fs = require('fs'),
    Fiber = require('fibers'),
    augment = require('fibers-augment')

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

Sometimes you might find it helpful to augment a prototype:

```js
augment(SomeClass.prototype)
```

## Limitations

This library assumes that the asynchronous functions being augmented are implemented with the conventional callback paradigm, namely having a callback as its last argument, and that the callback is called with two arguments, with the first argument being error and the second argument being the result of the asynchronous function.  All node.js standard library functions are implemented this way.

## License

[WTFPL](http://www.wtfpl.net/).