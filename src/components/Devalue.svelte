<script lang="ts">
	import { parseDevalue } from '../utils/parse-devalue';

	interface Props {
		content: string;
	}

	/* -- Runes -- */
	let { content }: Props = $props();

	const parsedContent = $derived.by(() => {
		const json = JSON.parse(content);
		let acc: Record<string, unknown> = {};

		for (const key in json) {
			acc[key] = parseDevalue(json[key]);
		}

		return acc;
	});

	/* -- Event Handlers -- */
</script>

<pre class="text-zinc-100">{JSON.stringify(parsedContent, null, 2)}</pre>
