'use strict'

const tap = require('tap')
const fs = require('fs')
const exec = require('child_process').execFile
const getHelpText = require('../lib/getHelpText')
const pkgVersion = require('../package.json').version

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

tap.test('It returns error on validation failure', function testError (test) {
  exec('./index.js', ['--file=test/data/invalid.html'], function versionWithV (error, stdout, stderr) {
    tap.equal(error.code, 1, 'It returns error.code 1')
    test.equal(stdout.toString().trim(), 'Page is not valid', 'Expected message to stdout')
    test.end()
  })
})

tap.test('It returns correct message on validation success', function testSuccess (test) {
  exec('./index.js', ['--file=test/data/valid.html'], (error, stdout, stderr) => {
    if (error) {
      throw error
    }
    test.equal(stdout.toString().trim(), 'Page is valid', 'Expected message to stdout')
    test.end()
  })
})

tap.test('It returns data if file supplied', function testError (test) {
  exec('./index.js', ['--file=test/data/valid.html'], function versionWithV (error, stdout, stderr) {
    if (error) {
      throw error
    }
    test.ok(stdout.toString().trim(), 'Data OK')
    test.end()
  })
})

tap.test('It returns data if data supplied', function testError (test) {
  const data = fs.readFileSync('test/data/valid.html', 'utf-8')
  const cmd = `--data=${data}`
  exec('./index.js', [cmd], (error, stdout, stderr) => {
    if (error) {
      throw error
    }
    test.ok(stdout.toString().trim(), 'Data OK')
    test.end()
  })
})

tap.test('It returns data in supplied format for success', function testError (test) {
  exec('./index.js', ['--file=test/data/valid.html', '--format=json', '--verbose'], function versionWithV (error, stdout, stderr) {
    if (error) {
      throw error
    }
    test.equal(JSON.parse(stdout.toString().trim()).messages.length, 0)
    test.end()
  })
})

tap.test('It returns data in supplied format for failures', function testError (test) {
  exec('./index.js', ['--file=test/data/invalid.html', '--format=json', '--verbose'], function versionWithV (error, stdout, stderr) {
    if (error) {
      console.error(error)
    }
    test.equal(JSON.parse(stdout.toString().trim()).messages.length, 1)
    test.end()
  })
})

tap.test('You can supply url by flag', function testError (test) {
  exec('./index.js', ['--url=https://www.google.com', '--verbose'], function versionWithV (error, stdout, stderr) {
    if (error) {
      console.error(error)
    }
    test.ok(stdout.toString().trim(), 'Data OK')
    test.end()
  })
})

tap.test('You can use another validator', function testError (test) {
  exec('./index.js', ['--file=test/data/valid.html', '--validator=http://html5.validator.nu'], function versionWithV (error, stdout, stderr) {
    if (error) {
      throw error
    }
    test.ok(stdout.toString().trim(), 'Data OK')
    test.end()
  })
})

tap.test('It supports ignore', function testError (test) {
  const str = 'Error: Stray end tag “div”.'
  exec('./index.js', ['--file=test/data/invalid.html', `--ignore=${str}`], function versionWithV (error, stdout, stderr) {
    if (error) {
      throw error
    }
    test.equal(stdout.toString().trim(), 'Page is valid', 'Expected message to stdout')
    test.end()
  })
})
