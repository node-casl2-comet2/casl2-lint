"use strict";

import { RuleBase } from "./rule";
import { RuleWalker } from "../ruleWalker";
import * as casl2 from "@maxfield/casl2-language";
import { Fix } from "../fix";

/**
 * Add appropriate spaces between tokens
 * e.g. GR,GR2 -> GR1, GR2
 */
export class WhitespaceRule extends RuleBase {
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
                    this.makeSpace(a.end + 1, b.start);
                }
                return b;
            });
        }

        super.visitOperandsNode(node);
    }

    private makeSpace(start: number, end: number) {
        const space = this.replaceText(start, end, " ");
        this.addFix(start, end, space);
    }
}
