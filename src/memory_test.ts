import fs from 'fs';
import path from 'path';
import { Document, Spectral, Ruleset } from "@stoplight/spectral-core";
import { stylish, FormatterOptions } from "@stoplight/spectral-formatters";
import * as Parsers from '@stoplight/spectral-parsers';
// import { DiagnosticSeverity } from "@stoplight/types";
import { oas } from "@stoplight/spectral-rulesets";

const ruleset = new Ruleset({
  extends: [oas],
  rules: {},
});

const spectral = new Spectral();
spectral.setRuleset(ruleset);

const documentsFolder = path.join(__dirname, '_documents');

fs.readdir(documentsFolder, (err, files) => {
    if (err) {
        console.error('Error reading documents folder:', err);
        return;
    }
    for (const file of files) {
        const filePath = path.join(documentsFolder, file);
        const document = new Document(fs.readFileSync(filePath, "utf8"), Parsers.Json, filePath);
        console.log(`Start to validate file: ${file}:`);
        spectral.run(document).then((results) => {
            const output = stylish(results, {} as FormatterOptions);
            console.log(output);
        });
    }
});
