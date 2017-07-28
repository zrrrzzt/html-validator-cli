'use strict'

module.exports = () => {
  const help = require('./helptext.json')
  return help.join('\n')
}
