export class ScraperFetchError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ScraperFetchError';
	}
}

export class ScraperInvalidUriError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ScraperInvalidUriError';
	}
}
