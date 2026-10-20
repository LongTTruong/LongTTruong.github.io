<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="desciption" content = "Placeholder: scaffold check." />
</svelte:head>

<main class="p-6">
	<p>scaffold ok build {__APP_VERSION__}-{__COMMIT_HASH__}</p>
</main>

{@render children()}
