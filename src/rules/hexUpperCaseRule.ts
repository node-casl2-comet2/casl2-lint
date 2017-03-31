"use strict";

import { Rule } from "./rule";
import { RuleWalker } from "../ruleWalker";
import * as casl2 from "@maxfield/casl2-language";
import { Fix } from "../fix";

export class HexUpperCaseRule implements Rule {
    public apply(sourceFile: casl2.SourceFile): Fix[] {
        const walker = new WhitespaceWalker(sourceFile);
        walker.walkSourceFile();
        return walker.getFixes();
    }
}

class WhitespaceWalker extends RuleWalker {
    constructor(sourceFile: casl2.SourceFile) {
        super(sourceFile);
    }

    protected visitHexConstantNode(node: casl2.HexConstantNode) {
        // すべて大文字かチェックする
        const rest = node.raw.substr(1);
        if (rest !== rest.toUpperCase()) {
            const replacement = this.replaceText(node.start, node.end, "#" + rest.toUpperCase());
            this.addFix(node.start, node.end, replacement);
        }

        super.visitHexConstantNode(node);
    }
}
