<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Shown in the header, e.g. "~/projects/control-plane". */
		path: string;
		/** Accessible name for the group. */
		label: string;
		children: Snippet;
		class?: string;
	}

	let { path, label, children, class: className = '' }: Props = $props();
</script>

<div
	role="group"
	aria-label={label}
	class="flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-colors focus-within:border-accent {className}"
>
	<div class="border-b border-line px-4 py-2 font-mono text-sm text-muted">
		<code>{path}</code>
		<span aria-hidden="true" class="text-accent">$</span>
	</div>
	<div class="flex-1 p-4">
		{@render children()}
	</div>
</div>