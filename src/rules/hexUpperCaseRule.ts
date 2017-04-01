"use strict";

import { RuleBase, RuleMetadata } from "./rule";
import { RuleWalker } from "../ruleWalker";
import * as casl2 from "@maxfield/casl2-language";
import { Fix } from "../fix";

/**
 * Make hex upper case
 * e.g. #000a -> #000A, =#000a -> =#000A
 */
export class HexUpperCaseRule extends RuleBase {
    public static metadata: RuleMetadata = {
        name: "Hex upper case",
        message: "16進数文字に小文字が含まれています。",
        code: 1
    };

    public apply(sourceFile: casl2.SourceFile): Fix[] {
        return this.runWalker(new HexWalker(sourceFile));
    }
}

class HexWalker extends RuleWalker {
    constructor(sourceFile: casl2.SourceFile) {
        super(sourceFile);
    }

    protected visitHexConstantNode(node: casl2.HexConstantNode) {
        // すべて大文字かチェックする
        this.check(node, "#");

        super.visitHexConstantNode(node);
    }

    protected visitHexLiteralNode(node: casl2.HexLiteralNode) {
        this.check(node, "=#");

        super.visitHexLiteralNode(node);
    }

    private check(node: casl2.RawValueNode, prefix: string) {
        // すべて大文字かチェックする
        const rest = node.raw.substr(prefix.length);
        if (rest !== rest.toUpperCase()) {
            const { metadata } = HexUpperCaseRule;
            const replacement = this.replaceText(node.start, node.end, prefix + rest.toUpperCase());
            this.addFix(this.createFix(node.start, node.end, metadata.name, metadata.message, metadata.code, replacement));
        }
    }
}
