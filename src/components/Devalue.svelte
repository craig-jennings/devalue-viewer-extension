<script lang="ts">
	import { parse } from 'devalue';

	interface Props {
		content: string;
	}

	/* -- Runes -- */
	let { content }: Props = $props();

	const parsedContent = $derived.by(() => {
		const json = JSON.parse(content);
		let acc: Record<string, unknown> = {};

		for (const key in json) {
			try {
				// Attempt to parse as devalue-encoded string
				const parsed = parse(json[key]);

				acc[key] = parsed;
			} catch {
				try {
					// Attempt to parse base64-encoded devalue string
					const decoded = atob(json[key] as string);

					//	Remove the first entry of the array because it's throw-away values
					const decodedJson = JSON.parse(decoded).slice(1);

					const parsed = parse(JSON.stringify(decodedJson));

					acc[key] = parsed;
				} catch {
					acc[key] = json[key];
				}
			}
		}

		return acc;
	});

	/* -- Event Handlers -- */
</script>

<pre class="text-zinc-100">{JSON.stringify(parsedContent, null, 2)}</pre>
