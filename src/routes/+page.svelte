<script>
	import { onMount } from 'svelte';

	let generatedText = '';

	onMount(async () => {
		try {
			const response = await fetch('/api/generate', { method: 'POST' });
			const reader = response.body.getReader();

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const text = new TextDecoder().decode(value);
				generatedText += text;
			}
		} catch (error) {
			generatedText = 'Failed to load text';
		}
	});
</script>

<main
	class="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-50 to-gray-100"
>
	<h1 class="text-4xl font-light text-slate-700 tracking-wide max-w-2xl text-center px-4">
		{generatedText || 'Loading...'}
	</h1>
</main>
