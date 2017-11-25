#!/usr/bin/env node

const argv = require('yargs').argv
const fs = require('fs')
const beautifyHtml = require('js-beautify').html

export function beautifyJinja (code) {
  const codeWithJinjaTags = code
    .replace(/({#|{%|{{)/gi, '<jinja>$1')
    .replace(/(#}|%}|}})/gi, '$1<\/jinja>')

  const result = beautifyHtml(codeWithJinjaTags)
    .replace(/<jinja>({#|{%|{{)/gi, '$1')
    .replace(/(#}|%}|}})<\/jinja>/gi, '$1')

  return result
}

function beautifyFile (file) {
  fs.readFile(file, 'utf8', (err, code) => {
    if (err) throw err

    const result = beautifyJinja(code)

    fs.writeFile(file, result, err => {
      if (err) throw err
      if (data !== result) console.log('File ' + file + ' was beautified!')
    })
  })
}

argv._.forEach(beautifyFile)
