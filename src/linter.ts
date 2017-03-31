"use strict";

import * as casl2 from "@maxfield/casl2-language";
import { Rule } from "./rules/rule";
import * as fs from "fs";
import { Fix } from "./fix";
import { HexUpperCaseRule } from "./rules/hexUpperCaseRule";
import { WhitespaceRule } from "./rules/whitespaceRule";
import { IndentRule } from "./rules/indentRule";


export interface LinterAnalysis {
    fixes: Fix[];
    source: string;
}

const RECOMENDED_RULES = [
    new HexUpperCaseRule(),
    new WhitespaceRule(),
    new IndentRule(),
];

export class Linter {
    private rules: Rule[];

    constructor(rules: Rule[] = RECOMENDED_RULES) {
        this.rules = rules;
    }

    public analyze(path: string): LinterAnalysis {
        const source = fs.readFileSync(path).toString();
        const sourceFile = casl2.createSourceFile(path, source);
        const fixes: Fix[] = [];
        for (const rule of this.rules) {
            const fix = rule.apply(sourceFile);
            fix.forEach(x => fixes.push(x));
        }

        return { fixes, source };
    }

    public lint(path: string): string {
        const { fixes, source } = this.analyze(path);

        // 後ろの修正から適用すれば修正する箇所のインデックスがずれないで済むので
        // 修正を降順に並び替えている
        const sortedFixes = fixes.sort((a, b) => b.endCharacter - a.endCharacter);

        let content = source;
        for (const fix of fixes) {
            content = fix.patch(content);
        }

        return content;
    }
}
