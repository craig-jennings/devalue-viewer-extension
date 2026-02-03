<script lang="ts">
	import { requestStore } from '../stores/requests.svelte';

	/* -- Runes -- */
	/* -- Event Handlers -- */
</script>

<div class="flex h-12 items-center justify-between gap-2 border-b border-zinc-500 px-2 py-1">
	<input
		bind:value={requestStore.query}
		class="w-[300px] rounded-lg border border-zinc-400 p-2"
		placeholder="Filter requests..."
	/>

	<button class="p-2 hover:cursor-pointer" title="Delete Requests" onclick={() => requestStore.clear()}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path
				d="M3 6h18"
			/>
			<path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
		</svg>
	</button>
</div>

<style>
	input {
		inline-size: calc(300px - var(--spacing) * 4);
	}

	button {
		border: 1px solid transparent;
		border-radius: 8px;
		cursor: pointer;
		transition:
			border-color 0.2s ease-out,
			filter 0.2s ease-out;

		&:hover {
			border-color: var(--color-zinc-400);
		}

		&:active {
			filter: brightness(0.8);
		}
	}
</style>
