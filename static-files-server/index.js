const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express();

// serve static assets normally
app.use(express.static(path.join(__dirname, '../client')));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
  if (~request.url.indexOf('.js')) {
    response.sendFile(path.resolve(__dirname, '../client/src/dist/js/index.js'));
  } else {
response.sendFile(path.resolve(__dirname, '../client', 'index.html'))
  }
  
});

app.listen(port);
console.log("server started on port " + port);