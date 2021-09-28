import { Spectral } from "@stoplight/spectral-core";
import { truthy } from "@stoplight/spectral-functions";
import * as fs from 'fs';
import { oas } from "@stoplight/spectral-rulesets";

const document = fs.readFileSync(
  "./src/oas-example.yaml",
  "utf8"
);

const spectral = new Spectral();
spectral.setRuleset({
  // extends: [[oas, "off"]],
  rules: {
    "no-empty-description": {
      given: "$..description",
      message: "Description must not be empty",
      then: {
        function: truthy,
      },
    },
  },
});
spectral.run(document).then(console.log);