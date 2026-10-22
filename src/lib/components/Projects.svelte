<script lang="ts">
	import { projects } from '#lib/data/projects.ts';
	import ProjectCard from './ProjectCard.svelte';
</script>

<section id="projects" aria-labelledby="projects-title" class="mx-auto max-w-page px-6 py-16">
	<h2 id="projects-title" class="text-2xl font-semibold tracking-tight">Projects</h2>

	<div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
		{#each projects as project (project.slug)}
			<ProjectCard {project} />
		{/each}
	</div>
</section>