import axios, { AxiosResponse } from 'axios';
import { JSDOM } from 'jsdom';
import urlRegex from 'url-regex';

import { ScraperFetchError, ScraperInvalidUriError } from './types';

export interface IScraper {
	fetch(uri: string): Promise<void>;
	query(query: string): string | null;
	queryAll(
		initialQuery: string,
		subQuery: string,
		contentType: ContentType
	): string[];
}

export enum ContentType {
	TextContent,
	Href,
}

export default class Scraper implements IScraper {
	private uri: string;
	private document: Document;

	constructor(uri: string) {
		if (!urlRegex({ exact: true }).test(uri)) {
			throw new ScraperInvalidUriError(`${uri} is not valid.`);
		}
		this.uri = uri;
	}

	async fetch(uri: string = null): Promise<void> {
		if (uri && urlRegex({ exact: true }).test(uri)) {
			this.uri = uri;
		} else if (uri && !urlRegex({ exact: true }).test(uri)) {
			throw new ScraperInvalidUriError(`${uri} is not valid.`);
		}
		try {
			const response: AxiosResponse = await axios.get(this.uri);
			this.document = new JSDOM(response.data).window.document;
		} catch (error) {
			throw new ScraperFetchError(
				error?.message ??
					error ??
					`An unknown error occured while fetching document from ${this.uri}`
			);
		}
	}

	query(query: string): string | null {
		const element: Element = this.document.querySelector(query);
		return element?.textContent?.trim() ?? null;
	}

	queryAll(
		initialQuery: string,
		subQuery: string,
		contentType: ContentType = ContentType.TextContent
	): string[] {
		const queryResult: string[] = [];
		const elements: NodeListOf<Element> =
			this.document.querySelectorAll(initialQuery);
		for (let i = 0; i < elements.length; i++) {
			const subElement = elements[i].querySelector(subQuery);
			if (contentType === ContentType.TextContent && subElement?.textContent) {
				queryResult.push(subElement.textContent.trim());
			} else if (
				contentType === ContentType.Href &&
				subElement?.getAttribute('href')
			) {
				queryResult.push(
					`${process.env.PARAMOUNT_SPORTS_BASE_URI}${subElement
						.getAttribute('href')
						.trim()}`
				);
			}
		}
		return queryResult;
	}
}
