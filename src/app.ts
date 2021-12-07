import dotenv from 'dotenv';
dotenv.config();

import Scraper from './scraper';

// TODO need to clean strings for any excess whitespace, newlines, etc.

async function main() {
	try {
		// Initialize Scraper.
		const scraper: Scraper = new Scraper(
			`${process.env.PARAMOUNT_SPORTS_BASE_URI}${process.env.PARAMOUNT_SPORTS_BIKES_URI}`
		);
		// Fetch the page.
		await scraper.fetch();
		// Get all of the product listing titles.
		const productListings: string[] = scraper.queryAll(
			'div[class="col-xs-6 col-sm-4 seProduct"]',
			'div[class="seProductTitle"]'
		);
		console.log(productListings); // TODO REMOVE
		// TODO Search for a product listing that matches our search query.
		// TODO If found, get the url for that product listing. Else log result.
		// TODO Fetch URL for our product.
		// TODO Get the available sizes.
		// TODO Ensure size is a match.
		// TODO Send message containing product title, price, size, available colours and date.
		// TODO Log result.
	} catch (error) {
		console.log('An error occured while running the scraper.');
		if (process.env.NODE_ENV === 'development') {
			console.error(error);
		}
	}
}

main();
