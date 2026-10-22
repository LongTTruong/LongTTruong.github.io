// Placeholder content for the hero status box (TerminalWidget).
export const status = {
	path: '~/status',
	command: 'whoami --status',
	availability: {
		label: 'available',
		hint: 'Open to internships, full time positions, and freelance projects.'
	},
	rows: [
		{ key: 'focus', value: 'control plane, data plane, agentic systems' },
		{ key: 'stack', value: ['Svelte', 'TypeScript', 'Java', 'Python', 'C'] },
		{ key: 'open_to', value: ['internships', 'freelance', 'party'] }
	]
} as const;