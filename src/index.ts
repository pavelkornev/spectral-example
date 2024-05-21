import fs from 'fs';
import path from 'path';
import { Document, Spectral, Ruleset } from "@stoplight/spectral-core";
import * as Parsers from '@stoplight/spectral-parsers';
import { oas } from "@stoplight/spectral-rulesets";
import { printMemoryUsage } from './monitor_memory.js';
import logUpdate from 'log-update';

const ruleset = new Ruleset({
  extends: [oas],
  rules: {},
});

const spectral = new Spectral();
spectral.setRuleset(ruleset);

const documentsFolder = path.join(__dirname, '_documents');

fs.readdir(documentsFolder, async (err, files) => {
    if (err) {
        console.error('Error reading documents folder:', err);
        return;
    }
    const numberOfDocuments = files.length;
    let documentCounter = 0;
    for (const file of files) {
        const filePath = path.join(documentsFolder, file);
        const document = new Document(fs.readFileSync(filePath, "utf8"), Parsers.Json, filePath);
        await spectral.run(document);
        
        documentCounter++;
        printMemoryUsage(file, documentCounter, numberOfDocuments);
    }
});
logUpdate.done();

console.log('Validation completed.');
