const express = require('express')
const serveIndex = require('serve-index')
const app = express()
app.use(express.static(__dirname + '/coding'))
app.use(serveIndex(__dirname + '/coding'))
app.listen(4001)
console.log('Listening 4001.')
