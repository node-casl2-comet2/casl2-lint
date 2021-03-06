"use strict";

import { Position } from "./types";
import { Replacement, applyReplacement } from "./replacement";
import * as casl2 from "@maxfield/casl2-language";

export class Fix {
    /**
     * File path to be fixed
     */
    public filePath: string;

    /**
     * Start position to be fixed
     */
    public start: Position;

    /**
     * End position to be fixed
     */
    public end: Position;

    /**
     * Actual replacement start position
     */
    public replacementStartPosition: Position;

    /**
     * Actual replacement end position
     */
    public replacementEndPosition: Position;

    public message: string;
    public ruleName: string;
    public ruleCode: number;

    private replacement: Replacement;

    public get startCharacter(): number {
        return this.replacement.start;
    }

    public get endCharacter(): number {
        return this.replacement.end;
    }

    public get replacementText(): string {
        return this.replacement.text;
    }

    constructor(sourceFile: casl2.SourceFile,
        start: number, end: number,
        ruleName: string, message: string, ruleCode: number, replacement: Replacement) {
        this.filePath = sourceFile.filePath;
        this.start = sourceFile.getLineAndCharacterOfPosition(start);
        this.end = sourceFile.getLineAndCharacterOfPosition(end);
        this.replacementStartPosition = sourceFile.getLineAndCharacterOfPosition(replacement.start);
        this.replacementEndPosition = sourceFile.getLineAndCharacterOfPosition(replacement.end);

        this.ruleName = ruleName;
        this.message = message;
        this.ruleCode = ruleCode;

        this.replacement = replacement;
    }

    public patch(content: string): string {
        return applyReplacement(content, this.replacement);
    }
}
