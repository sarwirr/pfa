const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

const port = 8888;

app.listen(port, () => {
  console.log("Server accessible on http://127.0.0.1:" + port);
});
