import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";
import fs from "fs";
import { CallsignsData } from "./models/CallsignsData";

const _importDynamic = new Function("modulePath", "return import(modulePath)");

// mitigate the error:
// Error [ERR_REQUIRE_ESM]: require() of ES Module /[...]/node_modules/node-fetch/src/index.js from /[...]/src/index.ts not supported.
export const fetch = async function (...args: any) {
  const { default: fetch } = await _importDynamic("node-fetch");
  return fetch(...args);
};

const pdfExtract = new PDFExtract();
// const options: PDFExtractOptions = { firstPage: 1, lastPage: 2 };
const options: PDFExtractOptions = {};

const pdfUrl =
  "https://data.bundesnetzagentur.de/Bundesnetzagentur/SharedDocs/Downloads/DE/Sachgebiete/Telekommunikation/Unternehmen_Institutionen/Frequenzen/Amateurfunk/Rufzeichenliste/rufzeichenliste_afu.pdf";
const outFile = "callsigns-data.json";
const callsignRegex = /^(D[A-Z]?[A-Z]?[0-9][A-Z]{1,4})$/;
const dateRegex = /\b\d{2}\. (Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember) \d{4}\b/;

const main = async () => {
  const start = new Date();
  try {
    const doc = await fetch(pdfUrl);
    const pdfData = await doc.arrayBuffer();
    const pdfBuffer = Buffer.from(pdfData);
    const data = await pdfExtract.extractBuffer(pdfBuffer, options);

    const firstPageStrings = data.pages[0].content.map((content) => content.str);
    const dates = firstPageStrings.filter((s) => dateRegex.test(s));
    let date = "unbekannt";
    if (dates.length > 0) {
      date = dates[0];
    }

    const strings = data.pages.map((page) => page.content.map((content) => content.str)).flat();
    const callsigns = strings.filter((s) => callsignRegex.test(s));

    console.log(JSON.stringify([...callsigns.slice(0, 10), "...", ...callsigns.slice(-10)], null, 2));
    console.log(`Found ${callsigns.length} callsigns`);
    console.log(`Data from ${date}`);

    let callsignsData: CallsignsData = { callsigns: callsigns, updated: date };
    let json = JSON.stringify(callsignsData);
    fs.writeFileSync(outFile, json);
  } catch {
    (err: Error) => console.log(err);
  }
  const end = new Date();
  const duration = end.getTime() - start.getTime();
  console.log(`Import took ${duration}ms`);
};

main();
