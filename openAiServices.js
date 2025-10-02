export const getCompletion = async (prompt) => {
	try {
		// Dynamic import to ensure environment variables are loaded
		const { default: OpenAI } = await import("openai");
		
		const apiKey = process.env.OPENAI_API_KEY;
		
		console.warn('Environment check:', {
			hasApiKey: !!apiKey,
			apiKeyLength: apiKey ? apiKey.length : 0,
			nodeEnv: process.env.NODE_ENV
		});
		
		if (!apiKey) {
			throw new Error('OPENAI_API_KEY environment variable is not set');
		}

		const client = new OpenAI({
			apiKey: apiKey,
		});
		
		const completion = await client.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [{role: "user", content: prompt}],
		});

		const content = completion.choices[0]?.message?.content;
		if (!content) {
			throw new Error('No content received from OpenAI');
		}

		return JSON.parse(content);
	} catch (error) {
		console.error('OpenAI API Error:', {
			message: error.message,
			stack: error.stack,
			apiKeyExists: !!process.env.OPENAI_API_KEY
		});
		throw new Error(`OpenAI API failed: ${error.message}`);
	}
}
