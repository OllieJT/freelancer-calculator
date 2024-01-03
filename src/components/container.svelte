<script lang="ts">
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	const { children, pad } = $props<{ children: Snippet; pad?: boolean }>();
</script>

<div
	class={twMerge(
		'mx-auto my-6 w-full max-w-2xl rounded-2xl bg-white ring-1 ring-mono-800/10',
		pad ? 'p-6' : '',
	)}
>
	{@render children()}
</div>
