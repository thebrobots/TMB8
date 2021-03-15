const express = require("express");
const app = express();
const port = 8080;
app.get("/", (req, res) => res.send("YBF8 is Alive!"));

app.listen(port, () =>
  console.log(`YBF8 is listening to http://localhost:${port}`)
);
