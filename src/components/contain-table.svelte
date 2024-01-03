<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children } = $props<{ children: Snippet }>();
</script>

<div class="mx-auto my-6 flow-root w-full max-w-3xl">
	<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
			<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
				{@render children()}
			</div>
		</div>
	</div>
</div>
