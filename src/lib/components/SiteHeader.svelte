<script lang="ts">
	import { nav, site } from '#lib/data/site.ts';
</script>

<!-- Fixed height (h-14) so nothing shifts; matches scroll-padding-top in layout.css. -->
<header class="sticky top-0 z-40 h-14 border-b border-line bg-bg">
	<div class="mx-auto flex h-full max-w-page items-center justify-between gap-4 px-6">
		<a href="#main" class="prompt min-w-0 truncate font-mono text-sm text-fg">
			~/{site.handle}
		</a>

		<nav aria-label="Primary">
			<ul class="flex items-center gap-4 text-sm sm:gap-6">
				{#each nav as item (item.href)}
					<li>
						<a
							href={item.href}
							class="inline-block py-2 text-muted underline-offset-4 transition-colors hover:text-accent-bright hover:underline"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>