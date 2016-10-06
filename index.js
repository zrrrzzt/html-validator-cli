#!/usr/bin/env node
'use strict'

var fs = require('fs')
var validator = require('html-validator')
var getHelpText = require('./lib/getHelpText')
var pkg = require('./package.json')
var query = process.argv[2]
var argv = require('minimist')((process.argv.slice(2)))
var opts = {format: 'text'}
const isError = item => item.type === 'error'

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

if (argv.data) {
  opts.data = argv.data
}

validator(opts, function (error, data) {
  if (error) {
    console.error(error)
    process.exitCode = 1
  } else {
    var msg
    var validationFailed = false

    if (opts.format === 'json') {
      const errors = data.messages.filter(isError)
      msg = JSON.stringify(data, null, 2)
      if (errors.length > 0) {
        validationFailed = true
      }
    } else {
      msg = data
      if (data.includes('There were errors')) {
        validationFailed = true
      }
    }
    if (validationFailed) {
      if (!argv.verbose) {
        console.log('Page is not valid')
      }
      process.exitCode = 1
    } else {
      if (!argv.verbose) {
        console.log('Page is valid')
      }
    }
    if (argv.verbose) {
      console.log(msg)
    }
  }
})
