'use strict'

var exec = require('child_process').execFile
var tap = require('tap')
var getHelpText = require('../lib/getHelpText')
var pkgVersion = require('../package.json').version

tap.test('It returns helptext with -h flag', function helpTextWithH (test) {
  exec('./index.js', ['-h'], function helpTextWithH (error, stdout, stderr) {
    if (error) {
      console.error(stderr.toString())
      throw error
    } else {
      test.equal(stdout.toString().trim(), getHelpText().toString().trim())
      test.end()
    }
  })
})

tap.test('It returns helptext with --help flag', function helpTextWithH (test) {
  exec('./index.js', ['--help'], function helpTextWithH (error, stdout, stderr) {
    if (error) {
      console.error(stderr.toString())
      throw error
    } else {
      test.equal(stdout.toString().trim(), getHelpText().toString().trim())
      test.end()
    }
  })
})

tap.test('It returns version with -v flag', function versionWithV (test) {
  exec('./index.js', ['-v'], function versionWithV (error, stdout, stderr) {
    if (error) {
      console.error(stderr.toString())
      throw error
    } else {
      test.equal(stdout.toString().trim(), pkgVersion)
      test.end()
    }
  })
})

tap.test('It returns error on error', function testError (test) {
  exec('./index.js', ['npmlovesyou-do-you-love-npm'], function versionWithV (error, stdout, stderr) {
    test.ok(error, 'Error OK')
    test.end()
  })
})

tap.test('It returns data if url supplied', function testError (test) {
  exec('./index.js', ['https://www.github.com'], function versionWithV (error, stdout, stderr) {
    if (error) {
      throw error
    }
    test.ok(stdout.toString().trim(), 'Data OK')
    test.end()
  })
})

tap.test('It returns data if file supplied', function testError (test) {
  exec('./index.js', ['--file=test/data/invalid.html'], function versionWithV (error, stdout, stderr) {
    if (error) {
      throw error
    }
    test.ok(stdout.toString().trim(), 'Data OK')
    test.end()
  })
})

tap.test('It returns data on supplied supplied format', function testError (test) {
  exec('./index.js', ['--file=test/data/invalid.html', '--format=json'], function versionWithV (error, stdout, stderr) {
    if (error) {
      throw error
    }
    test.equal(JSON.parse(stdout.toString().trim()).messages.length, 3)
    test.end()
  })
})

tap.test('You can supply url by flag', function testError (test) {
  exec('./index.js', ['--url=https://www.github.com'], function versionWithV (error, stdout, stderr) {
    if (error) {
      throw error
    }
    test.ok(stdout.toString().trim(), 'Data OK')
    test.end()
  })
})

tap.test('You can use another validator', function testError (test) {
  exec('./index.js', ['https://www.github.com', '--validator=http://html5.validator.nu'], function versionWithV (error, stdout, stderr) {
    if (error) {
      throw error
    }
    test.ok(stdout.toString().trim(), 'Data OK')
    test.end()
  })
})
