"use strict";

import * as casl2 from "@maxfield/casl2-language";
import { RuleWalker } from "../ruleWalker";
import { Fix } from "../fix";


export interface Rule {
    apply(sourceFile: casl2.SourceFile): Fix[];
}

export interface RuleMetadata {
    /**
     * Rule warning message. e.g. 'Missing whitespace'
     */
    message: string;

    /**
     * Rule code
     */
    code: number;

    /**
     * Rule name
     */
    name: string;
}

export abstract class RuleBase implements Rule {
    public static metadata: RuleMetadata;
    public abstract apply(sourceFile: casl2.SourceFile): Fix[];

    public runWalker(walker: RuleWalker): Fix[] {
        walker.walkSourceFile();
        return walker.getFixes();
    }
}
