<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		axis?: 'x' | 'y';
		children: Snippet;
	}

	let { axis = 'x', children }: Props = $props();

	let resizing = false;
	let size = $state(150);
</script>

<svelte:window
	onmouseup={() => (resizing = false)}
	onmousemove={({ pageX }) => {
		if (!resizing) return;

		size = pageX;
	}}
/>

<aside class={axis} style:--size="{size}px">
	<div class="content">{@render children()}</div>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="{axis} resize" onmousedown={() => (resizing = true)}></div>
</aside>

<style>
	aside {
		display: grid;
		max-height: calc(100vh - var(--header-height));
		overflow-y: auto;

		&.x {
			grid-template-columns: 1fr auto;
		}
	}

	.content {
		inline-size: var(--size);
		overflow-y: auto;
	}

	.resize {
		background: var(--color-zinc-400);
		inline-size: 4px;
		left: 0;
		top: 0;
		transition: background 200ms ease-out;

		&:hover {
			background: var(--color-zinc-300);
		}

		&.x {
			bottom: 0;
			cursor: ew-resize;
			inline-size: 0.2rem;
		}
	}
</style>
