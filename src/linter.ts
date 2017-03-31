"use strict";

import * as casl2 from "@maxfield/casl2-language";
import { Rule } from "./rules/rule";
import * as fs from "fs";
import { Fix } from "./fix";
import { HexUpperCaseRule } from "./rules/hexUpperCaseRule";


export class Linter {
    private rules: Rule[];

    constructor() {
        this.rules = [
            new HexUpperCaseRule()
        ];
    }

    public analyze(path: string): Fix[] {
        const source = fs.readFileSync(path).toString();
        const sourceFile = casl2.createSourceFile(path, source);
        const fixes: Fix[] = [];
        for (const rule of this.rules) {
            const fix = rule.apply(sourceFile);
            fix.forEach(x => fixes.push(x));
        }

        return fixes;
    }
}
