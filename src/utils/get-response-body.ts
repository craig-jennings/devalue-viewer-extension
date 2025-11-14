import { EnrichedRequest } from '../types/enriched-request';

export async function getResponseBody(request: EnrichedRequest | null): Promise<string | null> {
	if (request?._content !== undefined) {
		let content = request._content;

		if (request._contentEncoding === 'base64') {
			content = atob(content);
		}

		return content;
	}

	return null;
}
