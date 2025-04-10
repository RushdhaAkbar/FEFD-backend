"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDTO = void 0;
var zod_1 = require("zod");
exports.ProductDTO = zod_1.z.object({
    categoryId: zod_1.z.string(),
    image: zod_1.z.string(),
    name: zod_1.z.string(),
    price: zod_1.z.number(),
    description: zod_1.z.string(),
});
//# sourceMappingURL=product.js.map