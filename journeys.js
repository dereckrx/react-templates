const puppeteer = require('puppeteer');

(async () => {
  try {
    // const browser = await puppeteer.launch({headless: false});
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:63342/web_kata/react_template.html');

    const oldCount = await page.$$('.item > label').length
    const input = await page.$('#new-item-input');
    await input.type('foobar');
    await page.keyboard.press('Enter');
    await page.$$('.item > label').then((items) => {
      if(oldCount == items.length) {
        console.log('FAIL')
      } else {
        console.log('PASS')
      }
    });

    await browser.close();
  } catch(error) {
    console.log('--> ', error);
  }
})();
