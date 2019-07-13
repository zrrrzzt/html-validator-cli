#!/usr/bin/env node
(async () => {
  const fs = require('fs')
  const validator = require('html-validator')
  const getHelpText = require('./lib/getHelpText')
  const pkg = require('./package.json')
  const query = process.argv[2]
  const argv = require('minimist')((process.argv.slice(2)))
  const options = {
    format: 'text',
    ignore: argv.ignore
  }

  const isError = item => item.type === 'error'
  const pageNotFound = item => item.type === 'non-document-error'

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

  if (argv.islocal) {
    options.isLocal = true
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

  try {
    const data = await validator(options)
    let msg
    let validationFailed = false
    let documentNotFound = false

    if (options.format === 'json') {
      const errors = data.messages.filter(isError)
      const notFound = data.messages.filter(pageNotFound)
      msg = JSON.stringify(data, null, 2)
      if (errors.length > 0 || notFound.length > 0) {
        validationFailed = true
        documentNotFound = notFound.length > 0
        if (argv.quiet) {
          msg = JSON.stringify(errors, null, 2)
        }
      }
    } else if (options.ignore) {
      msg = data
      if (data.includes('Error')) {
        validationFailed = true
      }
      if (data.includes('non-document-error')) {
        documentNotFound = true
      }
    } else {
      msg = data
      if (data.includes('There were errors') || data.includes('non-document-error')) {
        validationFailed = true
        documentNotFound = data.includes('non-document-error')
      }
    }
    if (validationFailed) {
      if (!argv.verbose && !argv.quiet) {
        console.log(documentNotFound ? 'Page not found' : 'Page is not valid')
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
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  }
})()
