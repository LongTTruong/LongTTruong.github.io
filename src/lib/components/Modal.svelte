<script lang="ts">
	import { Dialog } from 'melt/builders';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Terminal-style path shown in the header. */
		path: string;
		/** Accessible name and visible heading. */
		title: string;
		/** Renders the element that opens the dialog; spread `dialog.trigger` onto it. */
		trigger: Snippet<[Dialog]>;
		children: Snippet;
	}

	let { path, title, trigger, children }: Props = $props();

	let open = $state(false);
	const titleId = $props.id();

	const dialog = new Dialog({
		open: () => open,
		onOpenChange: (value) => (open = value)
	});

	// Light dismiss: a click on the backdrop targets the <dialog> itself.
	// Uses addEventListener so Melt's own handlers on the content element stay intact.
	function lightDismiss(node: HTMLDialogElement) {
		const handler = (event: MouseEvent) => {
			if (event.target === node) open = false;
		};
		node.addEventListener('click', handler);
		return () => node.removeEventListener('click', handler);
	}
</script>

{@render trigger(dialog)}

<dialog
	{...dialog.content}
	{@attach lightDismiss}
	aria-labelledby={titleId}
	class="m-auto max-h-[calc(100dvh-2rem)] w-[min(56rem,calc(100%-2rem))] overflow-hidden rounded-card border border-line-strong bg-surface p-0 text-fg backdrop:bg-bg/80"
>
	<div class="flex max-h-[calc(100dvh-2rem)] flex-col">
		<div
			class="flex items-center justify-between gap-4 border-b border-line px-4 py-2 font-mono text-sm text-muted"
		>
			<span>
				<code>{path}</code>
				<span aria-hidden="true" class="text-accent">$</span>
			</span>
			<button
				type="button"
				onclick={() => (open = false)}
				class="focus-glow rounded-card border border-line-strong px-2 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent-bright"
			>
				Close
			</button>
		</div>
		<div class="overflow-y-auto p-4 sm:p-6">
			<h2 id={titleId} class="text-lg font-semibold tracking-tight">{title}</h2>
			<div class="mt-4">
				{@render children()}
			</div>
		</div>
	</div>
</dialog>

<style>
	dialog[open] {
		animation: modal-in 150ms ease-out;
	}

	@keyframes modal-in {
		from {
			opacity: 0;
		}
	}
</style>