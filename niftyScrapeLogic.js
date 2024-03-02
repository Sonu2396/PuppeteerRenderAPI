const puppeteer = require("puppeteer");
require("dotenv").config();

const niftyScrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    //headless: true,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
      "--incognito",
      "--lang=en-US,en;q=0.9",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {

    const now = new Date();

    // Convert the datetime to a Unix timestamp
    const param1 = Math.floor(now.getTime());

    const param2 = param1 - 1727980000;
    
    //const param1 = 1709099367994;
    //const param2 = 1707371387994;
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0')
    //await page.goto("https://api.investing.com/api/financialdata/17950/historical/chart?period=MAX&interval=PT5M&pointscount=160");

    //await page.goto("https://api.investing.com/api/financialdata/17950/historical/chart?period=MAX&interval=PT5M&pointscount=160", {

    //await page.goto("https://groww.in/v1/api/charting_service/v2/chart/delayed/exchange/NSE/segment/CASH/BANKNIFTY?endTimeInMillis=1702146580000&intervalInMinutes=5&startTimeInMillis=1700418600000", {
    const url = `https://groww.in/v1/api/charting_service/v2/chart/delayed/exchange/NSE/segment/CASH/NIFTY?endTimeInMillis=${param1}&intervalInMinutes=5&startTimeInMillis=${param2}`;

    //await page.goto("https://groww.in/v1/api/charting_service/v2/chart/delayed/exchange/NSE/segment/CASH/NIFTY?endTimeInMillis=${param1.toString()}&intervalInMinutes=5&startTimeInMillis=${param2.toString()}", {
     await page.goto(url ,  {
    waitUntil: "domcontentloaded",
  });
    
     // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
    //await page.waitForSelector('#myId').then(() => console.log('got it'));
     // await page.waitForFunction(() => {
      //    const content = document.body.textContent; // Adjust based on where data appears
      //    return content.includes('{"data":[');
     // }, { timeout: 265000 }); // Set an appropriate timeout
    //await page.waitForTimeout(2);
   
    

    // Type into search box
    //await page.type(".search-box__input", "automate beyond recorder");

    // Wait and click on first result
    //const searchResultSelector = ".search-box__link";
    //await page.waitForSelector(searchResultSelector);
    //await page.click(searchResultSelector);

    // Locate the full title with a unique string
    //const textSelector = await page.waitForSelector(
      //"text/Customize and automate"
   // );
    // Wait for JSON data to be available in the page content
    //await page.waitForFunction(() => {
     // return document.body.textContent.includes('data'); // Adjust if JSON structure is different
    //});

    const fullTitle = await page.evaluate(() => {
      return document.body.textContent;
    });

    //const fullTitle = JSON.parse(jsonText);
    
    //const fullTitle = await textSelector.evaluate((el) => el.textContent);

    // Print the full title
    const logStatement = `${fullTitle}`;
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { niftyScrapeLogic };
