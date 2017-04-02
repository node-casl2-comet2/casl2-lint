"use strict";

import { RuleBase, RuleMetadata } from "./rule";
import { RuleWalker } from "../ruleWalker";
import * as casl2 from "@maxfield/casl2-language";
import { Fix } from "../fix";
import { Replacement } from "../replacement";

/**
 * Add appropriate spaces between tokens
 * e.g. GR,GR2 -> GR1, GR2
 */
export class WhitespaceRule extends RuleBase {
    public static metadata: RuleMetadata = {
        name: "Whitespace",
        message: "空白がありません。",
        code: 2
    };

    apply(sourceFile: casl2.SourceFile): Fix[] {
        return this.runWalker(new WhitespaceWalker(sourceFile));
    }
}

class WhitespaceWalker extends RuleWalker {
    constructor(sourceFile: casl2.SourceFile) {
        super(sourceFile);
    }

    protected visitOperandsNode(node: casl2.OperandsNode) {
        const { operands } = node;
        if (operands.length >= 2) {
            operands.reduce((a, b) => {
                const interval = b.start - a.end;
                // GR, GR2のように2つのオペランド間が
                // ', 'となっていたら間隔は2になっているはず
                if (interval != 2) {
                    const start = a.end + 1;
                    const end = interval == 1 ? start + 1 : b.start;
                    const space = this.replaceText(start, b.start, " ");
                    this.makeSpace(start, end, space);
                }
                return b;
            });
        }

        super.visitOperandsNode(node);
    }

    private makeSpace(start: number, end: number, replacement: Replacement) {
        const { metadata } = WhitespaceRule;
        this.addFix(this.createFix(start, end, metadata.name, metadata.message, metadata.code, replacement));
    }
}
