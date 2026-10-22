<script lang="ts">
	import { buttonClass } from '#lib/button.ts';
	import type { Project } from '#lib/data/projects.ts';
	import FlowDiagram from './FlowDiagram.svelte';
	import LinkButton from './LinkButton.svelte';
	import Modal from './Modal.svelte';
	import TerminalFrame from './TerminalFrame.svelte';

	let { project }: { project: Project } = $props();
</script>

<TerminalFrame path={project.path} label={project.name} class="h-full">
	<div class="flex h-full flex-col gap-4">
		<div>
			<h3 class="text-lg font-semibold tracking-tight">{project.name}</h3>
			<p class="mt-1 text-sm">{project.summary}</p>
		</div>

		<ul aria-label="Stack" class="flex flex-wrap gap-1.5 font-mono">
			{#each project.stack as item (item)}
				<li class="rounded-card border border-line-strong px-1.5 py-0.5 text-xs">{item}</li>
			{/each}
		</ul>

		<ul class="space-y-3 text-sm">
			{#each project.decisions as decision (decision.title)}
				<li class="border-l-2 border-accent pl-3">
					<span class="font-medium">{decision.title}.</span>
					<span class="text-muted">{decision.detail}</span>
				</li>
			{/each}
		</ul>

		<div class="mt-auto flex flex-wrap gap-2 pt-2">
			<!-- The dialog element is out of flow (display: none, or top layer when open). -->
			<Modal path="{project.path}/architecture" title="{project.name} architecture">
				{#snippet trigger(dialog)}
					<button {...dialog.trigger} class={buttonClass('secondary')}>
						View architecture<span class="sr-only"> of {project.name}</span>
					</button>
				{/snippet}
				<FlowDiagram label="Data flow for {project.name}" nodes={project.diagram} />
			</Modal>
			{#if project.demo}
				<LinkButton href={project.demo}>Live demo<span class="sr-only"> of {project.name}</span></LinkButton>
			{/if}
			<LinkButton href={project.repo}>GitHub<span class="sr-only"> repository for {project.name}</span></LinkButton>
		</div>
	</div>
</TerminalFrame>