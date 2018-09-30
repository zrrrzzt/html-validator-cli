#!/usr/bin/env node
'use strict'

const fs = require('fs')
const validator = require('html-validator')
const getHelpText = require('./lib/getHelpText')
const pkg = require('./package.json')
const query = process.argv[2]
const argv = require('minimist')((process.argv.slice(2)))
let options = {
  format: 'text',
  ignore: argv.ignore
}

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
  options.url = argv._[0]
}

if (argv.format && !argv.ignore) {
  options.format = argv.format
}

if (argv.url) {
  options.url = argv.url
}

if (argv.validator) {
  options.validator = argv.validator
}

if (argv.headers) {
  options.headers = JSON.parse(argv.headers)
}

if (argv.file) {
  options.data = fs.readFileSync(argv.file)
}

if (argv.data) {
  options.data = argv.data
}

validator(options, (error, data) => {
  if (error) {
    console.error(error)
    process.exitCode = 1
  } else {
    let msg
    let validationFailed = false

    if (options.format === 'json') {
      const errors = data.messages.filter(isError)
      msg = JSON.stringify(data, null, 2)
      if (errors.length > 0) {
        validationFailed = true
        if (argv.quiet) {
          msg = JSON.stringify(errors, null, 2)
        }
      }
    } else if (options.ignore) {
      msg = data
      if (data.includes('Error')) {
        validationFailed = true
      }
    } else {
      msg = data
      if (data.includes('There were errors')) {
        validationFailed = true
      }
    }
    if (validationFailed) {
      if (!argv.verbose && !argv.quiet) {
        console.log('Page is not valid')
      }
      if (argv.verbose || argv.quiet) {
        console.log(msg)
      }
      process.exitCode = 1
    } else {
      if (!argv.verbose && !argv.quiet) {
        console.log('Page is valid')
      }
      if (argv.verbose) {
        console.log(msg)
      }
    }
  }
})
