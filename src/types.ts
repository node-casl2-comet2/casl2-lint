"use strict";

export interface Position {
    /**
     * Zero-based line
     */
    line: number;

    /**
     * Zero-based character
     */
    character: number;
}

export interface Range {
    start: number;
    end: number;
}

export interface ContentRange extends Range {
    contentLength: number;
}

export function createContentRange(start: number, end: number, contentLength: number) {
    return { start, end, contentLength };
}
