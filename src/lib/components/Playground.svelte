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
	<!-- The border lives on this non-scrolling wrapper. The scroller below overlaps it by 1px
	     (-mb-px) so the active underline sits on the line. overflow-y-hidden is explicit because
	     overflow-x-auto otherwise makes the y axis scroll too, which showed a stray scrollbar. -->
	<div class="border-b border-line">
		<div {...tabs.triggerList} class="-mb-px flex gap-1 overflow-x-auto overflow-y-hidden">
			{#each scenarios as scenario (scenario.id)}
				<!-- Inward focus ring: an outer ring or glow would be clipped by the scroller. -->
				<button
					{...tabs.getTrigger(scenario.id)}
					class="border-b-2 border-transparent px-3 py-2 font-mono text-sm whitespace-nowrap text-muted transition-colors hover:text-fg focus-visible:-outline-offset-2 aria-selected:border-accent aria-selected:text-accent"
				>
					{scenario.tab}
				</button>
			{/each}
		</div>
	</div>

	{#each scenarios as scenario (scenario.id)}
		<div {...tabs.getContent(scenario.id)} class="pt-4">
			<ScenarioRunner {scenario} />
		</div>
	{/each}
</div>