<script lang="ts">
	import Card from '@smui/card';
	import Slider from '@smui/slider';
	import Button from '@smui/button';

	type KRList = {
		kr: string;
		quarter: string;
	};
	type KRRank = Record<string, number>;
	// type KRSumbmission = Partial<KRRank> & {
	// 	quarter: string;
	// };

	export let okrs: KRList[];
	let krSumbmission = {};

	for (let { kr } of okrs) {
		krSumbmission[kr] = {
			name: kr,
			value: 0
		};
	}

	async function handleSubmit() {
		krSumbmission['quarter'] = okrs[0].quarter;
		console.log(krSumbmission);
		try {
			await fetch(`${window.location.href}/submit`, {
				method: 'POST',
				body: JSON.stringify(krSumbmission)
			});
		} catch (err) {
			console.error(err);
		}
	}
</script>

<h1>{okrs[0].quarter} Voting</h1>
{#each okrs as { kr }}
	<Card padded class="card" style="margin-bottom: 5px; display: flex; background-color: #8e9299">
		<h4>{kr}</h4>
		<Slider bind:value={krSumbmission[kr].value} style="flex-grow: 1" min={0} max={10} />
		<h2>{krSumbmission[kr].value}</h2>
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
