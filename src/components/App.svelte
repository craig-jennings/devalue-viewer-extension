<script lang="ts">
	import { requestStore } from '../stores/requests.svelte';
	import { type EnrichedRequest } from '../types/enriched-request';
	import ActiveRequest from './ActiveRequest.svelte';
	import Header from './Header.svelte';
	import RequestList from './RequestList.svelte';
	import Resizable from './Resizable.svelte';

	/* -- Runes -- */
	$effect(() => {
		// Listen for messages from devtools.ts
		const handleMessage = (event: MessageEvent) => {
			if (event.data.type === 'NEW_REQUEST') {
				requestStore.add(event.data.request);
			} else if (event.data.type === 'BUFFERED_REQUESTS') {
				event.data.requests.forEach((r: EnrichedRequest) => requestStore.add(r));
			}
		};

		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	});

	/* -- Event Handlers -- */
</script>

<Header />

<main>
	<Resizable>
		<RequestList />
	</Resizable>

	<div class="request">
		<ActiveRequest />
	</div>
</main>

<style>
	main {
		display: flex;
		min-height: calc(100vh - var(--header-height));
	}

	.request {
		flex: 1 1 0;
		max-height: calc(100vh - var(--header-height));
		min-inline-size: 0;
		overflow-y: auto;
	}
</style>
