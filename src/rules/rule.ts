"use strict";

import * as casl2 from "@maxfield/casl2-language";
import { Fix } from "../fix";


export interface Rule {
    apply(sourceFile: casl2.SourceFile): Fix[];
}

