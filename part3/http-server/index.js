console.log("hello world");

const http = require("http");

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const app = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" }); // application/json informs the reciever that the data is in JSON format instead of text/plain
  res.end(JSON.stringify(notes));
});

const PORT = 3001;

app.listen(PORT);

console.log(`Server is running on port ${PORT}`);
