"use strict";

import * as casl2 from "@maxfield/casl2-language";

export interface Walker {
    walk(node: casl2.Node): void;
}

