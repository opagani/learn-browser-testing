import puppeteer from 'puppeteer';
import fs from 'fs';

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setRequestInterception(true)

page.on('request', async request => {
	if (request.url().includes('/product/v1/product')) {
		await request.respond({
			status: 200,
			contentType: 'application/json',
			body: fs.readFileSync('./mock-response-sainsburys.json')
		})
	} else {
		await request.continue();
	}
});

await page.setViewport({ width: 1280, height: 800 })
await page.goto('https://www.sainsburys.co.uk/gol-ui/product/vita-coco-coconut-oil-500ml')
await page.screenshot({ path: 'assets/sainsburys.png', fullPage: true })

await browser.close();