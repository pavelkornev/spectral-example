import { Document, Spectral, Ruleset } from "@stoplight/spectral-core";
import * as fs from 'fs';
import * as path from 'path';
import { stylish, FormatterOptions } from "@stoplight/spectral-formatters";
import * as Parsers from '@stoplight/spectral-parsers';
// import { DiagnosticSeverity } from "@stoplight/types";
import { oas } from "@stoplight/spectral-rulesets";

const source = path.join(__dirname, "./oas-example.json");
const document = new Document(fs.readFileSync(source, "utf8"), Parsers.Json, source);

const ruleset = new Ruleset({
  extends: [oas],
  rules: {},
});

const spectral = new Spectral();
spectral.setRuleset(ruleset);

spectral.run(document).then((results) => {
  const output = stylish(results, {} as FormatterOptions);
  console.log(output);
});
