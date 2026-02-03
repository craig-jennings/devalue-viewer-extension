<script lang="ts">
	import { requestStore } from '../stores/requests.svelte';
	import { type EnrichedRequest } from '../types/enriched-request';
	import ActiveRequest from './ActiveRequest.svelte';
	import Header from './Header.svelte';
	import RequestList from './RequestList.svelte';

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
	const handleDrag = (e: DragEvent) => {
		const newX = e.clientX;

		// Skip the last drag event where clientX is 0
		if (newX === 0) return;

		document.documentElement.style.setProperty('--sidebar-width', `${newX}px`);
	};
</script>

<Header />

<div class="grid">
	<RequestList />

	<div
		class="separator h-full w-full cursor-col-resize bg-zinc-500"
		ondrag={handleDrag}
		role="separator"
		tabindex="-1"
	></div>

	<div class="min-w-0">
		<ActiveRequest />
	</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: var(--sidebar-width, 200px) 1px 1fr;
		min-height: calc(100vh - 48px);
	}

	.separator {
		position: relative;

		&:hover::after {
			background-color: oklch(0 0 0 / 0.1);
			block-size: 100%;
			content: '';
			inline-size: 4px;
			position: absolute;
			z-index: 1;
		}
	}
</style>
