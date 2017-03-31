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
     * Start position of fix
     */
    public start: Position;

    /**
     * End position of fix
     */
    public end: Position;

    private replacement: Replacement;

    public get startCharacter(): number {
        return this.replacement.start;
    }

    public get endCharacter(): number {
        return this.replacement.end;
    }

    constructor(sourceFile: casl2.SourceFile, start: number, end: number, replacement: Replacement) {
        this.filePath = sourceFile.filePath;
        this.start = sourceFile.getLineAndCharacterOfPosition(start);
        this.end = sourceFile.getLineAndCharacterOfPosition(end);
        this.replacement = replacement;
    }

    public patch(content: string): string {
        return applyReplacement(content, this.replacement);
    }
}
