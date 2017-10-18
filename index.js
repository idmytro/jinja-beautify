#!/usr/bin/env node

const argv = require('yargs').argv
const fs = require('fs')
const beautifyHtml = require('js-beautify').html

function beautify (file) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err

    const jinjaTags = data
      .replace(/({#|{%|{{)/gi, '<jinja>$1')
      .replace(/(#}|%}|}})/gi, '$1<\/jinja>')

    const result = beautifyHtml(jinjaTags)
      .replace(/<jinja>({#|{%|{{)/gi, '$1')
      .replace(/(#}|%}|}})<\/jinja>/gi, '$1')

    fs.writeFile(file, result, err => {
      if (err) throw err
      if (data !== result) console.log('File ' + file + ' was beautified!')
    })
  })
}

argv._.forEach(beautify)
