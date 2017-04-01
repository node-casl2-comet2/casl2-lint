"use strict";

import { RuleBase, RuleMetadata } from "./rule";
import { RuleWalker } from "../ruleWalker";
import * as casl2 from "@maxfield/casl2-language";
import { Fix } from "../fix";


export class IndentRule extends RuleBase {
    public static metadata: RuleMetadata = {
        name: "Indent",
        message: "ラベルや命令の幅が適切でありません。",
        code: 3
    };

    apply(sourceFile: casl2.SourceFile): Fix[] {
        return this.runWalker(new IndentWalker(sourceFile));
    }
}

class IndentWalker extends RuleWalker {
    private static LabelWith = 10;
    private static InstructionCodeWith = 8;

    constructor(sourcefile: casl2.SourceFile) {
        super(sourcefile);
    }

    protected visitInstructionLineNode(node: casl2.InstructionLineNode) {
        const { label, instructionCode, operands } = node;

        // ラベルと命令コードの間隔をチェックする
        const labelEnd = label ? label.end : node.start;
        const labelLength = label ? label.end - label.start : 0;
        const desiredSpaceBetweenLabelAndInstructionCode = IndentWalker.LabelWith - labelLength;

        if (instructionCode.start - labelEnd != desiredSpaceBetweenLabelAndInstructionCode) {
            this.makeSpace(labelEnd, instructionCode.start, desiredSpaceBetweenLabelAndInstructionCode);
        }

        // 命令コードとオペランドの間隔をチェックする
        if (operands) {
            const instructionLength = instructionCode.end - instructionCode.start;
            const desiredSpaceBetweenInstructionCodeAndOperands = IndentWalker.InstructionCodeWith - instructionLength;

            if (operands.start - instructionCode.end != desiredSpaceBetweenInstructionCodeAndOperands) {
                this.makeSpace(instructionCode.end, operands.start, desiredSpaceBetweenInstructionCodeAndOperands);
            }
        }

        super.visitInstructionLineNode(node);
    }

    private makeSpace(start: number, end: number, count: number) {
        const { metadata } = IndentRule;
        const spaces = " ".repeat(count);
        const space = this.replaceText(start, end, spaces);
        this.addFix(this.createFix(start, end, metadata.name, metadata.message, metadata.code, space));
    }
}
