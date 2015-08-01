var express    = require('express');
var bodyParser = require('body-parser');
var logger     = require('morgan');
var session = require('express-session');
var passport = require('passport');

var app = express();
app.use(bodyParser.json());


// /Applications/MAMP/htdocs/socialNetProj/controllers
//
//app.get('/api/posts', function (req, res, next) {
//   Post.find(function (err, posts) {
//     if (err) { return next(err) }
//     res.json(posts)
//   })
//})
//
//app.post('/api/posts', function (req, res, next) {
//   var post = new Post({
//     username: req.body.username,
//     body:     req.body.body
//   })
//   post.save(function (err, post) {
//     if (err) { return next(err) }
//     res.status(201).json(post)
//   })
//})


app.get('/',function(req,res){
    //  res.sendfile('This is a test layout endpoint')
  res.sendfile('index.html')
});

app.get('/assets',function(req,res){
    //  res.sendfile('This is a test asset endpoint')
    res.sendfile('')
});

app.listen(3000, function () {
    // Say something cool that will help me know that the server was started
  console.log('server listening on %d', 3000)
});
