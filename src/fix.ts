"use strict";

import { Position, Replacement } from "./types";
import * as casl2 from "@maxfield/casl2-language";

export class Fix {
    /**
     * File path to be fixed
     */
    private filePath: string;

    /**
     * Start position of fix
     */
    private start: Position;

    /**
     * End position of fix
     */
    private end: Position;

    private replacement: Replacement;

    constructor(sourceFile: casl2.SourceFile, start: number, end: number, replacement: Replacement) {
        this.filePath = sourceFile.filePath;
        this.start = sourceFile.getLineAndCharacterOfPosition(start);
        this.end = sourceFile.getLineAndCharacterOfPosition(end);
        this.replacement = replacement;
    }

    public patch() {
        // 修正を適用する
    }
}
