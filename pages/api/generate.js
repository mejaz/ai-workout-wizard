import {getCompletion} from "@/openAiServices";
import {generateText} from "@/palm2Services"

const generatePrompt = (userData) => {
	return `
		Based on the user data below, generate an exercise plan for a week.
		User data:
		${JSON.stringify(userData)}
		
		Generate 3 exercise per day.
		Saturday and Sunday as rest days.
		
		Sample output JSON:
		[{"day": "Monday","exercises": [{"exercise": "...", "sets": "...", "reps": "...", "weight": "...","rest": "..."}]}]
		
		"reps" in JSON is a string with number of reps with weight if needed
		"rest" in JSON is the rest to be taken between sets
		"weight" in JSON is the weight to be used for exercise, it should be with units if needed e.g. 10 lbs, else make it "---"
		
		For rest days return only one javascript object in exercises array with exercise field as "Rest Day" and remaining fields as "---"
		
		Answer:
	`
}

export default async function handler(req, res) {

	try {
		if (req.method === 'POST') {
			let result;
			const {
				height,
				weight,
				age,
				gender,
				fitnessLevel,
				goal,
				model,
			} = req.body

			// generate the prompt
			const prompt = generatePrompt({height, weight, age, gender, fitnessLevel, goal})

			if (model.toLowerCase() === 'openai') {
				result = await getCompletion(prompt)
			} else {
				// PaLM API
				result = await generateText(prompt)
			}

			return res.json({result})
		} else {
			// Handle other HTTP methods or return an appropriate error response
			return res.status(405).json({error: 'Method Not Allowed'});
		}
	} catch (e) {
		return res.status(405).json({error: e.message});
	}

}
