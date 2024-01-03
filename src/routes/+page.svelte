<script lang="ts">
	import ContainTable from '$src/components/contain-table.svelte';
	import Container from '$src/components/container.svelte';
	import InputNumber from '$src/components/input-number.svelte';
	import Table from '$src/components/table.svelte';
	import { WEBSITE_NAME } from '$src/lib/constants';

	let monthly = $state(4200);
	let schedule_hours_per_day = $state(8);
	let schedule_days_per_week = $state(5);
	let schedule_weeks_per_year = $state(52);
	let income_tax = $state(25);
	let income_modifier = $state(20); // Fiverr

	const with_taxation = $derived(income_tax / 100 + 1);
	const with_modifier = $derived(income_modifier / 100 + 1);

	const yearly_goal = $derived(Math.round(monthly * 12) + 1);
	const weekly_goal = $derived(Math.round(yearly_goal / schedule_weeks_per_year) + 1);
	const daily_goal = $derived(Math.round(weekly_goal / schedule_days_per_week) + 1);
	const hourly_goal = $derived(Math.round(daily_goal / schedule_hours_per_day) + 1);

	let premium_scale = $state(10);

	const weekly_premium = $derived(Math.round(premium_scale * 1.5));
	const daily_premium = $derived(Math.round(weekly_premium + premium_scale));
	const hourly_premium = $derived(Math.round(daily_premium + premium_scale * 2));

	const weekly = $derived(Math.round(weekly_goal + weekly_goal * (weekly_premium / 100)));
	const daily = $derived(Math.round(daily_goal + daily_goal * (daily_premium / 100)));
	const hourly = $derived(Math.round(hourly_goal + hourly_goal * (hourly_premium / 100)));

	const taxed_monthly = $derived(Math.round(monthly * with_taxation));
	const taxed_weekly = $derived(Math.round(weekly * with_taxation));
	const taxed_daily = $derived(Math.round(daily * with_taxation));
	const taxed_hourly = $derived(Math.round(hourly * with_taxation));

	const output_monthly = $derived(Math.round(taxed_monthly * with_modifier));
	const output_weekly = $derived(Math.round(taxed_weekly * with_modifier));
	const output_daily = $derived(Math.round(taxed_daily * with_modifier));
	const output_hourly = $derived(Math.round(taxed_hourly * with_modifier));
</script>

<svelte:head>
	<title>Hello World | {WEBSITE_NAME}</title>
</svelte:head>

<Container pad>
	<h2 class="sr-only">Parameters</h2>
	<form class="flex flex-col items-stretch gap-6 sm:grid sm:grid-cols-2">
		<div class="col-span-full">
			<InputNumber
				id="monthly_goal"
				label="Net Income"
				title="What is your monthly income goal?"
				description="This value should be the amount of money you hope to arrive in your bank account by the end of each month after all fees and taxes have been paid."
				bind:value={monthly}
			/>
		</div>

		<div class="col-span-full">
			<hr />
		</div>

		<InputNumber
			id="hours_per_day"
			label="Hours"
			title="How many hours do you work in a day?"
			bind:value={schedule_hours_per_day}
			min={1}
			max={24}
		/>

		<InputNumber
			id="days_per_week"
			label="Days"
			title="How many days do you work in a week?"
			bind:value={schedule_days_per_week}
			min={1}
			max={7}
		/>

		<div class="col-span-full">
			<hr />
		</div>

		<InputNumber
			id="tax"
			label="Tax"
			title="How much are you taxed on income?"
			description="This percentage value should reflect the amount applied to your Gross income to arrive at your Net income."
			bind:value={income_tax}
			min={0}
			max={100}
		/>

		<InputNumber
			id="modifier"
			label="Modifier"
			title="How much of a buffer do you need?"
			description="If you work on a platform like Fiverr, you may need to add a buffer to your income to account for fees."
			bind:value={income_modifier}
			min={0}
			max={100}
		/>
	</form>
</Container>

<Container pad>
	<form class="">
		<InputNumber
			id="premium_scale"
			label="Premium Scale"
			title="How much of a premium do you want to charge for smaller jobs?"
			description="When clients hire you for less time, you're taking more risk. You should charge for this convenience by scaling your rates based on how much time you're being hired for."
			bind:value={premium_scale}
			min={1}
			max={100}
			step={1}
			type="range"
		/>
	</form>
</Container>

<h2 class="text-center text-sm uppercase tracking-widest text-mono-400">Breakdown</h2>
<ContainTable>
	<Table
		headings={['Frequency', 'Base', 'Premium', 'Modifiers', 'Result']}
		rows={[
			['Montly', `£${monthly}`, `+ ${0}%`, `£${output_monthly - monthly}`, `£${output_monthly}`],
			[
				'Weekly',
				`£${weekly}`,
				`+ ${weekly_premium}%`,
				`£${output_weekly - weekly}`,
				`£${output_weekly}`,
			],
			['Daily', `£${daily}`, `+ ${daily_premium}%`, `£${output_daily - daily}`, `£${output_daily}`],
			[
				'Hourly',
				`£${hourly}`,
				`+ ${hourly_premium}%`,
				`£${output_hourly - hourly}`,
				`£${output_hourly}`,
			],
		]}
	/>
</ContainTable>

<h2 class="text-center text-sm uppercase tracking-widest text-mono-400">Your Rates</h2>
<Container>
	<div class="flex items-stretch divide-x divide-mono-200">
		{#each [['Montly', `£${output_monthly}`], ['Weekly', `£${output_weekly}`], ['Daily', `£${output_daily}`], ['Hourly', `£${output_hourly}`]] as [type, value]}
			<div class="flex flex-auto basis-1 flex-col items-center justify-start px-3 py-12">
				<h5 class="text-xs font-bold uppercase leading-normal tracking-widest">{type}</h5>
				<p class="text-xl leading-normal tracking-wide text-primary-600">{value}</p>
			</div>
		{/each}
	</div>
</Container>
