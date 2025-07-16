function detectSections(rawText) {
	const sections = {
		companyOverview: '',
		financials: '',
		marketOpportunity: '',
		risks: '',
	};

	const patterns = {
		companyOverview:
			/(Company Overview|Business Overview|About the Company)[\s\S]*?(?=Financials|Market Opportunity|Risks|$)/i,
		financials:
			/(Financials|Key Financials|Financial Overview)[\s\S]*?(?=Market Opportunity|Risks|Company Overview|$)/i,
		marketOpportunity:
			/(Market Opportunity|Market|Industry Overview)[\s\S]*?(?=Risks|Financials|Company Overview|$)/i,
		risks:
			/(Risks|Risk Factors|Key Risks)[\s\S]*?(?=Company Overview|Financials|Market Opportunity|$)/i,
	};

	for (const key in patterns) {
		const match = rawText.match(patterns[key]);
		if (match) sections[key] = match[0].trim();
	}

	return sections;
}

module.exports = detectSections;
