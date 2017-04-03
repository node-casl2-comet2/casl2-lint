"use strict";

import { Replacement, appendText, deleteText, replaceText } from "./replacement";
import { SyntaxWalker } from "./syntaxWalker";
import { Fix } from "./fix";
import * as casl2 from "@maxfield/casl2-language";

export class RuleWalker extends SyntaxWalker {
    private sourceFile: casl2.SourceFile;
    private fixes: Fix[];

    constructor(sourceFile: casl2.SourceFile) {
        super();

        this.sourceFile = sourceFile;
        this.fixes = [];
    }

    public getFixes(): Fix[] {
        return this.fixes;
    }

    public walkSourceFile(): void {
        this.walk(this.sourceFile);
    }

    public appendText(start: number, text: string): Replacement {
        return appendText(start, text);
    }

    public replaceText(start: number, end: number, text: string): Replacement {
        return replaceText(start, end, text);
    }

    public deleteText(start: number, end: number): Replacement {
        return deleteText(start, end);
    }

    public createFix(start: number, end: number, ruleName: string, message: string, ruleCode: number, replacement: Replacement): Fix {
        return new Fix(this.sourceFile, start, end, ruleName, message, ruleCode, replacement);
    }

    public addFix(fix: Fix): void {
        this.fixes.push(fix);
    }
}
