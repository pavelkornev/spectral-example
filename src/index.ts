import { Document, Spectral, Ruleset } from "@stoplight/spectral-core";
import * as fs from 'fs';
import * as path from 'path';
import { oas } from "@stoplight/spectral-rulesets";
// import { stylish } from "@stoplight/spectral-cli/dist/formatters";
// import { FormatterOptions } from "@stoplight/spectral-cli/dist/formatters/types";
import * as Parsers from '@stoplight/spectral-parsers';


const source = path.join(__dirname, "./oas-example2.json");
// If no "source" is specified, then Spectral returns 4 errors, if specified — 2
const document = new Document(fs.readFileSync(source, "utf8"), Parsers.Json /*, source*/);

const spectral = new Spectral();
spectral.setRuleset(
  new Ruleset({
    extends: [[oas, "off"]],
    rules: {
      "oas2-schema": true,
      "oas3-schema": true,
    },
  })
);
spectral.run(document).then((results) => {
  console.log("Results -> ", results.length);
  console.log(results);
  // const output = stylish(results, {} as FormatterOptions);
  // console.log(output);
});