const fs = require('fs');

function generateSummaryFile(summaries, outPath) {
	const md =
		`# Executive Summary\n\n` +
		`## Business Overview\n${summaries.businessOverview}\n\n` +
		`## Key Financials\n${summaries.keyFinancials}\n\n` +
		`## Investment Highlights\n${summaries.investmentHighlights}\n\n` +
		`## Risks\n${summaries.risks}\n`;
	fs.writeFileSync(outPath, md, 'utf8');
}

module.exports = generateSummaryFile;
