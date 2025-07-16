const OpenAI = require('openai');

async function summarizeSections(sections) {
	const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
	const prompts = {
		businessOverview:
			`Summarize the following company overview in 3-4 sentences for an executive summary:\n\n` +
			(sections.companyOverview || ''),
		keyFinancials:
			`Extract and summarize the key financials (revenue, EBITDA, growth) from the following text:\n\n` +
			(sections.financials || ''),
		investmentHighlights:
			`List 3-5 investment highlights based on the following information (use bullet points):\n\n` +
			(sections.marketOpportunity || ''),
		risks:
			`Summarize the main risks in 2-3 bullet points from the following text:\n\n` +
			(sections.risks || ''),
	};

	const results = {};
	for (const [key, prompt] of Object.entries(prompts)) {
		const completion = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [
				{ role: 'system', content: 'You are a professional investment analyst.' },
				{ role: 'user', content: prompt },
			],
			max_tokens: 400,
			temperature: 0.4,
		});
		results[key] = completion.choices[0].message.content.trim();
	}
	return results;
}

module.exports = summarizeSections;
