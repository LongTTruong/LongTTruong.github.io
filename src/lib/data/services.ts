export interface Service {
	id: string;
	title: string;
	summary: string;
	deliverables: readonly string[];
}

// Placeholder copy. Edit freely; the Services component renders whatever is here.
export const services = [
	{
		id: 'pipelines',
		title: 'Data ingestion and automated pipelines',
		summary:
			'Move data from files, APIs and webhooks into one clean, queryable place, on a schedule or in real time.',
		deliverables: [
			'Source connectors with schema validation',
			'Retries, dead-letter handling and failure alerts',
			'A monitored pipeline with documentation for handoff'
		]
	},
	{
		id: 'ai-workflows',
		title: 'AI harnessing and business workflow integration',
		summary:
			'Put language models to work inside your existing processes, with guardrails, budgets and human review.',
		deliverables: [
			'Structured, validated model output',
			'Cost and step limits enforced outside the model',
			'Logged, replayable runs for auditing'
		]
	},
	{
		id: 'api-design',
		title: 'Custom API design and requirements translation',
		summary:
			'Turn plain-language requirements into a clear API contract your team and tools can build against.',
		deliverables: [
			'Requirements turned into resources and endpoints',
			'A reviewable OpenAPI contract',
			'Open questions surfaced before build starts'
		]
	}
] as const satisfies readonly Service[];