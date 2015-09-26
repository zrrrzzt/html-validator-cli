'use strict'

var tap = require('tap')
var getHelpText = require('../lib/getHelpText')
var helpText = require('../lib/helptext.json').join('\n')

tap.equal(helpText, getHelpText(), 'It returns correct helptext')
