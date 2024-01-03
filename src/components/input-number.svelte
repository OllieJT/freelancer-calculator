<script lang="ts">
	let {
		label,
		title,
		description,
		id,
		value,
		max,
		min,
		step,
		type = 'number',
		large = false,
	} = $props<{
		label: string;
		title: string;
		description?: string;
		id: string;
		value: number;
		min?: number;
		max?: number;
		step?: number;
		type?: 'number' | 'range';
		large?: boolean;
	}>();
</script>

<div class="flex flex-col items-stretch">
	<label
		for={id}
		class="text-xs font-semibold uppercase leading-none tracking-widest text-primary-600"
	>
		{label}
	</label>

	<div class="mb-1 py-2">
		<p class="wrap-balance text-xl font-medium leading-tight text-mono-950">{title}</p>
		{#if description}
			<p class="wrap-balance mt-1 text-sm leading-normal text-mono-600">{description}</p>
		{/if}
	</div>

	{#if type === 'range'}
		<input
			name={id}
			{id}
			type="range"
			bind:value
			{min}
			{max}
			{step}
			class="h-3 w-full cursor-pointer appearance-none rounded-lg bg-mono-200 dark:bg-mono-700"
		/>
	{:else}
		<input
			name={id}
			{id}
			type="number"
			bind:value
			{min}
			{max}
			{step}
			class="h-16 w-full overflow-hidden rounded-lg border-none px-4 font-mono text-lg tracking-wide text-primary-600 ring-2 ring-primary-100 transition-all duration-200 ease-out focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
		/>
	{/if}
</div>
