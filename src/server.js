

var hljs = require('highlight.js');
var filters = require('jade').filters;
var jade = require('transform')('jade');
var express = require('express');
var app = express();

var marked = require('marked');

marked.setOptions({
  highlight: function (code, lang) {
    if (!lang) return;
    lang = lang.toLowerCase();
    if (lang === 'js') lang = 'javascript';
    if (lang === 'html') lang = 'xml';
    return hljs.highlight(lang, code).value;
  }
})

filters.jadesrc = require('./highlight-jade');
filters.htmlsrc = function (html) {
  return hljs.highlight('xml', html).value;
};
function escape(src) {
  return src.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
}

app.use('/public', express.static(__dirname + '/public'));

app.get('/', jade('./pages/index.jade'));
app.get('/tutorial', jade('./pages/tutorial.jade'));
app.get('/api', jade('./pages/api.jade'));
app.get('/command-line', jade('./pages/command-line.jade'));

app.listen(3000);

if (!process.env.STOP) console.log('Server listening on localhost:3000')