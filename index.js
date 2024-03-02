const express = require("express");

const { scrapeLogic } = require("./scrapeLogic");
const app = express();

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


const PORT = process.env.PORT || 4000;

app.get("/scrape", (req, res) => {
  const param1 = req.query.param1;
  const param2 = req.query.param2;    
  scrapeLogic(res);
});


app.get("/niftyScrapeLogic", (req, res) => {
  const param1 = req.query.param1;
  const param2 = req.query.param2;    
  niftyScrapeLogic(res);
});


//app.get("/scrape", (req, res) => {
//  scrapeLogic(res);
//});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
