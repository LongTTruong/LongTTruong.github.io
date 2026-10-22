<script lang="ts">
	interface FlowNode {
		label: string;
		detail: string;
	}

	let { nodes, label }: { nodes: readonly FlowNode[]; label: string } = $props();
</script>

<!-- An ordered list: the order is the data flow, so it reads correctly with a screen reader. -->
<ol aria-label={label} class="flow flex flex-col gap-6 lg:flex-row lg:gap-8">
	{#each nodes as node (node.label)}
		<li class="relative min-w-0 flex-1 rounded-card border border-line-strong bg-bg p-3">
			<p class="font-mono text-sm text-accent">{node.label}</p>
			<p class="mt-1 text-xs text-muted">{node.detail}</p>
		</li>
	{/each}
</ol>

<style>
	/* Connector between nodes; length matches the gap (1.5rem stacked, 2rem inline). */
	.flow > li:not(:last-child)::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 100%;
		width: 1px;
		height: 1.5rem;
		background: var(--color-accent);
	}

	@media (min-width: 64rem) {
		.flow > li:not(:last-child)::after {
			left: 100%;
			top: 50%;
			width: 2rem;
			height: 1px;
		}
	}
</style>