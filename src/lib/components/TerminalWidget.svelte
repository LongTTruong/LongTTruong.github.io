<script lang="ts">
	import { status } from '#lib/data/status.ts';
	import Hint from './Hint.svelte';
	import TerminalFrame from './TerminalFrame.svelte';

	let { class: className = '' }: { class?: string } = $props();
</script>

<TerminalFrame path={status.path} label="Current status" class={className}>
	<p class="prompt font-mono text-sm">{status.command}</p>

	<!-- Stacks on mobile (key above value), two columns from sm up. -->
	<dl class="mt-3 grid font-mono text-sm sm:grid-cols-[6.5rem_1fr] sm:gap-x-4 sm:gap-y-2">
		<dt class="text-muted">status</dt>
		<dd class="mb-3 flex items-center gap-2 last:mb-0 sm:mb-0">
			<span aria-hidden="true" class="size-2 rounded-full bg-accent"></span>
			<Hint label={status.availability.label} hint={status.availability.hint} />
		</dd>

		{#each status.rows as row (row.key)}
			<dt class="text-muted">{row.key}</dt>
			<dd class="mb-3 last:mb-0 sm:mb-0">
				{#if typeof row.value === 'string'}
					{row.value}
				{:else}
					<ul class="flex flex-wrap gap-1.5">
						{#each row.value as item (item)}
							<li class="rounded-card border border-line-strong px-1.5 py-0.5 text-xs">{item}</li>
						{/each}
					</ul>
				{/if}
			</dd>
		{/each}
	</dl>
</TerminalFrame>