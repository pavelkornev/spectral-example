import { Spectral, Ruleset } from "@stoplight/spectral-core";
import { truthy } from "@stoplight/spectral-functions";
import * as fs from 'fs';
import { oas } from "@stoplight/spectral-rulesets";
import { stylish } from "@stoplight/spectral-cli/dist/formatters";
import { FormatterOptions } from "@stoplight/spectral-cli/dist/formatters/types";

const document = fs.readFileSync(
  "./src/oas-example.yaml",
  "utf8"
);

const spectral = new Spectral();
spectral.setRuleset(
  new Ruleset({
    extends: [[oas, "off"]],
    rules: {
      "oas2-schema": true,
      "oas3-schema": true,
      "no-empty-description": {
        given: "$..description",
        message: "Description must not be empty",
        then: {
          function: truthy
        },
      },
    },
  })
);
spectral.run(document).then((results) => {
  console.log(results);
  const output = stylish(results, {} as FormatterOptions);
  console.log(output);
});