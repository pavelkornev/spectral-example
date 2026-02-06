import fs from 'fs';
import path from 'path';
import { Document, Spectral, Ruleset, RulesetDefinition } from "@stoplight/spectral-core";
import * as Parsers from '@stoplight/spectral-parsers';
import { oas } from "@stoplight/spectral-rulesets";
import { oas3 } from "@stoplight/spectral-formats";
import { printMemoryUsage } from './monitor_memory.js';
import logUpdate from 'log-update';
import { defined } from '@stoplight/spectral-functions';

const ruleset1: RulesetDefinition = {
  extends: [[oas, "off"]],
  rules: {
    "operation-success-response": true,
    "foo-bar": {
      formats: [oas3],
      given: "$",
      then: {
        function: defined
      }
    }
  },
};

const ruleset2 = {
  extends: [[ruleset1, "off"]],
};


const rulesetInstance = new Ruleset(ruleset2);

// Expected to have no active rules, but got 1 active - "operation-success-response"
console.log("Enabled rules: ", Object.keys(rulesetInstance.rules).filter(ruleName => rulesetInstance.rules[ruleName].enabled).join(", "));