'use strict'

module.exports = () => {
  var help = require('./helptext.json')
  return help.join('\n')
}
