const http = require("http");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 3000;
const url = require("url");

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;
  let filePath = path.join(
    __dirname,
    "src",
    pathname === "/" ? "./site-customer/pages/index.html" : pathname
  );

  let extName = path.extname(filePath);
  let contentType = "text/html";

  switch (extName) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }
  try {
    res.writeHead(200, { "Content-Type": contentType });
    const readStream = fs.createReadStream(filePath);
    // Handling error event
    readStream.on("error", (err) => {
      console.log(err);
    });
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
});

server.listen(port, (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`Server listening at port ${port}...`);
    console.log(`Access :  Http://localhost:3000`);
  }
});
