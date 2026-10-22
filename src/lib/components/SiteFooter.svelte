<script lang="ts">
	import { site } from '#lib/data/site.ts';

	// Evaluated at build time (pre-rendered).
	const year = new Date().getFullYear();

	const links = [
		{ label: 'GitHub', href: site.github },
		{ label: 'LinkedIn', href: site.linkedin },
		{ label: 'Email', href: `mailto:${site.email}` }
	];
</script>

<footer class="border-t border-line">
	<div
		class="mx-auto flex max-w-page flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between"
	>
		<p>&copy; {year} {site.name}</p>

		<nav aria-label="Contact">
			<ul class="flex gap-6">
				{#each links as link (link.label)}
					<li>
						<a
							href={link.href}
							class="inline-block py-1.5 underline-offset-4 transition-colors hover:text-accent-bright hover:underline"
							rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<p><code class="font-mono text-xs">build: v{__APP_VERSION__}-{__COMMIT_HASH__}</code></p>
	</div>
</footer>