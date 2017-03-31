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

export interface Position {
    /**
     * zero-based line
     */
    line: number;

    /**
     * zero-based character
     */
    character: number;
}
