<script lang="ts">
	import { requestStore } from '../stores/requests.svelte';

	/* -- Runes -- */
	/* -- Event Handlers -- */
</script>

<div class="flex h-12 items-center border-b border-zinc-500 px-2 py-1">
	<input
		bind:value={requestStore.query}
		class="w-[300px] rounded-lg border border-zinc-400 p-2"
		placeholder="Filter requests..."
	/>
</div>

<style>
	input {
		inline-size: calc(300px - var(--spacing) * 4);
	}
</style>
