<script lang="ts">
	import { asset } from '$app/paths';
	import LinkButton from '#lib/components/LinkButton.svelte';
	import TerminalWidget from '#lib/components/TerminalWidget.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<section
	id="hero"
	aria-labelledby="hero-title"
	class="mx-auto grid max-w-page gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-center lg:gap-16 lg:py-24"
>
	<div>
		<h1 id="hero-title" class="text-4xl font-semibold tracking-tight sm:text-5xl">{site.name}</h1>
		<p class="mt-3 text-lg text-muted">{site.title}</p>
		<p class="mt-6 max-w-xl text-pretty">{site.tagline}</p>

		<ul class="mt-8 flex flex-wrap gap-3" aria-label="Resume and contact links">
			<li>
				<LinkButton variant="primary" href={asset(site.resume)} download="{site.handle}-resume.pdf">
					Download resume
				</LinkButton>
			</li>
			<li><LinkButton href={site.github}>GitHub</LinkButton></li>
			<li><LinkButton href={site.linkedin}>LinkedIn</LinkButton></li>
			<li><LinkButton href="mailto:{site.email}">Email</LinkButton></li>
		</ul>
	</div>

	<TerminalWidget />
</section>