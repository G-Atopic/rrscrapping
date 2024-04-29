import puppeteer from 'puppeteer';

export const scrapper = async (id) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.royalroad.com/profile/${id}`);

  const data = await page.evaluate(() => {
    console.log('enter page');
    const table = document.querySelector('.table');
    console.log('found table', !!table);
    const tableLocation = table.childNodes[1].querySelectorAll('tr')[3];
    const locationString = tableLocation.querySelector('td');

    const tableLastActive = table.childNodes[1].querySelectorAll('tr')[1];
    const lastActive = tableLastActive.querySelector('td');

    if (table) {
      return {
        location: locationString.textContent,
        lastActive: lastActive.textContent,
      };
    } else {
      return 'Element not found';
    }
  });
  const regex = /(?:Brasil|Brazil)/gi;
  const isBrasil = data.location.match(regex);

  await browser.close();
  return {
    id,
    location: isBrasil ? isBrasil[0] : 'gringo',
    lastActive: data.lastActive.replace(/\s+/g, ''),
  };
};
