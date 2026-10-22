// Placeholder content. Swap these values for real ones; components read only from here.
export const site = {
	name: 'Long Truong',
	handle: 'LongTTruong',
	title: 'Computer Science Student & Systems / Full Stack Engineer',
	tagline:
		'Building low-latency back-end pipelines, control planes, and modern web applications with a focus in deterministic AI agent systems.',
	description:
		'Back-end pipelines, control planes, and deterministic AI agent systems. Open to internships and freelance work.',
	// Deployed URL WITH trailing slash (include the repo path for a GitHub Pages project site).
	url: 'https://longttruong.github.io/',
	// File in /static, used for link previews (1200x630 PNG).
	ogImage: 'og.png',
	email: 'longtruong31@gmail.com',
	github: 'https://github.com/LongTTruong',
	linkedin: 'https://www.linkedin.com/in/longtruongmemphis',
	// File in /static, resolved with asset() from $app/paths so it respects the base path.
	resume: 'resume.pdf'
} as const;

// Every href must match a section id on the page, or the prerender fails (handleMissingId).
export const nav = [
	{ label: 'Projects', href: '#projects' },
	{ label: 'Services', href: '#services' },
	{ label: 'About', href: '#about' }
] as const;