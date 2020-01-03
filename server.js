//server.js
// const http = require('http'),
// server = http.createServer();

// server.on('request',(request,response)=>{
//    response.writeHead(200,{'Content-Type':'text/plain'});
//    response.write('Goodbye world');
//    response.end();
// });

// server.listen(3000,()=>{
//   console.log('Node server created at port 3000');
// });

// "use strict";
// const express = require("express");
// const compression = require("compression");
// const http = require('http'),

// // const _port = 4100;
// const _app_folder = 'dist/club-members';

// const app = express();
// app.use(compression());


// // ---- SERVE STATIC FILES ---- //
// app.server.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// // ---- SERVE APLICATION PATHS ---- //
// app.all('*', function (req, res) {
//     res.status(200).sendFile(`/`, {root: _app_folder});
// });

// // ---- START UP THE NODE SERVER  ----
// app.listen(3000, () => {
//     console.log("Node Express server for Club Members listening on http://localhost:3000");
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const helmet = require('helmet');
// var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
// app.use(
//   helmet({
//     noCache: true
//   })
// );

// app.use(
//   hsts({
//     maxAge: 15552000 // 180 days in seconds
//   })
// );

app.use(
  express.static(path.join(__dirname, 'dist/club-members'), {
    etag: false
  })
);

app.get('/api/members', (req, res) => {
  request('http://localhost:3000/members', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// TODO: Dropdown!
app.get('/api/teams', (req, res) => {

});

// Submit Form!
app.post('/api/addMember', (req, res) => {

});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/club-members/index.html'));
});

app.listen('8000', () => {
  console.log('Node Express server for Club Members running on http://localhost:4200');
});
