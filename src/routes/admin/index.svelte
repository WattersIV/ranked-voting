<script lang="ts">
	import Textfield from '@smui/textfield';
	import Chip, { Set, TrailingAction, Text } from '@smui/chips';
	import Button, { Label } from '@smui/button';

	type KRList = {
		kr: string;
		quarter: string;
	};

	let krsList: KRList[] = [];
	let okrQuarter: string = '22Q2';
	let krCurrentInput = '';

	$: validOkrTime = okrQuarter.length === 4;

	function handleKeyPress(evt: CustomEvent) {
		if ((evt as unknown as KeyboardEvent).key === 'Enter') {
			console.log(krCurrentInput);
			krsList = [
				...krsList,
				{
					kr: krCurrentInput,
					quarter: okrQuarter
				}
			];
			krCurrentInput = '';
		}
		return;
	}

	async function addNewKrs() {
		console.log('To send', krsList);
		try {
			await fetch(window.location.href, {
				method: 'POST',
				body: JSON.stringify(krsList)
			});
		} catch (err) {
			console.error(err);
		}
	}
</script>

<h1>Admin Page</h1>
<h4>Add OKRs</h4>
<Textfield bind:value={okrQuarter} label="okrTime" invalid={validOkrTime} required />
<Textfield bind:value={krCurrentInput} on:keypress={handleKeyPress} label="kr entry" />
<Set chips={krsList} let:chip input>
	<Chip {chip}>
		<Text>{chip.kr}</Text>
		<TrailingAction icon$class="material-icons">cancel</TrailingAction>
	</Chip>
</Set>
<Button variant="raised" on:click={addNewKrs}>
	<Label>Submit</Label>
</Button>
