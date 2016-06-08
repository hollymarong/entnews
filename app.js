var express = require('express')
var cheerio = require('cheerio')
var superCharset = require('superagent-charset')
var superagent = require('superagent')
var iconv = require('iconv-lite')
var app = express();

app.get('/', function(req, res, next){
  superagent = superCharset(superagent);
  superagent.get('http://ent.163.com/')
    .charset('gbk')
    .end(function(err, sres){
      if(err){
         next(err);
       }
      var html = sres.text;
      var $ = cheerio.load(html);
      var items = [];
      $('.news_textList_section_title a').each(function(idx, element){
        var $element = $(element);
        items.push({
          title: $element.text().trim(),
          href: $element.attr("href")
        })
      })

      res.send(items);
    })
})

app.listen(process.env.PORT || 3000, function(req, res){
  console.log('app is running at port 3000')
})
