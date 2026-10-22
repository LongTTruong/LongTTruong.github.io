<script lang="ts">
	import './layout.css';
	import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
	import monoLatin from '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2?url';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<!-- Latin subsets only: the fonts used above the fold. Font preloads always need crossorigin. -->
	<link rel="preload" as="font" type="font/woff2" href={interLatin} crossorigin="anonymous" />
	<link rel="preload" as="font" type="font/woff2" href={monoLatin} crossorigin="anonymous" />
</svelte:head>

<a
	href="#main"
	class="sr-only z-50 rounded-card bg-accent px-3 py-2 font-medium text-bg focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
>
	Skip to content
</a>

<div class="flex min-h-dvh flex-col">
	<SiteHeader />
	<!-- The only <main> on the page; pages must not render their own. -->
	<main id="main" tabindex="-1" class="flex-1 focus:outline-none">
		{@render children()}
	</main>
	<SiteFooter />
</div>