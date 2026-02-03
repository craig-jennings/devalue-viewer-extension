<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		axis?: 'x' | 'y';
		children: Snippet;
	}

	let { axis = 'x', children }: Props = $props();

	let resizing = false;
	let size = $state(350);
</script>

<svelte:window
	onmouseup={() => (resizing = false)}
	onmousemove={({ pageX: x, pageY: y }) => {
		if (!resizing) return;

		size = axis === 'x' ? window.innerWidth - 8 - x : window.innerHeight - 8 - y;
	}}
/>

<aside class={axis} style="{axis === 'x' ? 'width' : 'height'}: {size}px">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="{axis} resize" onmousedown={() => (resizing = true)}></div>
	<div>{@render children()}</div>
</aside>

<style>
	aside {
		display: grid;
		max-height: calc(100vh - var(--header-height));
		overflow: auto;

		&.x {
			grid-template-columns: auto 1fr;
		}
		&.y {
			grid-template-rows: auto 1fr;
		}
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

		&.y {
			block-size: 0.2rem;
			cursor: ns-resize;
			right: 0;
		}
	}
</style>
