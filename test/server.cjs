// Examples of using pure Node.js (without express)

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
   // console.log(req.url, req.method)
   // We can deinitely use a switch here
   if (req.url === "/") {
      // This way we can write each section of the page and send the html from server to client (we can send other type of data as well)
      res.setHeader('Content-Type', 'text/html');
      res.write("<head><link rel='stylesheet' href='#'></head>");
      res.write("<h1>Hello</h1>");
      res.statusCode = 200;
      res.end();
   } else if (req.url === "/html") {
      // Send an html file fully
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      fs.readFile('./views/index.html', (err, data) => {
         if (err) {
            console.log(err);
            res.end();
         } else {
            res.write(data);
            res.end();
            //or res.end(data)
         }
      });
   } else if ((req.url === "/about")) {
      // Redirects from one route to other with correct status code
      res.statusCode = 301;
      res.setHeader('Location', '/html');
      res.end();
   } else {
      res.statusCode = 404;
      res.end("404! Render a not-found page here!");
   }
})

server.listen(3000, 'localhost', () => {
   console.log("Server is running on PORT 3000")
})


//================================================================
// // View Engines - Views (html) can directly render dynamic html with dynamic values Eg: ejs (package)
// app.set('view engine', 'ejs') //ejs will automatically look for files inside a folder called views

// app.get('/', (req, res) => {
//    res.render('index'); //Directly specify the file name
// })

// // Passing data into the views
// // In the route
// app.get('/', (req, res) => {
//    res.render('index', { title: 'Home' });
// })
// // In the view
// // <p><%= title %></p>

// // We can set and send full dynamic html files to the client by the above approach.
// // Furthermore we can separate the file contents as partials and can add styles as well.
// // So that we can send fully rendered html files to the client, this is SSR using Node.js