const PptxGenJS = require('pptxgenjs');

async function generatePpt(summaries, outPath) {
	const pptx = new PptxGenJS();

	// Slide 1: Company Overview
	let slide1 = pptx.addSlide();
	slide1.addText('Company Overview', { x: 0.5, y: 0.2, fontSize: 24, bold: true });
	slide1.addText(summaries.businessOverview, { x: 0.5, y: 1, fontSize: 16, w: 8.5, h: 3 });

	// Slide 2: Key Financials
	let slide2 = pptx.addSlide();
	slide2.addText('Key Financials', { x: 0.5, y: 0.2, fontSize: 24, bold: true });
	slide2.addText(summaries.keyFinancials, { x: 0.5, y: 1, fontSize: 16, w: 8.5, h: 3 });

	// Slide 3: Investment Rationale
	let slide3 = pptx.addSlide();
	slide3.addText('Investment Rationale', { x: 0.5, y: 0.2, fontSize: 24, bold: true });
	slide3.addText(summaries.investmentHighlights, { x: 0.5, y: 1, fontSize: 16, w: 8.5, h: 2 });
	slide3.addText('Risks:', { x: 0.5, y: 3.2, fontSize: 18, bold: true });
	slide3.addText(summaries.risks, { x: 0.5, y: 3.7, fontSize: 16, w: 8.5, h: 1.5 });

	await pptx.writeFile({ fileName: outPath });
}

module.exports = generatePpt;
