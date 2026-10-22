<script lang="ts">
	import { about } from '#lib/data/about.ts';
	import StackMatrix from './StackMatrix.svelte';

	const { education, timeline } = about;
</script>

<section id="about" aria-labelledby="about-title" class="mx-auto max-w-page px-6 py-16">
	<h2 id="about-title" class="text-2xl font-semibold tracking-tight">About</h2>
	<p class="mt-4 max-w-2xl">{about.summary}</p>

	<h3 class="mt-12 text-lg font-semibold tracking-tight">Education</h3>
	<div class="mt-4 grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
		<div>
			<p class="font-medium">{education.degree}</p>
			<p class="text-muted">{education.school}</p>
			<p class="mt-1 font-mono text-sm text-muted">{education.period}</p>
			<ul aria-label="Coursework" class="mt-4 flex flex-wrap gap-1.5 font-mono">
				{#each education.coursework as course (course)}
					<li class="rounded-card border border-line-strong px-2 py-1 text-xs">{course}</li>
				{/each}
			</ul>
		</div>

		<ol class="space-y-6 border-l border-line-strong pl-6">
			{#each timeline as entry (entry.period)}
				<li class="relative">
					<span
						aria-hidden="true"
						class="absolute top-2 -left-7.25 size-2 rounded-full bg-accent"
					></span>
					<p class="font-mono text-sm text-accent">{entry.period}</p>
					<p class="mt-0.5 font-medium">{entry.title}</p>
					<p class="mt-0.5 text-sm text-muted">{entry.detail}</p>
				</li>
			{/each}
		</ol>
	</div>

	<h3 class="mt-12 text-lg font-semibold tracking-tight">Tech stack</h3>
	<div class="mt-4">
		<StackMatrix />
	</div>
</section>