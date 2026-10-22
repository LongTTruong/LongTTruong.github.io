<script lang="ts">
	import { services } from '#lib/data/services.ts';
	import Playground from './Playground.svelte';
</script>

<section id="services" aria-labelledby="services-title" class="mx-auto max-w-page px-6 py-16">
	<h2 id="services-title" class="text-2xl font-semibold tracking-tight">Services</h2>

	<ul class="mt-8 grid gap-6 md:grid-cols-3">
		{#each services as service (service.id)}
			<li class="rounded-card border border-line bg-surface p-4">
				<h3 class="text-lg font-semibold tracking-tight">{service.title}</h3>
				<p class="mt-2 text-sm">{service.summary}</p>
				<ul class="mt-4 list-disc space-y-1.5 pl-4 text-sm text-muted marker:text-accent">
					{#each service.deliverables as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>

	<h3 class="mt-16 text-lg font-semibold tracking-tight">See how it works</h3>
	<p class="mt-2 max-w-2xl text-sm text-muted">
		Step through a simulated run of each service. The data is sample data and nothing leaves your
		browser.
	</p>
	<div class="mt-6">
		<Playground />
	</div>
</section>