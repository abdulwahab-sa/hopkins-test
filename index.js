require('dotenv').config();
const path = require('path');
const fs = require('fs');
const yargs = require('yargs');

const extractPdfText = require('./src/extractPdfText');
const detectSections = require('./src/detectSections');
const summarizeSections = require('./src/summarizeSections');
const generateSummaryFile = require('./src/generateSummaryFile');
const generatePpt = require('./src/generatePpt');

const INPUT_DIR = path.join(__dirname, 'input');
const OUTPUT_DIR = path.join(__dirname, 'output');

async function runPipeline(pdfFile) {
	try {
		console.log('Extracting PDF text...');
		const rawText = await extractPdfText(pdfFile);

		console.log('Detecting sections...');
		const sections = detectSections(rawText);

		console.log('Summarizing sections with OpenAI...');
		const summaries = await summarizeSections(sections);

		console.log('Generating executive summary markdown...');
		await generateSummaryFile(summaries, path.join(OUTPUT_DIR, 'executive_summary.md'));

		console.log('Generating PowerPoint deck...');
		await generatePpt(summaries, path.join(OUTPUT_DIR, 'mini_deck.pptx'));

		console.log('All done! Results saved in output/.');
	} catch (err) {
		console.error('Pipeline failed:', err);
		process.exit(1);
	}
}

const argv = yargs
	.option('run', {
		alias: 'r',
		type: 'boolean',
		description: 'Run the full pipeline on the first PDF in input/',
	})
	.help().argv;

if (argv.run) {
	// Find first PDF in input/
	const files = fs.readdirSync(INPUT_DIR).filter((f) => f.endsWith('.pdf'));
	if (!files.length) {
		console.error('No PDF found in input/. Please add a CIM PDF.');
		process.exit(1);
	}
	const pdfFile = path.join(INPUT_DIR, files[0]);
	runPipeline(pdfFile);
} else {
	console.log('Use --run to process the first PDF in input/.');
}
