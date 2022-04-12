<script lang="ts">
	import Card from '@smui/card';
	import Slider from '@smui/slider';
	import Button from '@smui/button';

	type KRList = {
		kr: string;
		quarter: string;
	};

	interface KRSumbmission {
		quarter: string;
		value: number;
		kr: string;
	}

	export let okrs: KRList[];
	const krSumbmission: KRSumbmission[] = okrs.map((okr, index) => {
		return {
			quarter: okr.quarter,
			kr: okr.kr,
			value: 0
		};
	});

	async function handleSubmit() {
		try {
			await fetch(`${window.location.href}/submit`, {
				method: 'POST',
				body: JSON.stringify(krSumbmission)
			});
			for (const [index, kr] of krSumbmission.entries()) {
				krSumbmission[index] = { ...krSumbmission[index], value: 0 };
			}
			alert('Submitted W00T :D');
		} catch (err) {
			alert('Something went wrong :( Try please try again');
			console.error(err);
		}
	}
</script>

<h1>{okrs[0].quarter} Voting</h1>
{#each okrs as { kr }, index}
	<Card padded class="card" style="margin-bottom: 5px; display: flex; background-color: #8e9299">
		<h4>{kr}</h4>
		<Slider bind:value={krSumbmission[index].value} style="flex-grow: 1" min={0} max={10} />
		<h2>{krSumbmission[index].value}</h2>
	</Card>
{/each}
<Button on:click={handleSubmit} variant="raised" style="width: 80%; display: block; margin: auto">
	Submit
</Button>

<style scoped>
	h4,
	h2,
	h1 {
		text-align: center;
	}
</style>
