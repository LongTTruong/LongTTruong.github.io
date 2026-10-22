<script lang="ts">
	import { buttonClass } from '#lib/button.ts';
	import type { Scenario } from '#lib/data/playground.ts';
	import TerminalFrame from './TerminalFrame.svelte';

	let { scenario }: { scenario: Scenario } = $props();

	let index = $state(0);
	const step = $derived(scenario.steps[index]);
	const lastIndex = $derived(scenario.steps.length - 1);
</script>

<p class="max-w-2xl text-sm text-muted">{scenario.summary}</p>

<TerminalFrame path={scenario.path} label="{scenario.title}, simulated run" class="mt-4">
	<ol class="flex gap-1" aria-hidden="true">
		{#each scenario.steps as s, i (s.title)}
			<li class="h-1 flex-1 rounded-card transition-colors {i <= index ? 'bg-accent' : 'bg-line-strong'}"></li>
		{/each}
	</ol>

	<p aria-live="polite" class="mt-3 font-mono text-sm">
		Step {index + 1} of {scenario.steps.length}: {step.title}
	</p>

	<p class="prompt mt-3 font-mono text-sm wrap-break-word">{step.command}</p>

	<!-- Fixed height so stepping never moves the controls; scrollable and keyboard-focusable. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<pre
		tabindex="0"
		aria-label="Simulated output"
		class="mt-2 h-60 overflow-auto rounded-card border border-line bg-bg p-3 font-mono text-xs"><code
			>{step.output}</code
		></pre>

	<p class="mt-3 min-h-12 text-sm text-muted">{step.note}</p>

	<div class="mt-3 flex flex-wrap gap-2">
		<button
			type="button"
			class={buttonClass('secondary')}
			disabled={index === 0}
			onclick={() => (index -= 1)}
		>
			Back
		</button>
		<button
			type="button"
			class={buttonClass('primary')}
			disabled={index === lastIndex}
			onclick={() => (index += 1)}
		>
			Next
		</button>
		<button
			type="button"
			class={buttonClass('secondary')}
			disabled={index === 0}
			onclick={() => (index = 0)}
		>
			Reset
		</button>
	</div>
</TerminalFrame>