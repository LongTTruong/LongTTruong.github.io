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
	},
	{
		slug: 'make-memphis-marvelous',
		path: '~/projects/M3',
		name: 'M3 - Make Memphis Marvelous',
		summary: 'Fine-tuned object detection model harness based on Yolov8 trained on instances on city blight.',
		stack: ['Python', 'FastAPI'],
		diagram: [
			{ label: 'API', detail: 'HTTP requests initiate pipeline' },
			{ label: 'Image Scraper', detail: 'Identified and downloaded Google Street View Images' },
			{ label: 'Data Ingestion', detail: 'Images are encrypted, encoded into base64, and sent as a JSON object over https from edge endpoint to server' },
			{ label: 'Analysis Script', detail: 'Draws bounding boxes over all instances of city blight detected in image store with confidence scores' },
		],
		decisions: [
			{
				title: 'Base64 Codec',
				detail:
					'Enables easy data interoperability between differing edge devices, image formats, and image sources.'
			},
			{
				title: 'Harnessed vision detection model',
				detail:
					'Increased reliability and deterministic model actions. Easily extensible to include more modern orchestrator agents or dropped into a proper CI/CD/MLOps pipeline.'
			}
		],
		// Make a project that I can demo live
		// demo: 'https://example.com/demo/control-plane',
		repo: 'https://github.com/LongTTruong/M3Server'
	},
	{
		slug: 'personal-website',
		path: '~/projects/personal-website',
		name: 'Personal and professional website for Long Truong',
		summary:
			'This website.',
		stack: ['SvelteKit', 'Github Actions', 'Git', 'Tailwind CSS', 'TypeScript'],
		diagram: [
			{ label: 'Website', detail: 'It\'s a static website. Nothing really to say here' },
		],
		decisions: [
			{
				title: 'MeltUI',
				detail:
					'Easy-to-build accessible component library.'
			},
			{
				title: 'Prerendered',
				detail: 'Compiled Svelte to efficient JavaScript and prerendered the site to further improve site performance.'
			},
			{
				title: 'Sonnet 5.5',
				detail: 'Carefully guided and instructed based on preliminary design document to ensure data coherency and ease of future development.'
			}
		],
		// Same with this one
		// demo: 'https://example.com/demo/stream-ingest',
		repo: 'https://github.com/LongTTruong/LongTTruong.github.io'
	},
] as const satisfies readonly Project[];