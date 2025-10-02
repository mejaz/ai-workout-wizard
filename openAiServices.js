export const getCompletion = async (prompt) => {
	try {
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
			},
			body: JSON.stringify({
				model: 'gpt-3.5-turbo',
				messages: [{ role: 'user', content: prompt }],
			}),
		});

		if (!response.ok) {
			throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();
		const content = data.choices[0]?.message?.content;
		
		if (!content) {
			throw new Error('No content received from OpenAI');
		}

		return JSON.parse(content);
	} catch (error) {
		console.error('OpenAI API Error:', error.message);
		throw new Error(`OpenAI API failed: ${error.message}`);
	}
}
