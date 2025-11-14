import { EnrichedRequest } from './types/enriched-request';

const requestBuffer: EnrichedRequest[] = [];
let panelWindow: Window | null = null;

async function enrichRequest(request: chrome.devtools.network.Request): Promise<EnrichedRequest> {
	return new Promise((resolve) => {
		request.getContent((content, encoding) => {
			const enriched = request as EnrichedRequest;
			enriched._content = content;
			enriched._contentEncoding = encoding;

			resolve(enriched);
		});
	});
}

chrome.devtools.network.onRequestFinished.addListener(async (request) => {
	// Only capture fetch/XHR requests
	const type = request.request.url.includes('chrome-extension://')
		? 'other'
		: ((request as any)._resourceType || '').toLowerCase();

	if (type === 'fetch' || type === 'xhr') {
		// `getContent` doesn't survive serialization, so we need to fetch it now
		const enrichedRequest = await enrichRequest(request);

		if (panelWindow) {
			panelWindow.postMessage({ type: 'NEW_REQUEST', request: enrichedRequest }, '*');
		} else {
			requestBuffer.push(enrichedRequest);
		}
	}
});

chrome.devtools.panels.create('Devalue', '', 'src/panel.html', (panel) => {
	console.log('Devalue viewer panel created');

	panel.onShown.addListener((window) => {
		panelWindow = window;

		if (requestBuffer.length > 0) {
			window.postMessage({ type: 'BUFFERED_REQUESTS', requests: requestBuffer }, '*');
			requestBuffer.length = 0;
		}
	});

	panel.onHidden.addListener(() => {
		panelWindow = null;
	});
});
