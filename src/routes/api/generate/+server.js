import { json } from '@sveltejs/kit';
import { OLLAMA_HOST } from '$env/static/private';

export const POST = async () => {
	try {
		const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model: 'qwen:0.5b',
				prompt: 'give me a short but deep sentence about the meaning of life',
				stream: true
			})
		});

		const reader = response.body.getReader();
		const stream = new ReadableStream({
			async start(controller) {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					const text = new TextDecoder().decode(value);
					const lines = text.split('\n').filter(Boolean);

					for (const line of lines) {
						const json = JSON.parse(line);
						controller.enqueue(json.response);
					}
				}
				controller.close();
			}
		});

		return new Response(stream, {
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive'
			}
		});
	} catch (error) {
		return json({ error: 'Failed to generate text' }, { status: 500 });
	}
};
