<script lang="ts">
	import { requestStore } from '../stores/requests.svelte';
	import { getResponseBody } from '../utils/get-response-body.ts';
	import Devalue from './Devalue.svelte';

	/* -- Runes -- */
	let activeTab = $state<'RESPONSE' | 'DEVALUED'>('RESPONSE');

	let content = $derived(await getResponseBody(requestStore.activeRequest));

	/* -- Event Handlers -- */
</script>

{#if content}
	<div class="flex flex-col gap-2 bg-zinc-800 px-4 pt-2 pb-4">
		<div role="tablist" class="tabs">
			<button
				role="tab"
				class={['tab', activeTab === 'RESPONSE' ? 'tab-active' : '']}
				onclick={() => (activeTab = 'RESPONSE')}>Response</button
			>
			<button
				role="tab"
				class={['tab', activeTab === 'DEVALUED' ? 'tab-active' : '']}
				onclick={() => (activeTab = 'DEVALUED')}>Parsed</button
			>
		</div>

		<div
			class={['overflow-x-auto rounded-xl border border-zinc-400 p-2', activeTab === 'RESPONSE' ? 'block' : 'hidden']}
		>
			<svelte:boundary>
				<pre class="min-w-0">{JSON.stringify(JSON.parse(content), null, 2)}</pre>

				{#snippet failed()}
					Invalid JSON response
				{/snippet}
			</svelte:boundary>
		</div>

		<div
			class={['overflow-x-auto rounded-xl border border-zinc-400 p-2', activeTab === 'DEVALUED' ? 'block' : 'hidden']}
		>
			<Devalue {content} />
		</div>
	</div>
{/if}

<style>
	.tabs {
		display: flex;
		gap: calc(var(--spacing) * 2);
	}

	.tab {
		color: var(--color-zinc-400);
		cursor: pointer;
		font-size: 14px;
		padding: calc(var(--spacing));
	}

	.tab-active {
		border-bottom: 2px solid var(--color-zinc-300);
		color: var(--color-zinc-50);
	}
</style>
