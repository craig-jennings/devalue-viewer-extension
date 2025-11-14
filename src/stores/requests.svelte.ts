import { EnrichedRequest } from '../types/enriched-request';

class RequestStore {
	activeRequest = $state.raw<EnrichedRequest | null>(null);
	allRequests = $state<EnrichedRequest[]>([]);
	query = $state('');

	requests = $derived(
		this.allRequests.filter((req) => req.request.url.toLowerCase().includes(this.query.toLowerCase())),
	);

	add(request: EnrichedRequest): void {
		this.allRequests.push(request);
	}

	clear(): void {
		this.activeRequest = null;
		this.allRequests = [];
	}

	setActiveRequest(request: EnrichedRequest) {
		this.activeRequest = request;
	}
}

export const requestStore = new RequestStore();
