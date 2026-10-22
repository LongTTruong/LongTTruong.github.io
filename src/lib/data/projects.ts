export interface Project {
	slug: string;
	/** Terminal header, e.g. ~/projects/control-plane */
	path: string;
	name: string;
	summary: string;
	stack: readonly string[];
	/** Ordered data-flow nodes, rendered in the architecture modal. */
	diagram: readonly { label: string; detail: string }[];
	/** 2-3 architecture decisions: trade-offs, failure modes, metrics. */
	decisions: readonly { title: string; detail: string }[];
	/** Live telemetry / demo URL. Optional. */
	demo?: string;
	repo: string;
}

// Placeholder content. Replace descriptions, links and every metric with real, measured values.
export const projects = [
	{
		slug: 'control-plane',
		path: '~/projects/control-plane',
		name: 'Control Plane',
		summary: 'Declarative job scheduler that reconciles desired and actual state across worker nodes.',
		stack: ['Go', 'etcd', 'gRPC'],
		diagram: [
			{ label: 'Spec API', detail: 'Validates and stores desired state' },
			{ label: 'State store', detail: 'Versioned keys with watch streams' },
			{ label: 'Reconciler', detail: 'Diffs desired vs actual, issues commands' },
			{ label: 'Workers', detail: 'Execute jobs and report status' }
		],
		decisions: [
			{
				title: 'Level-triggered reconciliation',
				detail:
					'Re-derives work from current state each cycle instead of replaying events, so missed events self-heal. Cost: extra reads per cycle.'
			},
			{
				title: 'Leader election with fencing tokens',
				detail:
					'A stale leader cannot write after losing its lease. Failover target: under 5 seconds.'
			}
		],
		// Make a project that I can demo live
		// demo: 'https://example.com/demo/control-plane',
		repo: 'https://github.com/LongTTruong/control-plane'
	},
	{
		slug: 'stream-ingest',
		path: '~/projects/stream-ingest',
		name: 'Stream Ingest Pipeline',
		summary:
			'Ingests event streams, validates schemas, and lands partitioned data with at-least-once delivery.',
		stack: ['Go', 'Kafka', 'Postgres'],
		diagram: [
			{ label: 'Producers', detail: 'Emit versioned events' },
			{ label: 'Schema gate', detail: 'Rejects invalid events to a dead-letter queue' },
			{ label: 'Partitioned queue', detail: 'Bounded, keyed by entity' },
			{ label: 'Batch writer', detail: 'Idempotent upserts in batches' },
			{ label: 'Warehouse', detail: 'Query-ready tables' }
		],
		decisions: [
			{
				title: 'At-least-once with idempotent writes',
				detail:
					'Duplicates are absorbed by upsert keys, which is simpler and cheaper than exactly-once coordination.'
			},
			{
				title: 'Bounded queues for backpressure',
				detail: 'Slow sinks slow producers instead of exhausting memory. Failure mode: higher tail latency.'
			},
			{
				title: 'Dead-letter queue for schema failures',
				detail: 'Bad events never block the stream and can be replayed after a fix.'
			}
		],
		// Same with this one
		// demo: 'https://example.com/demo/stream-ingest',
		repo: 'https://github.com/LongTTruong/stream-ingest'
	},
	{
		slug: 'med-bud',
		path: '~/projects/med-bud',
		name: 'MedBud',
		summary:
			'Deterministic execution harness for local LLM agent performing patient symptom triage and scheduler system for patient medication adherence.',
		stack: ['Python', 'TypeScript', 'SvelteKit', 'PostGreSQL', 'Qwen2.5 7B'],
		diagram: [
			{ label: 'Twilio SMS/WhatsApp', detail: 'Patient-system interaction interface' },
			{ label: 'Classifier', detail: 'LLM classifies SMS message intent and deterministically invokes MCP tools' },
			{ label: 'Tool gateway', detail: 'Allowlisted, schema-validated calls' },
			{ label: 'Scheduler', detail: 'Event-driven medication adherence' },
			{ label: 'Caregiver Dashboard', detail: 'Administrator dashboard to handle alerts and events' },
			{ label: 'Run log', detail: 'Append-only, replayable' }
		],
		decisions: [
			{
				title: 'Replayable runs',
				detail:
					'Model and tool result is logged, so a run can be replayed and debugged without new model calls.'
			},
			{
				title: 'Local deployment',
				detail: 'Unlimited token usage on consumer-grade hardware while achieving high accuracy.'
			}
		],
		repo: 'https://github.com/LongTTruong/MedBud'
	}
] as const satisfies readonly Project[];