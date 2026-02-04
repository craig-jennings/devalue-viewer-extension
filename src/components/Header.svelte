<script lang="ts">
	import { requestStore } from '../stores/requests.svelte';

	/* -- Runes -- */
	/* -- Event Handlers -- */
</script>

<div class="flex h-[var(--header-height)] items-center justify-between border-b border-zinc-500">
	<input bind:value={requestStore.query} placeholder="Filter" type="search" />

	<button title="Clear Request Log" onclick={() => requestStore.clear()}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="rotate-90"
		>
			<path d="M4.929 4.929 19.07 19.071" />
			<circle cx="12" cy="12" r="10" />
		</svg>
	</button>
</div>

<style>
	input {
		block-size: 100%;
		border: 1px solid transparent;
		flex: 1 1 0;
		font-size: 12px;
		padding-inline: 8px;

		&:focus {
			border-color: var(--color-zinc-400);
			outline: none;
		}
	}

	button {
		border-radius: 100vw;
		cursor: pointer;
		margin-inline: 4px;
		padding: 6px;
		transition:
			background-color 120ms ease-out,
			filter 120ms ease-out;

		&:hover {
			background-color: var(--color-zinc-700);
		}

		&:active {
			filter: brightness(0.8);
		}
	}
</style>
