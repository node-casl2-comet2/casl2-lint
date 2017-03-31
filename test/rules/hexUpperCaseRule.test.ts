"use strict";

import * as casl2 from "@maxfield/casl2-language";
import * as fs from "fs";
import { Linter } from "../../src/linter";

test("hex upper case rule", () => {
    const path = "./test/baseline/rules/hexUpperCaseRule.before.cas";
    const linter = new Linter();

    const fixes = linter.analyze(path);
    console.log(JSON.stringify(fixes));
});
