export default async function handler(req, res) {
	try {
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
			},
			body: JSON.stringify({
				model: 'gpt-3.5-turbo',
				messages: [{ role: 'user', content: 'Say hello' }],
			}),
		});

		if (!response.ok) {
			return res.json({ error: `OpenAI API error: ${response.status} ${response.statusText}` });
		}

		const data = await response.json();
		return res.json({ success: true, data });
	} catch (error) {
		return res.json({ error: error.message });
	}
}