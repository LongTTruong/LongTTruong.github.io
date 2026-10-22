<script lang="ts">
	import { scenarios } from '#lib/data/playground.ts';
	import { Tabs } from 'melt/builders';
	import ScenarioRunner from './ScenarioRunner.svelte';

	let value = $state<string>(scenarios[0].id);

	const tabs = new Tabs({
		value: () => value,
		onValueChange: (next) => (value = next)
	});
</script>

<div>
	<div {...tabs.triggerList} class="flex gap-1 overflow-x-auto border-b border-line">
		{#each scenarios as scenario (scenario.id)}
			<button
				{...tabs.getTrigger(scenario.id)}
				class="focus-glow -mb-px border-b-2 border-transparent px-3 py-2 font-mono text-sm whitespace-nowrap text-muted transition-colors hover:text-fg aria-selected:border-accent aria-selected:text-accent"
			>
				{scenario.tab}
			</button>
		{/each}
	</div>

	{#each scenarios as scenario (scenario.id)}
		<div {...tabs.getContent(scenario.id)} class="pt-4">
			<ScenarioRunner {scenario} />
		</div>
	{/each}
</div>