import { Document, Spectral, Ruleset } from "@stoplight/spectral-core";
import * as fs from 'fs';
import * as path from 'path';
import { stylish, FormatterOptions } from "@stoplight/spectral-formatters";
import * as Parsers from '@stoplight/spectral-parsers';
import { defined } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";

const source = path.join(__dirname, "./oas-example.json");
const document = new Document(fs.readFileSync(source, "utf8"), Parsers.Json, source);

const ruleset = new Ruleset({
  rules: {
    "error-code-defined": {
      message: "`code` property is missing in the Error object definition",
      severity: DiagnosticSeverity.Error,
      given: "$.paths.*.*.responses[?(@property.match(/^(4|5)/))].content.'application/json'.schema.properties.error.properties",
      then: {
        field: "code",
        function: defined,
      },
    }
  },
});

const spectral = new Spectral();
spectral.setRuleset(ruleset);

spectral.run(document).then((results) => {
  const output = stylish(results, {} as FormatterOptions);
  console.log(output);
});
