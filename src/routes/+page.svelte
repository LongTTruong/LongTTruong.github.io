<script lang="ts">
	import About from '#lib/components/About.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import Projects from '#lib/components/Projects.svelte';
	import Services from '#lib/components/Services.svelte';
	import { site } from '#lib/data/site.ts';

	const title = `${site.name} - ${site.title}`;
	const image = `${site.url}${site.ogImage}`;

	// Escape "<" so the JSON can never close the script tag early.
	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: site.name,
		jobTitle: site.title,
		url: site.url,
		sameAs: [site.github, site.linkedin]
	}).replaceAll('<', '\\u003c');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={site.description} />
	<link rel="canonical" href={site.url} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={site.description} />
	<meta property="og:url" content={site.url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="{site.name}: {site.title}" />
	<meta name="twitter:card" content="summary_large_image" />

	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<Hero />
<Projects />
<Services />
<About />