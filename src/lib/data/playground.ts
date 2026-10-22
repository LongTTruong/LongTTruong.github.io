export interface PlaygroundStep {
	title: string;
	/** Shown after the prompt, e.g. "validate --schema orders.v1". */
	command: string;
	/** One or two sentences on what happened and why. */
	note: string;
	/** Simulated output, shown in the terminal pane. */
	output: string;
}

export interface Scenario {
	id: string;
	/** Short label for the tab. */
	tab: string;
	title: string;
	path: string;
	summary: string;
	steps: readonly PlaygroundStep[];
}

// Simulated runs: deterministic data, no network. To use real output later, replace this
// array with results fetched from an endpoint that returns the same shape.
export const scenarios = [
	{
		id: 'csv-ingest',
		tab: 'CSV ingest',
		title: 'Messy CSV to clean records',
		path: '~/playground/csv-ingest',
		summary: 'A customer export with inconsistent formats becomes validated, loadable records.',
		steps: [
			{
				title: 'Receive raw file',
				command: 'cat orders.csv',
				note: 'The file arrives as-is: mixed date formats, stray whitespace, and a bad row.',
				output: [
					'id,customer,signup,amount',
					'1001, ada lovelace ,03/04/2025,"$1,200.50"',
					'1002,GRACE HOPPER,2025-04-05,980',
					'1003,,2025-04-06,abc'
				].join('\n')
			},
			{
				title: 'Validate against schema',
				command: 'validate --schema orders.v1',
				note: 'Rows that break the schema are set aside with a reason instead of failing the whole file.',
				output: [
					'row 1001  ok',
					'row 1002  ok',
					'row 1003  rejected: customer is required; amount is not a number',
					'',
					'2 passed, 1 rejected -> rejects.csv'
				].join('\n')
			},
			{
				title: 'Normalize',
				command: 'normalize',
				note: 'Names, dates and money are put into one format. Ambiguous dates follow a documented MM/DD rule.',
				output: [
					'{ "id": 1001, "customer": "Ada Lovelace", "signup": "2025-03-04", "amount_cents": 120050 }',
					'{ "id": 1002, "customer": "Grace Hopper", "signup": "2025-04-05", "amount_cents": 98000 }'
				].join('\n')
			},
			{
				title: 'Load',
				command: 'load --target warehouse.orders --idempotent',
				note: 'Writes are upserts keyed on id, so re-running the same file never creates duplicates.',
				output: [
					'upserted 2 rows (key: id)',
					'skipped 0 duplicates',
					'rejected rows kept for review: 1'
				].join('\n')
			}
		]
	},
	{
		id: 'email-triage',
		tab: 'Email triage',
		title: 'Support email to routed ticket',
		path: '~/playground/email-triage',
		summary: 'A model classifies an email, and the harness checks its answer before anything happens.',
		steps: [
			{
				title: 'Receive email',
				command: 'cat inbox/4821.eml',
				note: 'Free-form text comes in from a shared inbox.',
				output: [
					'From: sam@acme.example',
					'Subject: Invoice 7731 charged twice',
					'',
					'Hi, I was billed twice this month. Please refund one.'
				].join('\n')
			},
			{
				title: 'Classify with a schema',
				command: 'classify --schema ticket.v2',
				note: 'The model must answer in a fixed structure, not free text.',
				output: [
					'{',
					'  "category": "billing",',
					'  "urgency": "medium",',
					'  "needs_human": false',
					'}'
				].join('\n')
			},
			{
				title: 'Check the answer',
				command: 'validate --schema ticket.v2',
				note: 'The harness, not the model, decides whether the output is acceptable.',
				output: [
					'category: billing  (allowed value)',
					'urgency:  medium   (allowed value)',
					'schema check: pass',
					'confidence 0.91 >= threshold 0.80'
				].join('\n')
			},
			{
				title: 'Route and log',
				command: 'route --queue billing',
				note: 'Low-confidence results would go to a person. Every run is logged so it can be replayed.',
				output: ['assigned: billing-queue', 'target response: 1 business day', 'run 4821 logged for replay'].join(
					'\n'
				)
			}
		]
	},
	{
		id: 'api-contract',
		tab: 'API contract',
		title: 'Requirement to API contract',
		path: '~/playground/api-contract',
		summary: 'A one-line business need becomes endpoints and open questions the team can review.',
		steps: [
			{
				title: 'Start from the requirement',
				command: 'cat requirement.txt',
				note: 'Requirements usually start as plain sentences.',
				output: 'Let sales reps look up a customer and see their open orders.'
			},
			{
				title: 'Extract entities and actions',
				command: 'extract --entities --actions',
				note: 'Nouns become resources, verbs become operations, and gaps become questions.',
				output: [
					'entities:  Customer, Order',
					'actions:   look up customer, list open orders',
					'questions: look up by email or id? paginate orders?'
				].join('\n')
			},
			{
				title: 'Draft endpoints',
				command: 'draft --style rest',
				note: 'A first pass at the routes, ready for review.',
				output: [
					'GET /customers/{id}',
					'GET /customers?email=',
					'GET /customers/{id}/orders?status=open'
				].join('\n')
			},
			{
				title: 'Write the contract',
				command: 'emit --format openapi',
				note: 'The reviewed draft becomes a contract that code and tests can be generated from.',
				output: [
					'/customers/{id}/orders:',
					'  get:',
					'    parameters:',
					'      - name: status',
					'        in: query',
					'        schema: { enum: [open, closed] }',
					'    responses:',
					'      "200": { description: Orders for the customer }'
				].join('\n')
			}
		]
	},
] as const satisfies readonly Scenario[];