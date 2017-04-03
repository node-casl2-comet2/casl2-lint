"use strict";

import { RuleBase, RuleMetadata } from "./rule";
import { RuleWalker } from "../ruleWalker";
import * as casl2 from "@maxfield/casl2-language";
import { Fix } from "../fix";
import { ContentRange, createContentRange } from "../types";
import { deleteText } from "../replacement";

/**
 * Remove trailing whitespace
 * e.g. LAD GR1, GR2...... -> LAD GR1, GR2
 */
export class TrailingWhitespaceRule extends RuleBase {
    public static metadata: RuleMetadata = {
        name: "Trailing whitespace",
        message: "末尾に不要な空白があります。",
        code: 4
    };

    public apply(sourceFile: casl2.SourceFile): Fix[] {
        const lineRanges = getLineRanges(sourceFile);
        const fixes: Fix[] = [];
        const text = sourceFile.text;
        for (const lineRange of lineRanges) {
            const trailingSpace = /\s+$/;
            const line = text.substr(lineRange.start, lineRange.contentLength);
            const match = line.match(trailingSpace);
            if (match) {
                const start = lineRange.start + match.index!;
                const end = lineRange.start + lineRange.contentLength;
                const replacement = deleteText(start, end);
                const { name, message, code } = TrailingWhitespaceRule.metadata;
                fixes.push(new Fix(sourceFile, start, end, name, message, code, replacement));
            }
        }

        return fixes;
    }
}


function getLineRanges(sourceFile: casl2.SourceFile): ContentRange[] {
    const result: ContentRange[] = [];
    const lineStarts = sourceFile.getLineStarts();
    const text = sourceFile.text;
    for (let i = 0; i < lineStarts.length - 1; i++) {
        const start = lineStarts[i];
        const end = lineStarts[i + 1];
        const lineEndingLength = text.charAt(end - 2) === "\r" ? 2 : 1;
        result.push(createContentRange(start, end, end - start - lineEndingLength));
    }

    const start = lineStarts[lineStarts.length - 1];
    const end = sourceFile.end;
    result.push(createContentRange(start, end, end - start));

    return result;
}
