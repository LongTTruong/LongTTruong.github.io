<script lang="ts">
	import { buttonClass } from '#lib/button.ts';
	import { roles, stack, type RoleId, type StackItem } from '#lib/data/stack.ts';
	import FilterChip from './FilterChip.svelte';
	import TerminalFrame from './TerminalFrame.svelte';

	// One flag per role. Nothing pressed means no highlighting.
	let active = $state(
		Object.fromEntries(roles.map((role) => [role.id, false])) as Record<RoleId, boolean>
	);

	const selectedLabels = $derived(
		roles
			.filter((role) => active[role.id])
			.map((role) => role.label)
			.join(', ')
	);
	const anyActive = $derived(selectedLabels !== '');

	// A skill matches when it carries at least one selected role.
	const isMatch = (item: StackItem) => item.tags.some((tag) => active[tag]);

	const total = stack.reduce((count, group) => count + group.items.length, 0);
	const matchCount = $derived(
		stack.reduce((count, group) => count + group.items.filter(isMatch).length, 0)
	);

	function clear() {
		for (const role of roles) active[role.id] = false;
	}
</script>

<div class="flex flex-wrap items-center gap-2">
	<div role="group" aria-label="Highlight skills by role" class="flex flex-wrap gap-2">
		{#each roles as role (role.id)}
			<FilterChip label={role.label} bind:pressed={active[role.id]} />
		{/each}
	</div>
	<button type="button" class={buttonClass('secondary')} disabled={!anyActive} onclick={clear}>
		Clear
	</button>
</div>

<p aria-live="polite" class="mt-3 font-mono text-xs text-muted">
	{#if anyActive}
		Highlighting {matchCount} of {total} skills for {selectedLabels}
	{:else}
		Select a role to highlight the skills it uses
	{/if}
</p>

<div class="mt-4 grid gap-6 md:grid-cols-2">
	{#each stack as group (group.id)}
		<TerminalFrame path="~/stack/{group.id}" label={group.title}>
			<div class="flex items-baseline justify-between gap-2">
				<h4 class="font-medium">{group.title}</h4>
				{#if anyActive}
					<span class="font-mono text-xs text-muted">
						{group.items.filter(isMatch).length}/{group.items.length}
					</span>
				{/if}
			</div>
			<ul class="mt-3 flex flex-wrap gap-1.5 font-mono">
				{#each group.items as item (item.name)}
					{@const match = isMatch(item)}
					<li
						class="rounded-card border px-2 py-1 text-xs transition-[opacity,color,border-color,background-color] {anyActive
							? match
								? 'border-accent bg-accent/10 text-accent-bright'
								: 'border-line-strong opacity-50'
							: 'border-line-strong'}"
					>
						{item.name}{#if anyActive && match}<span class="sr-only"> (relevant)</span>{/if}
					</li>
				{/each}
			</ul>
		</TerminalFrame>
	{/each}
</div>