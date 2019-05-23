const express = require("express");

const routes = require("./routes")
const db = require("./models")

const app = express();

// environment variable PORT or 3000 if unset
const port = process.env.PORT || 3000;

// Add middleware for parsing the body to req.body
// middlewares are executed in the order added, so add before routes
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.models = db.models
  next()
})

app.use('/', routes)

// Start up the database, then the server and begin listen to requests
db.connectDb().then(() => {
  const listener = app.listen(port, () => {
    console.info(`Server is listening on port ${listener.address().port}.`);
  })
});