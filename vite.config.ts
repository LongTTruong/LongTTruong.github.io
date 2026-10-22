import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

function commitHash(): string {
	// CI provides GITHUB_SHA; locally fall back to git; otherwise 'dev'.
	if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7);
	try {
		return execSync('git rev-parse --short=7 HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
			.toString()
			.trim();
	} catch {
		return 'dev';
	}
}

const hash = commitHash();
// Project site: BASE_PATH=/repo-name (set in CI). User site (<user>.github.io): leave empty.
const base = (process.env.BASE_PATH ?? '') as '' | `/${string}`;

export default defineConfig(({ command, isPreview }) => {
	const dev = command === 'serve' && !isPreview;

	return {
		plugins: [
			// tailwindcss() must come before sveltekit()
			tailwindcss(),
			sveltekit({
				adapter: adapter({
					pages: 'build',
					assets: 'build',
					fallback: undefined, // fully pre-rendered, no SPA fallback
					precompress: false,
					strict: true
				}),
				paths: { base: dev ? '' : base },
				prerender: {
					handleHttpError: 'fail',
					handleMissingId: 'fail'
				},
				// Deterministic version name (commit-based) instead of a build timestamp.
				version: { name: hash },
				// Inline the page's CSS into the HTML so first paint doesn't wait on a stylesheet request.
				inlineStyleThreshold: 100_000
			})
		],
		define: {
			__APP_VERSION__: JSON.stringify(pkg.version),
			__COMMIT_HASH__: JSON.stringify(hash)
		}
	};
});