// Roles are the filter lenses. Every item's `tags` must be one of these ids (checked by TypeScript).
export const roles = [
	{ id: 'backend', label: 'Back-end' },
	{ id: 'fullstack', label: 'Full stack' },
	{ id: 'frontend', label: 'Front-end'},
	{ id: 'mobile', label: 'Mobile'},
	{ id: 'data', label: 'Data engineering' },
	{ id: 'cloud', label: 'Cloud engineering' },
	{ id: 'ai', label: 'AI harness' }
] as const;

export type RoleId = (typeof roles)[number]['id'];

export interface StackItem {
	name: string;
	/** Roles this skill is relevant to. */
	tags: readonly RoleId[];
}

export interface StackGroup {
	id: string;
	title: string;
	items: readonly StackItem[];
}

// Placeholder: edit names and tags to match what you actually use.
export const stack = [
	{
		id: 'languages',
		title: 'Languages',
		items: [
			{ name: 'TypeScript', tags: ['frontend'] },
			{ name: 'Rust', tags: ['backend'] },
			{ name: 'C', tags: ['backend'] },
			{ name: 'Go', tags: ['backend', 'cloud', 'data'] },
			{ name: 'PHP', tags: ['frontend'] },
			{ name: 'Python', tags: ['data', 'ai', 'backend', 'fullstack'] },
			{ name: 'Java', tags: ['fullstack', 'mobile'] },
			{ name: 'Kotlin', tags: ['fullstack', 'mobile', 'frontend', 'mobile'] },
			{ name: 'SQL', tags: ['data', 'backend', 'fullstack'] }
		]
	},
	{
		id: 'frameworks',
		title: 'Frameworks and edge',
		items: [
			{ name: 'SvelteKit', tags: ['fullstack', 'frontend'] },
			{ name: 'Spring Boot', tags: ['fullstack'] },
			{ name: 'React', tags: ['frontend'] },
			{ name: 'Next.js', tags: ['frontend'] },
			{ name: 'FastAPI', tags: ['backend', 'ai'] },
			{ name: 'Cloudflare Workers', tags: ['cloud', 'fullstack'] },
			{ name: 'Tailwind CSS', tags: ['frontend'] }
		]
	},
	{
		id: 'data',
		title: 'Databases and streaming',
		items: [
			{ name: 'PostgreSQL', tags: ['backend', 'data', 'fullstack'] },
			{ name: 'SQLite', tags: ['backend', 'ai', 'mobile'] },
			{ name: 'Redis', tags: ['backend', 'cloud'] },
			{ name: 'Kafka', tags: ['data', 'backend', 'cloud'] },
			{ name: 'etcd', tags: ['cloud', 'backend'] }
		]
	},
	{
		id: 'devops',
		title: 'DevOps and tooling',
		items: [
			{ name: 'Docker', tags: ['cloud', 'backend', 'ai'] },
			{ name: 'GitHub Actions', tags: ['cloud', 'fullstack'] },
			{ name: 'Linux', tags: ['cloud', 'backend', 'data'] },
			{ name: 'Jupyter', tags: ['ai', 'backend', 'data'] },
			{ name: 'Gradle', tags: ['frontend', 'mobile', 'fullstack'] },
			{ name: 'Git', tags: ['backend', 'fullstack', 'data', 'cloud', 'ai'] }
		]
	}
] as const satisfies readonly StackGroup[];