export interface EnrichedRequest extends chrome.devtools.network.Request {
	_content?: string;
	_contentEncoding?: string;
}
