#!/usr/bin/env node
'use strict'

var fs = require('fs')
var validator = require('html-validator')
var getHelpText = require('./lib/getHelpText')
var pkg = require('./package.json')
var query = process.argv[2]
var argv = require('minimist')((process.argv.slice(2)))
var opts = {format: 'text'}

if (!query || process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
  console.log(getHelpText())
  process.exit(0)
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
  console.log(pkg.version)
  process.exit(0)
}

if (query.indexOf('http') !== -1) {
  opts.url = argv._[0]
}

if (argv.format) {
  opts.format = argv.format
}

if (argv.url) {
  opts.url = argv.url
}

if (argv.validator) {
  opts.validator = argv.validator
}

if (argv.file) {
  opts.data = fs.readFileSync(argv.file)
}

validator(opts, function (error, data) {
  if (error) {
    console.error(error)
    process.exit(1)
  } else {
    console.log(opts.format === 'json' ? JSON.stringify(data) : data)
  }
})
