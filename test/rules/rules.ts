"use strict";

import * as casl2 from "@maxfield/casl2-language";
import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";
import { Linter } from "../../src/linter";

function beforeAfterTest(dir: string, name: string) {
    const beforePath = path.join(dir, `${name}.before.cas`);
    const afterPath = path.join(dir, `${name}.after.cas`);
    const linter = new Linter();

    const actual = linter.lint(beforePath);
    const expected = fs.readFileSync(afterPath).toString();
    assert.equal(actual, expected);
}

test("hex upper case rule", () => {
    beforeAfterTest("./test/baseline/rules", "hexUpperCaseRule");
});
