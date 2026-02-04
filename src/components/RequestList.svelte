<script lang="ts">
	import { requestStore } from '../stores/requests.svelte';

	/* -- Runes -- */
	/* -- Event Handlers -- */
</script>

<ul>
	{#each requestStore.requests as request (request.time)}
		<li class={['border-b border-zinc-500', requestStore.activeRequest === request ? 'bg-zinc-700' : 'bg-transparent']}>
			<button
				class="flex w-full cursor-pointer items-center justify-start gap-2 p-2 text-start"
				type="button"
				onclick={() => requestStore.setActiveRequest(request)}
			>
				<div
					class={['rounded-xl px-2 py-1 text-xs', request.request.method === 'POST' ? 'bg-emerald-500' : 'bg-sky-500']}
				>
					{request.request.method}
				</div>

				<svelte:boundary>
					{@const url = new URL(request.request.url)}

					<div class="truncate">
						{url.pathname.split('/').at(-1)}{url.search}
					</div>
				</svelte:boundary>
			</button>
		</li>
	{/each}
</ul>

<style>
	ul {
		overflow: auto;
	}
</style>
