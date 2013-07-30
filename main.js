var Future = require('fibers/future'),
    fs = require('fs')

function isFunction(obj) {
  return typeof obj === 'function'
}

function contains(lst, obj) {
  return [].indexOf.call(lst, obj) > -1
}

function augment(obj, filter) {
  var includes, excludes, augmentAll

  if (arguments.length >= 2) {
    includes = filter['include']
    excludes = filter['exclude']
  } else if (arguments.length == 1) {
    augmentAll = true
  } else {
    throw new Error('You need to give at least one argument.')
  }

  for (var key in obj) {
    original = obj[key]
    if (augmentAll || (includes && contains(includes, key)) ||
      (excludes && !contains(excludes, key))) {
      if (isFunction(original)) {
        obj[key] = Future.wrap(original)
      }
    }
  }
}

module.exports = augment