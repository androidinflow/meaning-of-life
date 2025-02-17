<script>
	import { onMount } from 'svelte';
	import Stars from '$lib/components/Stars.svelte';

	let generatedText = '';
	let loading = true;

	onMount(async () => {
		try {
			const response = await fetch('/api/generate', { method: 'POST' });
			if (!response.ok) throw new Error('Failed to fetch');

			const reader = response.body.getReader();
			const decoder = new TextDecoder();

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				generatedText = generatedText + chunk;
			}
		} catch (error) {
			console.error('Error:', error);
			generatedText = 'Failed to load text';
		} finally {
			loading = false;
		}
	});
</script>

<div class="fixed inset-0 w-full h-screen">
	<Stars />

	<main
		class="relative h-full flex items-center justify-center bg-gradient-to-r from-slate-900/80 to-gray-900/80"
	>
		<div class="z-10">
			{#if loading}
				<div class="space-y-3 animate-pulse max-w-xl px-4">
					<div class="h-4 bg-gray-700/50 rounded-full w-[200px]"></div>
					<div class="h-4 bg-gray-700/50 rounded-full w-[150px]"></div>
					<div class="h-4 bg-gray-700/50 rounded-full w-[175px]"></div>
				</div>
			{:else}
				<h1
					class="text-2xl font-light text-white tracking-wide max-w-xl text-center px-4 drop-shadow-lg"
				>
					{generatedText || 'Loading...'}
				</h1>
			{/if}
		</div>
	</main>
</div>
