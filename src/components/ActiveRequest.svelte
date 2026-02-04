<script lang="ts">
	import { requestStore } from '../stores/requests.svelte';
	import { getResponseBody } from '../utils/get-response-body.ts';
	import Devalue from './Devalue.svelte';

	/* -- Runes -- */
	let activeTab = $state<'REQUEST' | 'RESPONSE' | 'DEVALUED'>('REQUEST');

	let content = $derived(await getResponseBody(requestStore.activeRequest));
	let request = $derived(requestStore.activeRequest?.request);

	/* -- Event Handlers -- */
</script>

{#if content}
	<div class="flex max-h-full flex-col gap-[5px] bg-zinc-800">
		<div role="tablist" class="tabs">
			<button
				role="tab"
				class={['tab', activeTab === 'REQUEST' ? 'active' : '']}
				onclick={() => (activeTab = 'REQUEST')}>Request</button
			>
			<button
				role="tab"
				class={['tab', activeTab === 'RESPONSE' ? 'active' : '']}
				onclick={() => (activeTab = 'RESPONSE')}>Response</button
			>
			<button
				role="tab"
				class={['tab', activeTab === 'DEVALUED' ? 'active' : '']}
				onclick={() => (activeTab = 'DEVALUED')}>Devalued</button
			>
		</div>

		<div class={['tab-panel', activeTab === 'REQUEST' ? 'block' : 'hidden']}>
			<svelte:boundary>
				{@const data = JSON.parse(request?.postData?.text || '{}')}

				<Devalue
					content={JSON.stringify({
						...data,
						payload: data.payload ? atob(data.payload) : undefined,
					})}
				/>

				{#snippet failed()}
					Invalid JSON Request
				{/snippet}
			</svelte:boundary>
		</div>

		<div class={['tab-panel', activeTab === 'RESPONSE' ? 'block' : 'hidden']}>
			<svelte:boundary>
				<pre class="min-w-0 text-zinc-50">{JSON.stringify(JSON.parse(content), null, 2)}</pre>

				{#snippet failed()}
					Invalid JSON Response
				{/snippet}
			</svelte:boundary>
		</div>

		<div class={['tab-panel', activeTab === 'DEVALUED' ? 'block' : 'hidden']}>
			<Devalue {content} />
		</div>
	</div>
{/if}

<style>
	.tabs {
		display: flex;
		gap: calc(var(--spacing) * 2);
		padding-inline: 4px;
	}

	.tab {
		color: var(--color-zinc-400);
		cursor: pointer;
		font-size: 14px;
		padding: calc(var(--spacing));

		&.active {
			border-bottom: 2px solid var(--color-zinc-300);
			color: var(--color-zinc-50);
		}
	}

	.tab-panel {
		border-block-start: 1px solid var(--color-zinc-400);
		overflow: auto;
		padding: calc(var(--spacing) * 2);
	}
</style>
