const fs = require('fs');
const pdfParse = require('pdf-parse');

async function extractPdfText(pdfPath) {
	const dataBuffer = fs.readFileSync(pdfPath);
	const data = await pdfParse(dataBuffer);
	return data.text;
}

module.exports = extractPdfText;
