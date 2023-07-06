import {TextServiceClient} from "@google-ai/generativelanguage"
import {GoogleAuth} from "google-auth-library"

const MODEL_NAME = "models/text-bison-001";
const API_KEY = process.env.PALM_API_KEY;

const client = new TextServiceClient({
	authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const extractJSON = (output) => {
	// Remove unnecessary characters and newlines
	const jsonStartIndex = output.indexOf("[");
	const jsonEndIndex = output.lastIndexOf("]") + 1;
	const json = output.substring(jsonStartIndex, jsonEndIndex);

	// Parse the JSON
	return JSON.parse(json);
}

export const generateText = async (prompt) => {
	try {
		const response = await client.generateText({
			// required, which model to use to generate the result
			model: MODEL_NAME,
			// optional, 0.0 always uses the highest-probability result
			temperature: 0.25,
			// optional, how many candidate results to generate
			candidateCount: 1,
			// optional, number of most probable tokens to consider for generation
			top_k: 40,
			// optional, for nucleus sampling decoding strategy
			top_p: 0.95,
			// optional, maximum number of output tokens to generate
			max_output_tokens: 5000,
			// optional, safety settings
			safety_settings: [{"category": "HARM_CATEGORY_DEROGATORY", "threshold": 1}, {
				"category": "HARM_CATEGORY_TOXICITY",
				"threshold": 1
			}, {"category": "HARM_CATEGORY_VIOLENCE", "threshold": 2}, {
				"category": "HARM_CATEGORY_SEXUAL",
				"threshold": 2
			}, {"category": "HARM_CATEGORY_MEDICAL", "threshold": 2}, {
				"category": "HARM_CATEGORY_DANGEROUS",
				"threshold": 2
			}],
			prompt: {
				text: prompt,
			},
		})

		return extractJSON(response[0].candidates[0].output)
	} catch (e) {
		console.log(e)
		throw new Error(e.message)
	}

}

