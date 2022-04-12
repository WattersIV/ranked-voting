<script lang="ts">
	import Textfield from '@smui/textfield';
	let name: string = '';
	$: validName = name.length >= 3;
</script>

<h1>Ranked Voting for Live OKRs</h1>
<Textfield bind:value={name} label="Name" invalid={validName} required />
