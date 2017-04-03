"use strict";


export interface Replacement {
    /**
     * Replace start position
     */
    start: number;

    /**
     * Replace end position
     */
    end: number;

    /**
     * Text to replace by
     */
    text: string;
}

export function applyReplacement(content: string, replacement: Replacement): string {
    const { start, end, text } = replacement;

    // 置換する前の部分 + 置換する部分 + 置換する後の部分
    return content.substr(0, start) + text + content.substr(end);
}

function createReplacement(start: number, end: number, text: string): Replacement {
    return { start, end, text };
}

export function replaceText(start: number, end: number, text: string): Replacement {
    return createReplacement(start, end, text);
}

export function appendText(start: number, text: string): Replacement {
    return createReplacement(start, start, text);
}

export function deleteText(start: number, end: number): Replacement {
    return createReplacement(start, end, "");
}
