"use strict";

import { Replacement } from "./types";
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

    private createFix(start: number, end: number, replacement: Replacement): Fix {
        return new Fix(this.sourceFile, start, end, replacement);
    }

    public addFix(start: number, end: number, replacement: Replacement): void {
        this.fixes.push(this.createFix(start, end, replacement));
    }
}

function createReplacement(start: number, end: number, text: string): Replacement {
    return { start, end, text };
}

function replaceText(start: number, end: number, text: string): Replacement {
    return createReplacement(start, end, text);
}

function appendText(start: number, text: string): Replacement {
    return createReplacement(start, start, text);
}

function deleteText(start: number, end: number): Replacement {
    return createReplacement(start, end, "");
}
