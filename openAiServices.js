import OpenAI from "openai"

const OPEN_AI_CHAT_COMPLETION_MODEL = "gpt-3.5-turbo"

let client = null;

const getClient = () => {
	if (!client) {
		const apiKey = process.env.OPENAI_API_KEY;
		if (!apiKey) {
			throw new Error('OPENAI_API_KEY environment variable is not set');
		}
		client = new OpenAI({
			apiKey: apiKey,
		});
	}
	return client;
}

export const getCompletion = async (prompt) => {
	try {
		const openaiClient = getClient();
		
		const completion = await openaiClient.chat.completions.create({
			model: OPEN_AI_CHAT_COMPLETION_MODEL,
			messages: [{role: "user", content: prompt}],
		});

		const content = completion.choices[0]?.message?.content;
		if (!content) {
			throw new Error('No content received from OpenAI');
		}

		return JSON.parse(content);
	} catch (error) {
		console.error('OpenAI API Error:', error.message);
		throw new Error(`OpenAI API failed: ${error.message}`);
	}
}
