import { Document, Spectral, Ruleset } from "@stoplight/spectral-core";
import * as fs from 'fs';
import * as path from 'path';
import { oas } from "@stoplight/spectral-rulesets";
import { stylish } from "@stoplight/spectral-cli/dist/formatters";
import { FormatterOptions } from "@stoplight/spectral-cli/dist/formatters/types";
import * as Parsers from '@stoplight/spectral-parsers';
import { truthy } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";

const source = path.join(__dirname, "./oas-example2.json");
const document = new Document(fs.readFileSync(source, "utf8"), Parsers.Json, source);

const ruleset1 = {
  extends: [[oas, "off"]],
  rules: {
    // "oas2-schema": true,
    // "oas3-schema": true,

    // When rule defined in the acestore ruleset, it CANNOT be disabled by #50
    "custom-info-description": {
      message: "API Description is missing",
      severity: DiagnosticSeverity.Error,
      given: "$.info",
      then: {
        field: "description",
        function: truthy,
      },
    }
  },
};

const ruleset2 = {
  extends: [ruleset1],
  rules: {
    // When rule defined here (direct parent), it gets disabled by line #50
    // "custom-info-description": {
    //   message: "API Description is missing",
    //   severity: DiagnosticSeverity.Error,
    //   given: "$.info",
    //   then: {
    //     field: "description",
    //     function: truthy,
    //   },
    // }
  }
};

const ruleset3 = {
  extends: [[ruleset2, "off"]],
  rules: {}
}

const spectral = new Spectral();
spectral.setRuleset(
  new Ruleset(ruleset3)
);

spectral.run(document).then((results) => {
  const output = stylish(results, {} as FormatterOptions);
  console.log(output);
});
