<script lang="ts">
	import { Toggle } from 'melt/builders';

	interface Props {
		label: string;
		pressed?: boolean;
	}

	let { label, pressed = $bindable(false) }: Props = $props();

	const toggle = new Toggle({
		value: () => pressed,
		onValueChange: (value) => (pressed = value)
	});
</script>

<button
	type="button"
	{...toggle.trigger}
	class="focus-glow rounded-card border border-line-strong px-3 py-1.5 font-mono text-sm text-muted transition-colors hover:border-accent hover:text-fg aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-bg"
>
	{label}
</button>