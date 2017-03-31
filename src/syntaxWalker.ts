"use strict";

import * as casl2 from "@maxfield/casl2-language";

/**
 * ASTの横断をラップするクラス
 * visit???メソッドをオーバーライドして
 * 特定の種類のノードに対して任意の処理を行う
 */
export class SyntaxWalker {

    /**
     * Walk the node and its children recursively
     * @param node Entry node
     */
    public walk(node: casl2.Node) {
        this.visitNode(node);
    }

    protected visitLabelNode(node: casl2.LabelNode) {
        // デフォルトの実装は子ノードの訪問に投げること
        this.visitChildren(node);
    }

    protected visitInstructionCode(node: casl2.InstructionCodeNode) {
        this.visitChildren(node);
    }

    protected visitOperandsNode(node: casl2.OperandsNode) {
        this.visitChildren(node);
    }

    protected visitOperandNode(node: casl2.OperandNode) {
        this.visitChildren(node);
    }

    protected visitGR(node: casl2.GRNode) {
        this.visitChildren(node);
    }

    protected visitLiteralNode(node: casl2.LiteralNode) {
        this.visitChildren(node);
    }

    protected visitDecLiteralNode(node: casl2.DecLiteralNode) {
        this.visitChildren(node);
    }

    protected visitHexLiteralNode(node: casl2.HexLiteralNode) {
        this.visitChildren(node);
    }

    protected visitConstantNode(node: casl2.ConstantNode) {
        this.visitChildren(node);
    }

    protected visitDecConstantNode(node: casl2.DecConstantNode) {
        this.visitChildren(node);
    }

    protected visitHexConstantNode(node: casl2.HexConstantNode) {
        this.visitChildren(node);
    }

    protected visitStringConstant(node: casl2.StringConstantNode) {
        this.visitChildren(node);
    }

    protected visitCommentNode(node: casl2.CommentNode) {
        this.visitChildren(node);
    }

    protected visitInstructionLineNode(node: casl2.InstructionLineNode) {
        this.visitChildren(node);
    }

    protected visitCommentLineNode(node: casl2.CommentLineNode) {
        this.visitChildren(node);
    }

    protected visitSourceFile(node: casl2.SourceFile) {
        this.visitChildren(node);
    }

    private visitNode(node: casl2.Node) {
        switch (node.kind) {
            case casl2.SyntaxKind.Label:
                this.visitLabelNode(<casl2.LabelNode>node);
                break;

            case casl2.SyntaxKind.InstructionCode:
                this.visitInstructionCode(<casl2.InstructionCodeNode>node);
                break;

            case casl2.SyntaxKind.Operands:
                this.visitOperandsNode(<casl2.OperandsNode>node);
                break;

            case casl2.SyntaxKind.Operand:
                this.visitOperandNode(<casl2.OperandNode>node);
                break;

            case casl2.SyntaxKind.GR:
                this.visitGR(<casl2.GRNode>node);
                break;

            case casl2.SyntaxKind.Literal:
                this.visitLiteralNode(<casl2.LiteralNode>node);
                break;

            case casl2.SyntaxKind.DecLiteral:
                this.visitDecLiteralNode(<casl2.DecLiteralNode>node);
                break;

            case casl2.SyntaxKind.HexLiteral:
                this.visitHexLiteralNode(<casl2.HexLiteralNode>node);
                break;

            case casl2.SyntaxKind.Constant:
                this.visitConstantNode(<casl2.ConstantNode>node);
                break;

            case casl2.SyntaxKind.DecConstant:
                this.visitDecConstantNode(<casl2.DecConstantNode>node);
                break;

            case casl2.SyntaxKind.HexConstant:
                this.visitHexConstantNode(<casl2.HexConstantNode>node);
                break;

            case casl2.SyntaxKind.StringConstant:
                this.visitStringConstant(<casl2.StringConstantNode>node);
                break;

            case casl2.SyntaxKind.Comment:
                this.visitCommentNode(<casl2.CommentNode>node);
                break;

            case casl2.SyntaxKind.InstructionLine:
                this.visitInstructionLineNode(<casl2.InstructionLineNode>node);
                break;

            case casl2.SyntaxKind.CommentLine:
                this.visitCommentLineNode(<casl2.CommentLineNode>node);
                break;

            case casl2.SyntaxKind.SourceFile:
                this.visitSourceFile(<casl2.SourceFile>node);
                break;
        }
    }

    private visitChildren(node: casl2.Node) {
        casl2.forEachChild(node, (n) => this.visitNode(n));
    }
}
