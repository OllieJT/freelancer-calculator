<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	type Row = (string | number | boolean)[];
	const { headings, rows } = $props<{
		headings: string[];
		rows: Row[];
	}>();
</script>

<table class="min-w-full divide-y divide-mono-300">
	<thead class="bg-mono-50">
		<tr>
			{#each headings as heading, ix}
				{@const is_first = ix === 0}
				{@const is_last = ix === headings.length - 1}
				<th
					scope="col"
					class={twMerge(
						'relative px-3 py-3.5 text-left text-sm font-semibold text-mono-900',
						is_first && 'pl-4 pr-3 sm:pl-6',
						is_last && 'pl-3 pr-4 text-right sm:pr-6',
					)}
				>
					{heading}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody class="divide-y divide-mono-200 bg-white">
		{#each rows as row}
			<tr>
				{#each row as cell, ix}
					{@const is_first = ix === 0}
					{@const is_last = ix === row.length - 1}
					<td
						class={twMerge(
							'relative whitespace-nowrap px-3 py-4 text-sm font-medium text-mono-900',
							is_first && 'pl-4 pr-3 sm:pl-6',
							is_last && 'pl-3 pr-4 text-right sm:pr-6',
						)}
					>
						{cell}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
