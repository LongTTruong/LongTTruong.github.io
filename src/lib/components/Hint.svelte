<script lang="ts">
	import { Tooltip } from 'melt/builders';

	interface Props {
		label: string;
		hint: string;
	}

	let { label, hint }: Props = $props();

	// forceVisible keeps the content in the DOM so CSS can animate it.
	const tooltip = new Tooltip({
		forceVisible: true,
		openDelay: () => 200
	});
</script>

<button
	type="button"
	{...tooltip.trigger}
	class="focus-glow cursor-help rounded-card text-accent underline decoration-dotted underline-offset-4 transition-colors hover:text-accent-bright"
>
	{label}
</button>

<!-- Absolutely positioned, so it never affects layout (no CLS). -->
<div
	{...tooltip.content}
	class="pointer-events-none absolute z-50 w-max max-w-64 rounded-card border border-line-strong bg-surface px-3 py-1.5 text-xs text-fg opacity-0 transition-opacity duration-150 data-open:pointer-events-auto data-open:opacity-100"
>
	{hint}
</div>