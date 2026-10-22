export type ButtonVariant = 'primary' | 'secondary';

const base =
	'inline-flex items-center rounded-card border px-4 py-2 font-mono text-sm transition-colors disabled:pointer-events-none disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
	// Primary uses the global focus outline (a glow is invisible on a filled cyan button).
	primary: 'border-accent bg-accent text-bg hover:border-accent-bright hover:bg-accent-bright',
	secondary: 'focus-glow border-line-strong text-fg hover:border-accent hover:text-accent-bright'
};

export function buttonClass(variant: ButtonVariant = 'secondary'): string {
	return `${base} ${variants[variant]}`;
}