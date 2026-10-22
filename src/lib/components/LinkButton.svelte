<script lang="ts">
	import { buttonClass, type ButtonVariant } from '#lib/button.ts';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface Props extends HTMLAnchorAttributes {
		variant?: ButtonVariant;
		children: Snippet;
	}

	let { variant = 'secondary', children, href, ...rest }: Props = $props();

	const external = $derived(typeof href === 'string' && href.startsWith('http'));
</script>

<a {...rest} {href} rel={external ? 'noopener noreferrer' : undefined} class={buttonClass(variant)}>
	{@render children()}
</a>