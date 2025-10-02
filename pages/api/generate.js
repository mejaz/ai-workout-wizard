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

const getCompletion = async (prompt) => {
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
}

export default async function handler(req, res) {
	try {
		if (req.method === 'POST') {
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
				const result = await getCompletion(prompt)
				return res.json({result})
			} else {
				return res.status(400).json({error: 'PaLM API temporarily disabled'});
			}
		} else {
			return res.status(405).json({error: 'Method Not Allowed'});
		}
	} catch (e) {
		return res.status(500).json({error: e.message});
	}
}
