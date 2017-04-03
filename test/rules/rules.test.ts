"use strict";

import * as casl2 from "@maxfield/casl2-language";
import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";
import { Linter } from "../../src/linter";
import * as Rules from "../../src/rules/rules";
import { Rule } from "../../src/rules/rule";

function beforeAfterTest(dir: string, name: string, rules?: Rule[]) {
    const beforePath = path.join(dir, `${name}.before.cas`);
    const afterPath = path.join(dir, `${name}.after.cas`);
    const linter = new Linter(rules);

    const actual = linter.lint(beforePath);
    const expected = fs.readFileSync(afterPath).toString();

    assert.equal(actual, expected);
}

function testRule(testName: string, testdataName: string, rules: Rule | Rule[]) {
    test(testName, () => {
        const r = Array.isArray(rules) ? rules : [rules];
        beforeAfterTest("./test/baseline/rules", testdataName, r);
    });
}

testRule("hex upper case rule", "hexUpperCaseRule", new Rules.HexUpperCaseRule());
testRule("whitespace rule", "whitespaceRule", new Rules.WhitespaceRule());
testRule("indent rule", "indentRule", new Rules.IndentRule());
testRule("trailing whitespace rule", "trailingWhitespaceRule", new Rules.TrailingWhitespaceRule());
